import {ELECTRON_METADATA_KEY} from '../keys';
import {
  Constructor,
  MethodDecoratorFactory,
  MetadataInspector,
} from '@loopback/context';
import {ElectronMetadata} from '../types';

export function ipc(
  eventName: string,
  eventSuccessName?: string,
  eventFailureName?: string,
) {
  return MethodDecoratorFactory.createDecorator<ElectronMetadata>(
    ELECTRON_METADATA_KEY,
    {
      eventName: eventName,
      eventSuccessName: eventSuccessName || `${eventName}-success`,
      eventFailureName: eventFailureName || `${eventName}-error`,
    },
  );
}

export function getIPCMetadata(
  controllerClass: Constructor<{}>,
  methodName: string,
): ElectronMetadata | undefined {
  return MetadataInspector.getMethodMetadata<ElectronMetadata>(
    ELECTRON_METADATA_KEY,
    controllerClass.prototype,
    methodName,
  );
}
