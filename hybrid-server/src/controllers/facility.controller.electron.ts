import {Count, Filter, repository} from '@loopback/repository';
import {Facility} from '../models';
import {ipc} from '../electron-server';
import {FacilityRepository} from '../repositories';

export class FacilityController {
  constructor(
    @repository(FacilityRepository)
    public facilityRepository: FacilityRepository,
  ) {}

  @ipc('facility-create')
  // tslint:disable-next-line:no-any
  async create(facility: Facility): Promise<Facility> {
    return await this.facilityRepository.create(facility);
  }

  @ipc('facility-count')
  // tslint:disable-next-line:no-shadowed-variable
  // tslint:disable-next-line:no-any
  async count(where?: any): Promise<Count> {
    return await this.facilityRepository.count(where);
  }

  @ipc('facility-find')
  async find(filter?: Filter): Promise<Facility[]> {
    return await this.facilityRepository.find(filter);
  }

  @ipc('facility-updateAll')
  async updateAll(
    facility: Facility,
    // tslint:disable-next-line:no-any
    where?: any,
  ): Promise<Count> {
    return await this.facilityRepository.updateAll(facility, where);
  }

  @ipc('facility-findById')
  // tslint:disable-next-line:no-any
  async findById(id: number): Promise<Facility> {
    return await this.facilityRepository.findById(id);
  }

  @ipc('facility-updateById')
  async updateById(id: number, facility: Facility): Promise<void> {
    await this.facilityRepository.updateById(id, facility);
  }

  @ipc('facility-replaceById')
  async replaceById(id: number, facility: Facility): Promise<void> {
    await this.facilityRepository.replaceById(id, facility);
  }

  @ipc('facility-deleteById')
  async deleteById(
    // tslint:disable-next-line:no-any
    id: number,
  ): Promise<void> {
    await this.facilityRepository.deleteById(id);
  }
}
