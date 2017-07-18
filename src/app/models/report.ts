import { User } from './user';
import { Shop } from './shop';
import { Form } from './form';
import { Answer } from './answer';
import { Process } from './process';
export class Report {
    ref: String
    date: Date
    user: User
    shop: Shop
    form: Form
    answers: Answer[]
    process: Process
    imgs: String[]
}