import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _panelMessageSource = new Subject<number>();
  panelMessage$ = this._panelMessageSource.asObservable();

  constructor() { }

  calculateAndSendMessage(pageNum: number, lenguageNum: number) {

    const resultMessage = (pageNum * lenguageNum * 30)

    this._panelMessageSource.next(resultMessage);
  }
}
