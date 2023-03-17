import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InteractionService } from 'src/app/interaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {

  constructor(
    private _panelMessageSource: InteractionService,
    public modal: NgbModal,
  ) {}

  public pageModal: boolean = false;

  webForm = new FormGroup({
    pageNum: new FormControl(1),
    lenguageNum: new FormControl(1)
  });

  public sendNumbers() {

    this._panelMessageSource.calculateAndSendMessage(Number(this.webForm.value.pageNum), Number(this.webForm.value.lenguageNum))
  }

  public openModal(content: any, id: string) {

    if(id == "pageModal") {
      this.pageModal = true;
    }
    if(id == "lenguageModal") {
      this.pageModal = false;
    }

    this.modal.open(content, {size: "xl"})
  }

  public validNumberPage() {

    if((Number(this.webForm.value.pageNum)) < 1) {

      this.webForm.controls.pageNum.setValue(1);
    }

    this.sendNumbers()
  }

  public validNumberLenguage() {

    if((Number(this.webForm.value.lenguageNum)) < 1) {

      this.webForm.controls.lenguageNum.setValue(1);
    }

    this.sendNumbers()
  }
 
  public sumOne(id:string) {

    if(id == "page") {
      this.webForm.controls.pageNum.setValue(Number(this.webForm.value.pageNum) + 1);
    }
    
    if(id == "lenguage") {
      this.webForm.controls.lenguageNum.setValue(Number(this.webForm.value.lenguageNum) + 1);
    }

    this.validNumberLenguage()
    this.validNumberPage()

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

    this.validNumberLenguage()
    this.validNumberPage()
  }
}
