import {
  inject,
  Context,
  MetadataInspector,
  BindingScope,
} from '@loopback/context';
import {
  Server,
  Application,
  CoreBindings,
  ControllerClass,
} from '@loopback/core';
import * as _ from 'lodash';
import {IPCSequence} from './ipcSequence';
import {ElectronServerConfig, ElectronMetadata} from './types';
import {ElectronBindings, ELECTRON_METADATA_KEY} from './keys';
import electron = require('electron');
const ipcMain = require('electron').ipcMain;
export class ElectronServer extends Context implements Server {
  // required property for the Server
  private _listening: boolean = false;
  // electron App
  private _electronApp: electron.App;
  // electron window
  private _window: electron.BrowserWindow | null | undefined;

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) public app?: Application,
    @inject(ElectronBindings.APP_CONFIG) public config?: ElectronServerConfig,
  ) {
    super(app);
    this._electronApp = electron.app;
    this.config = _.defaultsDeep(config, {
      path: '/public/index.html',
      window: {
        minWidth: 800,
        minHeight: 600,
      },
      enableDebug: false,
    });
  }
  // implementation of the server interface
  get listening() {
    return this._listening;
  }

  // starts the server
  async start(): Promise<void> {
    this._listening = true;
    this._electronApp.on('ready', () => {
      this.createWindow();
    });
    this._electronApp.on('activate', () => {
      if (this._window === null) {
        this.createWindow();
      }
    });
  }

  //  stop the server
  async stop(): Promise<void> {
    this._listening = false;
    this._electronApp.quit();
  }
  public loadIPCRoutes() {
    for (const b of this.find('controllers.*')) {
      const controllerName = b.key.replace(/^controllers\./, '');
      const ctor = b.valueConstructor;
      if (!ctor) {
        throw new Error(
          `The controller ${controllerName} was not bound via .toClass()`,
        );
      }
      this.setupControllerMethods(ctor);
    }
  }
  // method for creating the electron window
  private createWindow(): void {
    // set the browser window
    this._window = new electron.BrowserWindow(_.get(this.config, 'window'));
    if (_.get(this.config, 'enableDebug')) {
      this._window.webContents.openDevTools();
    }

    // load the html file
    this._window.loadFile(_.get(this.config, `path`, ''));

    this._window.on('closed', () => {
      this._window = null;
    });
  }

  private setupControllerMethods(ctor: ControllerClass) {
    const controllerMethods =
      MetadataInspector.getAllMethodMetadata<ElectronMetadata>(
        ELECTRON_METADATA_KEY,
        ctor.prototype,
      ) || {};

    for (const methodName in controllerMethods) {
      const metadata: ElectronMetadata = controllerMethods[methodName];
      this.setIPCEvent(ctor, methodName, metadata);
    }
  }

  // tslint:disable-next-line:no-any
  private setIPCEvent(
    // tslint:disable-next-line:no-any
    ctor: ControllerClass | any,
    methodName: string,
    metadata: ElectronMetadata,
  ) {
    const context: Context = this;
    // tslint:disable-next-line:no-any
    ipcMain.on(metadata.eventName, async (event: any, ...arg: any) => {
      context.bind(ElectronBindings.IPC_CONTEXT).to(context);
      context
        .bind(ElectronBindings.IPC_CONTROLLER)
        .toClass(ctor)
        .inScope(BindingScope.CONTEXT);
      context.bind(ElectronBindings.IPC_METHOD_NAME).to(methodName);
      const sequence: IPCSequence = await context.get(
        ElectronBindings.IPC_SEQUENCE,
      );
      const data = await sequence.execute(...arg);
      try {
        event.sender.send(metadata.eventSuccessName, data);
      } catch (error) {
        event.sender.send(metadata.eventFailureName, error);
      }
    });
  }
}
