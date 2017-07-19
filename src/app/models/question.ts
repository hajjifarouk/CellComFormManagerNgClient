import { Choice } from './choice';
export class Question {
    _id = ''
    body: String
    type: String
    choices: Choice[]
}