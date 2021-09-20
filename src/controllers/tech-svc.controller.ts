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
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Tech} from '../models';
import {TechRepository} from '../repositories';

export class TechSvcController {
  constructor(
    @repository(TechRepository)
    public techRepository: TechRepository,
  ) {}

  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/techSvc/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return 'status: ok';
  }

  // @post('/acc-api/attachment', {
  //   responses: {
  //     '200': {
  //       description: 'Attachment model instance',
  //       content: { 'application/json': { schema: { 'x-ts-type': Attachment } } },
  //     },
  //   },
  // })
  // async create(@requestBody() attachment: Attachment): Promise<Attachment> {
  //   return await this.attachmentRepository.create(attachment);
  // }

  @post('/techSvc', {
    responses: {
      '200': {
        description: 'Tech model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tech)}},
      },
    },
  })

  //   async create(@requestBody() tech: Tech): Promise<Tech> {
  //     return this.techRepository.create(tech);
  // }
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tech, {exclude: ['id']}),
        },
      },
    })
    tech: Omit<Tech, 'id'>,
  ): Promise<Tech> {
    return this.techRepository.create(tech);
  }

  @get('/techSvc/count', {
    responses: {
      '200': {
        description: 'Tech model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Tech)) where?: Where<Tech>,
  ): Promise<Count> {
    return this.techRepository.count(where);
  }

  @get('/techSvc', {
    responses: {
      '200': {
        description: 'Array of Tech model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tech)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Tech))
    filter?: Filter<Tech>,
  ): Promise<Tech[]> {
    return this.techRepository.find(filter);
  }

  @patch('/techSvc', {
    responses: {
      '200': {
        description: 'Tech PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tech, {partial: true}),
        },
      },
    })
    tech: Tech,
    @param.query.object('where', getWhereSchemaFor(Tech)) where?: Where<Tech>,
  ): Promise<Count> {
    return this.techRepository.updateAll(tech, where);
  }

  @get('/techSvc/{id}', {
    responses: {
      '200': {
        description: 'Tech model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tech)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Tech> {
    return this.techRepository.findById(id);
  }

  @patch('/techSvc/{id}', {
    responses: {
      '204': {
        description: 'Tech PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tech, {partial: true}),
        },
      },
    })
    tech: Tech,
  ): Promise<void> {
    await this.techRepository.updateById(id, tech);
  }

  @put('/techSvc/{id}', {
    responses: {
      '204': {
        description: 'Tech PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tech: Tech,
  ): Promise<void> {
    await this.techRepository.replaceById(id, tech);
  }

  @del('/techSvc/{id}', {
    responses: {
      '204': {
        description: 'Tech DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.techRepository.deleteById(id);
  }
}
