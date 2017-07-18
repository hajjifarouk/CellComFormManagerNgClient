import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Question } from '../models/question';

@Injectable()
export class QuestionService {
    private questionApi = 'http://localhost:3000/question';
    constructor(private _http: Http) { }
    
    addQuestion(question: Question): Observable<any> {
        return this._http.post(this.questionApi, question)
            .map(res => res.json())
            .catch(err => err.json());
    }
    editQuestion(id,update): Observable<any>{
        return this._http.put(this.questionApi+'/'+id,update)
            .map(res=>res.json())
            .catch(err=>err.json());
    }
    deleteQuestion(id):Observable<any>{
        return this._http.delete(this.questionApi+'/'+id)
            .map(res=>res.json())
            .catch(err=>err.json());
    }
}