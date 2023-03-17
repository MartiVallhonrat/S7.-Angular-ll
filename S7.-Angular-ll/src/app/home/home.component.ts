import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../interaction.service';

interface Budget {
  budgetName: string;
  clientName: string;
  isCheckedWeb: boolean;
  isCheckedSEO: boolean;
  isCheckedAds: boolean;
  totalPrice: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private _panelMessageSource: InteractionService) {}

  public budgetName: any;
  public clientName: any;
  public isCheckedWeb: any = false;
  public plusPriceWeb: number = 30;
  public isCheckedSEO: any = false;
  public isCheckedAds: any = false;
  public totalPrice: number = 0;

  public pressupostList: Budget[] = [];
  
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
    } else {
      this.plusPriceWeb = 30;
    }
    if(this.isCheckedSEO) {
      price = price + 300;
    }
    if(this.isCheckedAds) {
      price = price + 200;
    }

    this.totalPrice = price;
  }

  public pushPressupostList() {

    this.pressupostList.push({
      budgetName: this.budgetName,
      clientName: this.clientName,
      isCheckedWeb: this.isCheckedWeb,
      isCheckedSEO: this.isCheckedSEO,
      isCheckedAds: this.isCheckedAds,
      totalPrice: this.totalPrice
    })

    console.log(this.pressupostList)
  }
}
