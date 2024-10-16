import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Languages, FlagUrls, SupportedLanguage } from '@iglidur-designer/interfaces';
import { LanguageService } from '@iglidur-designer/services';
import { LanguagesComponent } from '../languages/languages.component';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { flagUrls } from '@iglidur-designer/utils';

type ViewMode = 'perspective' | 'orthographic';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    LanguagesComponent,
    MatDividerModule,
    MatRadioButton,
    MatRadioGroup
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HeaderComponent implements OnInit, OnDestroy {
  public language!: SupportedLanguage;
  private selectedLanguage!: string;
  public isLanguageActive = false;
  private languageSubscription!: Subscription;
  public viewMode: ViewMode = 'perspective';
  private flagUrls = flagUrls;
  public languageCode!: string;
  public languageName!: string;

  toggleView(mode: ViewMode) {
    this.viewMode = mode;
  }
  private destroy$ = new Subject<void>();

  languages: Languages = {
    'en-UK': 'English (UK)',
    'en-US': 'English (US)',
    'de-DE': 'German',
    'ja-JP': 'Japan',
    'fr-FR': 'French',
  
  };

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe((language) => {
        this.translate.use('header.component.i18n');
        this.language = language;
        this.languageCode = language.split('-')[1].toLowerCase();
        this.languageName = this.getLanguageName(this.language);
      });
  }

  getFlagUrl(code: string): string {
    return this.flagUrls[code as keyof FlagUrls] || '';
  }

  getLanguageName(code: SupportedLanguage): string {
    return this.languages[code];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
