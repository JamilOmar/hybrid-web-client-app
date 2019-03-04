import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './local.datasource.json';

export class LocalDataSource extends juggler.DataSource {
  static dataSourceName = 'local';

  constructor(
    @inject('datasources.config.local', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
