import {Application, ApplicationConfig} from '@loopback/core';
import {
  ElectronServer,
  ElectronBindings,
  ElectronServerConfig,
} from './electron-server';
import * as path from 'path';

export class ElectronApplication extends Application {
  options: ApplicationConfig;
  constructor(options: ApplicationConfig = {}) {
    super(options);
    this.server(ElectronServer);
    this.options = {
      path: path.join(__dirname, '../public/index.html'),
      window: {
        minWidth: 800,
        minHeight: 600,
      },
    };
    this.bind(ElectronBindings.APP_CONFIG).to(this
      .options as ElectronServerConfig);
  }
}
