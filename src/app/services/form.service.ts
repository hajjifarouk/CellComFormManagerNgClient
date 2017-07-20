import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Form } from '../models/form';

@Injectable()
export class FormService {
    private formApi = 'http://localhost:3000/form';
    constructor(private _http: Http) { }
    getForm():Observable<any[]>{
        return this._http.get(this.formApi)
            .map(res=>res.json())
            .catch(err=>err.json());
    }
    addForm(form: Form): Observable<any> {
        return this._http.post(this.formApi, form)
            .map(res => res.json())
            .catch(err => err.json());
    }
    editForm(id,update): Observable<any>{
        return this._http.put(this.formApi+'/'+id,update)
            .map(res=>res.json())
            .catch(err=>err.json());
    }
    deleteForm(id):Observable<any>{
        return this._http.delete(this.formApi+'/'+id)
            .map(res=>res.json())
            .catch(err=>err.json());
    }
}