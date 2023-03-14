import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {

  webForm = new FormGroup({
    pageNum: new FormControl(1),
    lenguageNum: new FormControl(1)
  });

  public validNumberPage() {

    if((Number(this.webForm.value.pageNum)) < 1) {

      this.webForm.controls.pageNum.setValue(1);
    }
  }

  public validNumberLenguage() {

    if((Number(this.webForm.value.lenguageNum)) < 1) {

      this.webForm.controls.lenguageNum.setValue(1);
    }
  }
 
  public sumOne(id:string) {

    if(id == "page") {
      this.webForm.controls.pageNum.setValue(Number(this.webForm.value.pageNum) + 1);
    }
    
    if(id == "lenguage") {
      this.webForm.controls.lenguageNum.setValue(Number(this.webForm.value.lenguageNum) + 1);
    }

  }
  public remOne(id:string) {
    
    if(id == "page") {
      this.webForm.controls.pageNum.setValue(Number(this.webForm.value.pageNum) - 1);
      this.validNumberPage();
    }

    if(id == "lenguage") {
      this.webForm.controls.lenguageNum.setValue(Number(this.webForm.value.lenguageNum) - 1);
      this.validNumberLenguage();
    }
  }
}
