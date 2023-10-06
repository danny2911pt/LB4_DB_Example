import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Hello} from '../models';
import {HelloRepository} from '../repositories';

export class HelloController {
  constructor(
    @repository(HelloRepository)
    public helloRepository : HelloRepository,
  ) {}

  @post('/hello')
  @response(200, {
    description: 'Hello model instance',
    content: {'application/json': {schema: getModelSchemaRef(Hello)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hello, {
            title: 'NewHello',
            exclude: ['Id'],
          }),
        },
      },
    })
    hello: Omit<Hello, 'Id'>,
  ): Promise<Hello> {
    return this.helloRepository.create(hello);
  }

  @get('/hello/count')
  @response(200, {
    description: 'Hello model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Hello) where?: Where<Hello>,
  ): Promise<Count> {
    return this.helloRepository.count(where);
  }

  @get('/hello')
  @response(200, {
    description: 'Array of Hello model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Hello, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Hello) filter?: Filter<Hello>,
  ): Promise<Hello[]> {
    return this.helloRepository.find(filter);
  }

  @patch('/hello')
  @response(200, {
    description: 'Hello PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hello, {partial: true}),
        },
      },
    })
    hello: Hello,
    @param.where(Hello) where?: Where<Hello>,
  ): Promise<Count> {
    return this.helloRepository.updateAll(hello, where);
  }

  @get('/hello/{id}')
  @response(200, {
    description: 'Hello model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Hello, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Hello, {exclude: 'where'}) filter?: FilterExcludingWhere<Hello>
  ): Promise<Hello> {
    return this.helloRepository.findById(id, filter);
  }

  @patch('/hello/{id}')
  @response(204, {
    description: 'Hello PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hello, {partial: true}),
        },
      },
    })
    hello: Hello,
  ): Promise<void> {
    await this.helloRepository.updateById(id, hello);
  }

  @put('/hello/{id}')
  @response(204, {
    description: 'Hello PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() hello: Hello,
  ): Promise<void> {
    await this.helloRepository.replaceById(id, hello);
  }

  @del('/hello/{id}')
  @response(204, {
    description: 'Hello DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.helloRepository.deleteById(id);
  }
}
