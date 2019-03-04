import {inject} from '@loopback/context';
import {ElectronBindings} from './keys';

export interface IPCSequenceInterface {
  // tslint:disable-next-line:no-any
  execute(...params: any): Promise<any>;
}

export class IPCSequence implements IPCSequenceInterface {
  constructor(
    @inject(ElectronBindings.IPC_CONTROLLER)
    protected controller: {[method: string]: Function},
    @inject(ElectronBindings.IPC_METHOD_NAME) protected method: string,
  ) {}

  // tslint:disable-next-line:no-any
  async execute(...params: any): Promise<any> {
    const response = await this.controller[this.method](...params);
    return response;
  }
}
