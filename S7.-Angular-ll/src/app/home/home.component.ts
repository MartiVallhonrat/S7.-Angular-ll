import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../interaction.service';
import { FormControl, FormControlDirective, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import {formatDate} from '@angular/common';

interface Budget {
  budgetName: string | null | undefined;
  clientName: string | null | undefined;
  isCheckedWeb: boolean | null | undefined;
  isCheckedSEO: boolean | null | undefined;
  isCheckedAds: boolean | null | undefined;
  totalPrice: number;
  date: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(
    private _panelMessageSource: InteractionService
  ) {}


  public plusPriceWeb: number = 30;
  public totalPrice = 0;
  public pressupostList: Budget[] = [];
  public submited: boolean = false;
  
  
  budgetForm = new FormGroup({
    budgetName: new FormControl('', Validators.required),
    clientName: new FormControl('', Validators.required),
    isCheckedWeb: new FormControl(false),
    isCheckedSEO: new FormControl(false),
    isCheckedAds: new FormControl(false)
  })

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

    if(this.budgetForm.value.isCheckedWeb) {
      price = price + (500 + this.plusPriceWeb);
    } else {
      this.plusPriceWeb = 30;
    }
    if(this.budgetForm.value.isCheckedSEO) {
      price = price + 300;
    }
    if(this.budgetForm.value.isCheckedAds) {
      price = price + 200;
    }

    this.totalPrice = price;
  }

  public pushPressupostList() {

    if(this.budgetForm.valid) {

      this.pressupostList.push({
        budgetName: this.budgetForm.value.budgetName,
        clientName: this.budgetForm.value.clientName,
        isCheckedWeb: this.budgetForm.value.isCheckedWeb,
        isCheckedSEO: this.budgetForm.value.isCheckedSEO,
        isCheckedAds: this.budgetForm.value.isCheckedAds,
        totalPrice: this.totalPrice,
        date: formatDate(new Date(), 'yyyy/MM/dd', 'en')
      })

      this._panelMessageSource.renderPressupostList(this.pressupostList);

      this.budgetForm.reset();
      this.submited = false;
      this.checkTotal();
    } else {

      this.submited = true;
    }
  }
}
