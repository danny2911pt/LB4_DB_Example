import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Hello, HelloWithRelations} from './hello.model';
@model()
export class Event extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  EventId?: number;

  @property({
    type: 'string',
    required: true,
  })
  Gesture: string;

  @property({
    type: 'string',
    required: true,
  })
  Language: string;

  @belongsTo(() => Hello, {keyFrom: 'language', keyTo: 'language'})
  language: string;


  constructor(data?: Partial<Event>) {
    super(data);
  }
}

export interface EventRelations {
  // describe navigational properties here
  hello?: HelloWithRelations
}

export type EventWithRelations = Event & EventRelations;
