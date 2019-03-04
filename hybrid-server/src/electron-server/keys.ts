import {BindingKey} from '@loopback/context';
import {ElectronServerConfig} from './types';
// nanmespace for binding configurations
export namespace ElectronBindings {
  export const APP_CONFIG = BindingKey.create<ElectronServerConfig>(
    'electron.server.config',
  );

  export const IPC_SEQUENCE = 'electron.ipc.sequence';
  export const IPC_CONTROLLER = 'electron.ipc.controller';
  export const IPC_METHOD = 'electron.ipc.method';
  export const IPC_METHOD_NAME = 'electron.ipc.method.name';
  export const IPC_CONTEXT = 'electron.ipc.context';
}
/**
 * The key used to store log-related via @loopback/metadata and reflection.
 */
export const ELECTRON_METADATA_KEY = 'electron.metadata';
