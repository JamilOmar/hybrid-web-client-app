import { Entity, model, property } from '@loopback/repository';

@model({ idInjection: true, settings: { strict: false, } })
export class Facility extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,

  })
  id: number;

  @property({
    type: 'string',
  })
  name?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // tslint:disable-next-line:no-any
  [prop: string]: any;

  constructor(data?: Partial<Facility>) {
    super(data);
  }
}
