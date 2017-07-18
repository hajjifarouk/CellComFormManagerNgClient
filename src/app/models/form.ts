import { Question } from './question';
import { Process } from './process';
export class Form {
    ref: String
    title: String
    description: String
    questions: Question[]
    process: Process
}