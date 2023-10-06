import {Entity, hasMany, model, property} from '@loopback/repository';


@model()
export class Hello extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Greetings: string;

  @property({
    type: 'string',
    required: true,
  })
  Language: string;


  constructor(data?: Partial<Hello>) {
    super(data);
  }
}

export interface HelloRelations {
  // describe navigational properties here
}

export type HelloWithRelations = Hello & HelloRelations;
