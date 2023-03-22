import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/interaction.service';

@Component({
  selector: 'app-pressupost-list',
  templateUrl: './pressupost-list.component.html',
  styleUrls: ['./pressupost-list.component.css']
})

export class PressupostListComponent implements OnInit {

  public pressupostListDefault: any;
  public pressupostList: any;
  public enteredSearchValue: string = "";

  ngOnInit() {
    this._panelMessageSource.panelMessage$
      .subscribe(
        resultArray => {
          this.pressupostListDefault = resultArray;
          console.log(this.pressupostListDefault)
          this.printPressuposts("buttonDefault");
        }
      )
  }

  constructor(
    private _panelMessageSource: InteractionService,
  ) {}

  public orderAlfabethicly() {

    let alfaArray = [...this.pressupostListDefault];
    alfaArray.sort((a, b) => a.budgetName.localeCompare(b.budgetName));
    return alfaArray;
  }

  public orderDate() {
    
    let dateArray = [...this.pressupostListDefault];
    dateArray.sort((a, b) => a.date - b.date);
    return dateArray;
  }

  public printPressuposts(title: string) {

    if(title == "buttonAlfa") {

      this.pressupostList = this.orderAlfabethicly();
    }
    if(title == "buttonDate") {
      
      this.pressupostList = this.orderDate();
    }
    if(title == "buttonDefault") {
      
      this.pressupostList = this.pressupostListDefault;
    }

  }
  
  public onSearchValue(search: string) {

    this.enteredSearchValue = search;
  }
}
