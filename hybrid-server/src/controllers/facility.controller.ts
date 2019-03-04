import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Facility} from '../models';
import {FacilityRepository} from '../repositories';

export class FacilityController {
  constructor(
    @repository(FacilityRepository)
    public facilityRepository: FacilityRepository,
  ) {}

  @post('/facilities', {
    responses: {
      '200': {
        description: 'Facility model instance',
        content: {'application/json': {schema: {'x-ts-type': Facility}}},
      },
    },
  })
  async create(@requestBody() facility: Facility): Promise<Facility> {
    return await this.facilityRepository.create(facility);
  }

  @get('/facilities/count', {
    responses: {
      '200': {
        description: 'Facility model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Facility)) where?: Where,
  ): Promise<Count> {
    return await this.facilityRepository.count(where);
  }

  @get('/facilities', {
    responses: {
      '200': {
        description: 'Array of Facility model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Facility}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Facility)) filter?: Filter,
  ): Promise<Facility[]> {
    return await this.facilityRepository.find(filter);
  }

  @patch('/facilities', {
    responses: {
      '200': {
        description: 'Facility PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() facility: Facility,
    @param.query.object('where', getWhereSchemaFor(Facility)) where?: Where,
  ): Promise<Count> {
    return await this.facilityRepository.updateAll(facility, where);
  }

  @get('/facilities/{id}', {
    responses: {
      '200': {
        description: 'Facility model instance',
        content: {'application/json': {schema: {'x-ts-type': Facility}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Facility> {
    return await this.facilityRepository.findById(id);
  }

  @patch('/facilities/{id}', {
    responses: {
      '204': {
        description: 'Facility PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() facility: Facility,
  ): Promise<void> {
    await this.facilityRepository.updateById(id, facility);
  }

  @put('/facilities/{id}', {
    responses: {
      '204': {
        description: 'Facility PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() facility: Facility,
  ): Promise<void> {
    await this.facilityRepository.replaceById(id, facility);
  }

  @del('/facilities/{id}', {
    responses: {
      '204': {
        description: 'Facility DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.facilityRepository.deleteById(id);
  }
}
