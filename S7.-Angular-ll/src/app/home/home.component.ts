import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  public totalPrice: number = 0;
  public isCheckedWeb: any;
  public isCheckedSEO: any;
  public isCheckedAds: any;

  public checkTotal() {

    this.totalPrice = 0;
    let price: number = this.totalPrice;

    if(this.isCheckedWeb) {
      price = price + 500;
    }
    if(this.isCheckedSEO) {
      price = price + 300;
    }
    if(this.isCheckedAds) {
      price = price + 200;
    }

    this.totalPrice = price;
  }
}
