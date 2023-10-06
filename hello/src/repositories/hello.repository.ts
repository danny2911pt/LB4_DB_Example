import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MSsqlDbDataSource} from '../datasources';
import {Hello, HelloRelations} from '../models';

export class HelloRepository extends DefaultCrudRepository<
  Hello,
  typeof Hello.prototype.Id,
  HelloRelations
> {
  constructor(
    @inject('datasources.MSsqlDB') dataSource: MSsqlDbDataSource,
  ) {
    super(Hello, dataSource);
  }
}
