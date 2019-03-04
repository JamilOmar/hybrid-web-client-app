import {BindingKey} from '@loopback/context';
import {ElectronServerConfig} from './types';
// nanmespace for binding configurations
export namespace ElectronBindings {
  export const APP_CONFIG = BindingKey.create<ElectronServerConfig>(
    'electronServer.config',
  );
}
