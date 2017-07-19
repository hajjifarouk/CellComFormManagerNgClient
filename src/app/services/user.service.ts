import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { User } from '../models/user';

@Injectable()
export class UserService {
    private userApi = 'http://localhost:3000/user';
    constructor(private _http: Http) { }
    getUser():Observable<any[]>{
        return this._http.get(this.userApi)
            .map(res=>res.json())
            .catch(err=>err.json());
    }
    addUser(user: User): Observable<any> {
        return this._http.post(this.userApi, user)
            .map(res => {res.json();console.log("added")})
            .catch(err => err.json());
    }
    editUser(id,update): Observable<any>{
        return this._http.put(this.userApi+'/'+id,update)
            .map(res=>res.json())
            .catch(err=>err.json());
    }
    deleteUser(id):Observable<any>{
        return this._http.delete(this.userApi+'/'+id)
            .map(res=>res.json())
            .catch(err=>err.json());
    }
}