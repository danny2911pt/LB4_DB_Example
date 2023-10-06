import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {MSsqlDbDataSource} from '../datasources';
import {Event, EventRelations} from '../models';
import {HelloRepository} from './hello.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.EventId,
  EventRelations
> {
  public helloRepositoryGetter: Getter<HelloRepository>;
  constructor(
    @inject('datasources.MSsqlDB') dataSource: MSsqlDbDataSource,
    @repository.getter('HelloRepository')
    helloRepositoryGetter: Getter<HelloRepository>,
  ) {
    super(Event, dataSource);
    this.helloRepositoryGetter = helloRepositoryGetter;
  }
  async findById(
    id: typeof Event.prototype.EventId,
    filter?: any,
    options?: any,
  ): Promise<Event & {Greetings?: string}> {
    const helloRepository = await this.helloRepositoryGetter();

    // Get the original event data
    const event = await super.findById(id, filter, options);

    // Fetch the greeting using the event's language
    const hello = await helloRepository.findOne({where: {Language: event.Language}});

    // Attach the Greetings to the event object
    if (hello) {
      event.hello.Greetings=hello.Greetings;
    }

    return event;
  }
}
