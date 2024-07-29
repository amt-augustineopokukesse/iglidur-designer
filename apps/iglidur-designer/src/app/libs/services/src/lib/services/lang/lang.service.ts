import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  private langSubject = new BehaviorSubject<string>('en-UK');
  lang$ = this.langSubject.asObservable();

  getLang() {
    return this.langSubject.value;
  }

  setLang(lang: string) {
    this.langSubject.next(lang);
  }
}
