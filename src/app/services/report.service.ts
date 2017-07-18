import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Report } from '../models/report';

@Injectable()
export class ReportService {
    private reportApi = 'http://localhost:3000/report';
    constructor(private _http: Http) { }
    
    addReport(report: Report): Observable<any> {
        return this._http.post(this.reportApi, report)
            .map(res => res.json())
            .catch(err => err.json());
    }
    editReport(id,update): Observable<any>{
        return this._http.put(this.reportApi+'/'+id,update)
            .map(res=>res.json())
            .catch(err=>err.json());
    }
    deleteReport(id):Observable<any>{
        return this._http.delete(this.reportApi+'/'+id)
            .map(res=>res.json())
            .catch(err=>err.json());
    }
}