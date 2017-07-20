import { Component } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Shop } from '../../models/shop';


import { AgmCoreModule } from '@agm/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
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

  marker = { latitude: 33.8869, longitude: 9.5375, label: 's', draggable: true }
  allowedFileType: any = ['xls', 'xlsx'];
  
  importResponse: Array<any> = [];

  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/api',
    itemAlias: 'photo',
    allowedFileType: this.allowedFileType
  });
  constructor(private _shopService: ShopService) {
    this.newShop = new Shop();
    this.selectedShop = new Shop();
    this._shopService.getShop().subscribe(
      value => { this.shops = value; console.log(value); },
      error => { console.log(error) }
    );
  }
  saveShop() {
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
        this.newShop = new Shop();
      },
      error => { console.log(error) }
    );
  }
  editShop() {
    console.log(this.selectedShop);
    this._shopService.editShop(this.selectedShop._id, this.selectedShop).subscribe(
      value => {
        console.log(value);
        this._shopService.getShop().subscribe(
          value => {
            this.shops = value;
            console.log(value);
          },
          error => { console.log(error) }
        );
        this.selectedShop = new Shop();
      },
      error => { console.log(error) }
    );
  }
  deleteShop() {
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
        this.selectedShop = new Shop();
      },
      error => { console.log(error) }
    );
  }
  import() {
    this.importResponse.forEach(element => {
      this.newShop.shop_name = element.first_name;
      this.newShop.client_name = element.last_name;
      this.newShop.code = element.code;
      this.newShop.email= element.email;
      this.newShop.tel=element.tel;
      this.newShop.process=element.process;
      this.newShop.address = element.address;
      this.newShop.city = element.city;
      this.newShop.province = element.province;
      this._shopService.addShop(this.newShop)
        .subscribe(
        (data) => { console.log(data) },
        (error) => { console.log(error) }
        );
    });
    this.newShop = new Shop();
  }

}
