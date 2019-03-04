import {DefaultCrudRepository} from '@loopback/repository';
import {Facility} from '../models';
import {LocalDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FacilityRepository extends DefaultCrudRepository<
  Facility,
  typeof Facility.prototype.id
> {
  constructor(@inject('datasources.local') dataSource: LocalDataSource) {
    super(Facility, dataSource);
  }
}
