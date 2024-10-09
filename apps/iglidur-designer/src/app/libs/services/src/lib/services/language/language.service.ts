import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { SupportedLanguage } from '@iglidur-designer/interfaces';



@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject: BehaviorSubject<SupportedLanguage>;
  language$: Observable<SupportedLanguage>;

  constructor(
    private storageService: StorageService
  ) {
    const storedLanguage = this.storageService.getItem<SupportedLanguage>('language');
    this.languageSubject = new BehaviorSubject<SupportedLanguage>(storedLanguage || 'en-UK');
    this.language$ = this.languageSubject.asObservable();
  }

  getLanguage(): SupportedLanguage {
    return this.languageSubject.value;
  }

  setLanguage(language: SupportedLanguage): void {
    this.storageService.setItem<SupportedLanguage>('language', language);
    this.languageSubject.next(language);
  }
}