import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/interaction.service';

@Component({
  selector: 'app-pressupost-list',
  templateUrl: './pressupost-list.component.html',
  styleUrls: ['./pressupost-list.component.css']
})
export class PressupostListComponent implements OnInit {

  public pressupostList: any;

  ngOnInit() {
    this._panelMessageSource.panelMessage$
      .subscribe(
        resultArray => {
          this.pressupostList = resultArray;
          console.log(this.pressupostList)
        }
      )
  }

  constructor(
    private _panelMessageSource: InteractionService
  ) {}
}
