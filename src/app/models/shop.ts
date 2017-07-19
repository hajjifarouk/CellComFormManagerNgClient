import { Place } from './place';
import { Process } from './process';
export class Shop {
  _id = ''
  code: Number
  shop_name: String
  client_name: String
  email: String
  tel: Number
  address: String
  city: String
  province: String
  place: Place
  process: Process
}