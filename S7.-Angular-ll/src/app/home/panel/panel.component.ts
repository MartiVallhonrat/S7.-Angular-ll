import { Component } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {

  public valuePage: number = 1;
  public valueLenguage: number = 1;

 
  public sumOne(id:string) {

    if(id == "pageSum") {
      this.valuePage = this.valuePage + 1;
    }
    if(id == "lenguageSum") {
      this.valueLenguage = this.valueLenguage + 1;
    }

  }
  public remOne(id:string) {
    
    if(id == "pageRem") {
      this.valuePage = this.valuePage - 1;
      if(this.valuePage < 1) {
        this.valuePage = 1;
      } 
    }

    if(id == "lenguageRem") {
      this.valueLenguage = this.valueLenguage - 1;
      if(this.valueLenguage < 1) {
        this.valueLenguage = 1;
      }
    }
  }
}
