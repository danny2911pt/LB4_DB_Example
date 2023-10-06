import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'MSsqlDB',
  connector: 'mssql',
  url: 'mssql://daniel:daniel@LT131941/Testing',
  host: 'LT131941',
  port: 1443,
  connectionTimeout: 30000,
  user: 'daniel',
  password: 'daniel',
  database: 'Testing'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MSsqlDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MSsqlDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MSsqlDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
