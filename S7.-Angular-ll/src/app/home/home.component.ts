import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../interaction.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Budget {
  budgetName: any;
  clientName: any;
  isCheckedWeb: any;
  isCheckedSEO: any;
  isCheckedAds: any;
  totalPrice: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private _panelMessageSource: InteractionService) {}


  public plusPriceWeb:number = 30;
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
          console.log(this.plusPriceWeb)
          this.checkTotal()
        }
      )
  }

  public setClear() {
    this.budgetForm.value.budgetName = "";
    this.budgetForm.value.clientName = "";
    this.budgetForm.value.isCheckedWeb = false;
    this.budgetForm.value.isCheckedSEO = false;
    this.budgetForm.value.isCheckedAds = false;
    this.plusPriceWeb = 30;
    this.checkTotal();
  }
  

  public checkTotal() {

    this.totalPrice = 0;
    let price: number = this.totalPrice;

    if(this.budgetForm.value.isCheckedWeb) {
      price = price + (500 + this.plusPriceWeb);
      console.log(this.plusPriceWeb)
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

    this.submited = true;

    if(!this.budgetForm.controls['clientName'].errors?.['required'] && !this.budgetForm.controls['budgetName'].errors?.['required']) {

      this.pressupostList.push({
        budgetName: this.budgetForm.value.budgetName,
        clientName: this.budgetForm.value.clientName,
        isCheckedWeb: this.budgetForm.value.isCheckedWeb,
        isCheckedSEO: this.budgetForm.value.isCheckedSEO,
        isCheckedAds: this.budgetForm.value.isCheckedAds,
        totalPrice: this.totalPrice
      })

      this.setClear();
    }

    console.log(this.pressupostList)
    this._panelMessageSource.renderPressupostList(this.pressupostList);
    

  }
}
