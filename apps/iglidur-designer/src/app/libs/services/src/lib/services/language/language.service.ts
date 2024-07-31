import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('en-UK');
  language$ = this.languageSubject.asObservable();

  getLanguage() {
    return this.languageSubject.value;
  }

  setLanguage(language: string) {
    this.languageSubject.next(language);
  }
}
