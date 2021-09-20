import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import * as config from './techDs.datasource.json';

export class TechDsDataSource extends juggler.DataSource {
  static dataSourceName = 'techDs';

  constructor(
    @inject('datasources.config.techDs', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
