import {DefaultCrudRepository} from '@loopback/repository';
import {Tech, TechRelations} from '../models';
import {TechDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TechRepository extends DefaultCrudRepository<
  Tech,
  typeof Tech.prototype.id,
  TechRelations
> {
  constructor(
    @inject('datasources.techDs') dataSource: TechDsDataSource,
  ) {
    super(Tech, dataSource);
  }
}
