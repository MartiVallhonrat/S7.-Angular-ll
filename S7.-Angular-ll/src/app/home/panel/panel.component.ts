import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InteractionService } from 'src/app/interaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { BindQueryParamsFactory } from '@ngneat/bind-query-params';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(
    private _panelMessageSource: InteractionService,
    public modal: NgbModal,
    private factory: BindQueryParamsFactory
  ) {}

  public contentModal: string = "";

  webForm = new FormGroup({
    pageNum: new FormControl(1),
    lenguageNum: new FormControl(1),
  });

  ngOnInit(): void {
    this._panelMessageSource.panelMessage$
    .subscribe()
    this.webForm = new FormGroup({
      pageNum: new FormControl(1),
      lenguageNum: new FormControl(1),
    });
    }

  bindQueryParamsManager = this.factory.create ([
    { queryKey: "pageNum", type: "number" },
    { queryKey: "lenguageNum", type: "number" }
  ]).connect(this.webForm);

  ngOnDestroy() {
    this.bindQueryParamsManager.destroy();
  }

  public sendNumbers() {

    this._panelMessageSource.calculateAndSendMessage(Number(this.webForm.value.pageNum), Number(this.webForm.value.lenguageNum))
  }

  public openModal(content: any, id: string) {
    debugger

    if(id == "pageModal") {
      this.contentModal = "En este componente tiene que indicarse el número de paginas que tendra su sitio web."
      this.modal.open(content, {size: "xl"})
    }
    if(id == "lenguageModal") {
      this.contentModal = "En este componente tiene que indicarse el número de idiomas que tendra su sitio web."
      this.modal.open(content, {size: "xl"})
    }
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
