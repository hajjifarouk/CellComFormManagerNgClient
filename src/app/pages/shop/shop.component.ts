import { Component } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Shop } from '../../models/shop';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  filterQuery = "";
  rowsOnPage = 2;
  private shops: Array<Shop> = [];
  private newShop: Shop;
  private selectedShop: Shop;
  constructor(private _shopService: ShopService) {
    this.newShop = new Shop();
    this.selectedShop = new Shop();
    this._shopService.getShop().subscribe(
      value => { this.shops = value; console.log(value); },
      error => { console.log(error) }
    );
  }
  saveShop(){
    this._shopService.addShop(this.newShop).subscribe(
      value => {
        console.log(value);
        this._shopService.getShop().subscribe(
          value => {
          this.shops = value;
            console.log(value);
          },
          error => { console.log(error) }
        );
        this.newShop=new Shop();
      },
      error => { console.log(error) }
    );
  }
  editShop(){
    console.log(this.selectedShop);
    this._shopService.editShop(this.selectedShop._id,this.selectedShop).subscribe(
      value => {
        console.log(value);
        this._shopService.getShop().subscribe(
          value => {
          this.shops = value;
            console.log(value);
          },
          error => { console.log(error) }
        );
        this.selectedShop=new Shop();
      },
      error => { console.log(error) }
    );
  }
  deleteShop(){
    this._shopService.deleteShop(this.selectedShop._id).subscribe(
      value => {
        console.log(value);
        this._shopService.getShop().subscribe(
          value => {
          this.shops = value;
            console.log(value);
          },
          error => { console.log(error) }
        );
        this.selectedShop=new Shop();
      },
      error => { console.log(error) }
    );
  }


}
