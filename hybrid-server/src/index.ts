import {RestServerApplication} from './rest.application';
import {ElectronApplication} from './electron.application';
import {ApplicationConfig} from '@loopback/core';
import {ElectronBindings} from './electron-server';
import {IPCSequence} from './electron-server/ipcSequence';

export {RestServerApplication, ElectronApplication};

export async function main(options: ApplicationConfig = {}) {
  const applicationType: string | undefined = process.env.APPLICATION_TYPE;
  let app;
  switch (applicationType) {
    case 'electron':
      app = new ElectronApplication(options);
      await app.start();
      await app.boot();
      app.bind(ElectronBindings.IPC_SEQUENCE).toClass(IPCSequence);
      await app.loadIPCRoutes();
      console.log(`Electron Application Started`);
      break;

    case 'services':
    default:
      app = new RestServerApplication(options);
      await app.boot();
      await app.start();

      const url = app.restServer.url;
      console.log(`Server is running at ${url}`);
      console.log(`Try ${url}/ping`);

      break;
  }
  return app;
}
