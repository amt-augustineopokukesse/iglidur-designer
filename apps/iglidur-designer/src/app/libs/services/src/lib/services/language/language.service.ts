import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('en-UK');
  language$ = this.languageSubject.asObservable();
  private loadedTranslations: Set<string> = new Set();

  constructor(private translate: TranslateService) {}

  async loadTranslation(translationKey: string): Promise<void> {
    if (this.loadedTranslations.has(translationKey)) {
      return;
    }

    await this.translate.use(translationKey).toPromise();
    this.loadedTranslations.add(translationKey);
  }

  getLanguage() {
    return this.languageSubject.value;
  }

  setLanguage(language: string) {
    this.languageSubject.next(language);
  }
}
