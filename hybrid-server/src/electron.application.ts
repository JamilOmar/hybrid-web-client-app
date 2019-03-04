import {Application, ApplicationConfig} from '@loopback/core';
import {
  ElectronServer,
  ElectronBindings,
  ElectronServerConfig,
} from './electron-server';
import * as path from 'path';
import {BootMixin} from '@loopback/boot';
import {ServiceMixin} from '@loopback/service-proxy';
import {RepositoryMixin} from '@loopback/repository';

export class ElectronApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(Application)),
) {
  options: ApplicationConfig;
  constructor(options: ApplicationConfig = {}) {
    super(options);
    this.server(ElectronServer);
    this.options = {
      path: path.join(__dirname, '../hybrid-app/index.html'),
      window: {
        minWidth: 800,
        minHeight: 600,
      },
    };
    this.bind(ElectronBindings.APP_CONFIG).to(this
      .options as ElectronServerConfig);
    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.electron.js'],
        nested: true,
      },
    };
  }

  public async loadIPCRoutes() {
    const electronServer = await this.getServer(ElectronServer);
    electronServer.loadIPCRoutes();
  }
}
