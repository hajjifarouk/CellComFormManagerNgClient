import { Place } from './place';
import { Process } from './process';
export class User {
    _id = ''
    first_name: String
    last_name: String
    email: String
    tel: Number
    isActive: Boolean
    isOnline: Boolean
    place: Place
    process: Process
    role: String
}