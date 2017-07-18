import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Plan } from '../models/plan';

@Injectable()
export class PlanService {
    private planApi = 'http://localhost:3000/plan';
    constructor(private _http: Http) { }
    
    addPlan(plan: Plan): Observable<any> {
        return this._http.post(this.planApi, plan)
            .map(res => res.json())
            .catch(err => err.json());
    }
    editPlan(id,update): Observable<any>{
        return this._http.put(this.planApi+'/'+id,update)
            .map(res=>res.json())
            .catch(err=>err.json());
    }
    deletePlan(id):Observable<any>{
        return this._http.delete(this.planApi+'/'+id)
            .map(res=>res.json())
            .catch(err=>err.json());
    }
}