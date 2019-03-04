import {inject, Context} from '@loopback/context';
import {Server, Application, CoreBindings} from '@loopback/core';
import * as _ from 'lodash';
import {ElectronServerConfig} from './types';
import {ElectronBindings} from './keys';
import electron = require('electron');

export class ElectronServer extends Context implements Server {
  // required property for the Server
  private _listening: boolean = false;
  // electron App
  private _app: electron.App;
  // electron window
  private _window: electron.BrowserWindow | null | undefined;

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) public app?: Application,
    @inject(ElectronBindings.APP_CONFIG) public config?: ElectronServerConfig,
  ) {
    super(app);

    this._app = electron.app;
    this.config = _.defaultsDeep(config, {
      path: '/public/index.html',
      window: {
        minWidth: 800,
        minHeight: 600,
      },
    });
  }
  // implementation of the server interface
  get listening() {
    return this._listening;
  }

  // starts the server
  async start(): Promise<void> {
    this._listening = true;
    this._app.on('ready', () => this.createWindow());
    this._app.on('activate', () => {
      if (this._window === null) {
        this.createWindow();
      }
    });
  }

  //  stop the server
  async stop(): Promise<void> {
    this._listening = false;
    this._app.quit();
  }

  // method for creating the electron window
  createWindow(): void {
    // set the browser window
    this._window = new electron.BrowserWindow(_.get(this.config, 'window'));
    // load the html file
    this._window.loadFile(_.get(this.config, `path`, ''));

    this._window.on('closed', () => {
      this._window = null;
    });
  }
}
