import { Question } from './question';
import { Process } from './process';
export class Form {
    _id = ''
    ref: String
    title: String
    description: String
    isActive: Boolean
    questions: Question[]
    process: Process
}