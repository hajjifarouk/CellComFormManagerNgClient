import { User } from './user';
import { Visit } from './visit';
export class Plan {
    date: Date
    user: User
    visits: Visit[]
}