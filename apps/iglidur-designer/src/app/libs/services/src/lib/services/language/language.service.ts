import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { StorageKeys, SupportedLanguage } from '@iglidur-designer/interfaces';



@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject: BehaviorSubject<SupportedLanguage>;
  language$: Observable<SupportedLanguage>;

  constructor(
    private storageService: StorageService
  ) {
    const storedLanguage = this.storageService.getItem<SupportedLanguage>(StorageKeys.LANGUAGE);
    this.languageSubject = new BehaviorSubject<SupportedLanguage>(storedLanguage || 'en-UK');
    this.language$ = this.languageSubject.asObservable();
  }

  getLanguage(): SupportedLanguage {
    return this.languageSubject.value;
  }

  setLanguage(language: SupportedLanguage): void {
    this.storageService.setItem<SupportedLanguage>(StorageKeys.LANGUAGE, language);
    this.languageSubject.next(language);
  }
}