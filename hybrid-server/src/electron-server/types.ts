// electron server interface
export type ElectronServerConfig = {
  path: string;
  // tslint:disable-next-line:no-any
  [key: string]: any;
};

export type ElectronMetadata = {
  eventName: string;
  eventSuccessName: string;
  eventFailureName: string;
};
