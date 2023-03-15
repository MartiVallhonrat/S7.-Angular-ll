import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../interaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _panelMessageSource: InteractionService) {}

  public totalPrice: number = 0;
  public isCheckedWeb: any;
  public isCheckedSEO: any;
  public isCheckedAds: any;
  public plusPriceWeb: number = 30;

  ngOnInit() {
    this._panelMessageSource.panelMessage$
      .subscribe(
        resultMessage => {
          this.plusPriceWeb = resultMessage;
          this.checkTotal()
        }
      )
  }

  public checkTotal() {

    this.totalPrice = 0;
    let price: number = this.totalPrice;

    if(this.isCheckedWeb) {
      price = price + (500 + this.plusPriceWeb);
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
