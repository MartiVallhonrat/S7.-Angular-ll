import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../interaction.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {formatDate} from '@angular/common';
import { BindQueryParamsFactory } from '@ngneat/bind-query-params';

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
    private _panelMessageSource: InteractionService,
    private factory: BindQueryParamsFactory
  ) {}


  public plusPriceWeb: number = 30;
  public totalPrice: number = 0;
  public pressupostList: Budget[] = [];
  public submited: boolean = false;
  public customError: boolean = false;
  
  
  budgetForm = new FormGroup({
    budgetName: new FormControl('', Validators.required),
    clientName: new FormControl('', Validators.required),
    isCheckedWeb: new FormControl(false),
    isCheckedSEO: new FormControl(false),
    isCheckedAds: new FormControl(false)
  })

  bindQueryParamsManager = this.factory.create ([
    { queryKey: "budgetName" },
    { queryKey: "clientName" },
    { queryKey: "isCheckedWeb", type: "boolean" },
    { queryKey: "isCheckedSEO", type: "boolean" },
    { queryKey: "isCheckedAds", type: "boolean" }
  ]).connect(this.budgetForm);

  ngOnDestroy() {
    this.bindQueryParamsManager.destroy();
  }

  ngOnInit() {
    this.checkTotal();
    this._panelMessageSource.panelMessage$
      .subscribe(
        resultMessage => {
          this.plusPriceWeb = resultMessage;
          this.checkTotal()
        }
      )
  }

  public checkCustomError() {

    if(this.budgetForm.value.isCheckedWeb == false && this.budgetForm.value.isCheckedSEO == false && this.budgetForm.value.isCheckedAds == false) {

      this.customError = true;
    } else {

      this.customError = false;
    }
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
    this.checkCustomError();
  }

  public pushPressupostList() {

    this.checkCustomError();

    if(this.budgetForm.valid && !this.customError) {

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
      this._panelMessageSource.clearPanel();
      this.checkTotal();
    } else {

      this.submited = true;
    }
  }
}
