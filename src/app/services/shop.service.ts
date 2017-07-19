import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Shop } from '../models/shop';

@Injectable()
export class ShopService {
    private shopApi = 'http://localhost:3000/shop';
    constructor(private _http: Http) { }
    getShop():Observable<any[]>{
        return this._http.get(this.shopApi)
            .map(res=>res.json())
            .catch(err=>err.json());
    }
    addShop(shop: Shop): Observable<any> {
        return this._http.post(this.shopApi, shop)
            .map(res => res.json())
            .catch(err => err.json());
    }
    editShop(id,update): Observable<any>{
        return this._http.put(this.shopApi+'/'+id,update)
            .map(res=>res.json())
            .catch(err=>err.json());
    }
    deleteShop(id):Observable<any>{
        return this._http.delete(this.shopApi+'/'+id)
            .map(res=>res.json())
            .catch(err=>err.json());
    }
}