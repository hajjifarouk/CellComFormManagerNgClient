import { User } from './user';
import { Visit } from './visit';
export class Plan {
    _id = ''
    date: Date
    user: User
    visits: Visit[]
}