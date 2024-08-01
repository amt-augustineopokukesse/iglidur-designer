import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import { Language } from '@iglidur-designer/interfaces';
import { LanguageService } from '@iglidur-designer/services';
import { LanguagesComponent } from '../languages/languages.component';
import { Subscription } from 'rxjs';

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
    LanguagesComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  language!: string;
  selectedLanguage!: string;
  isLanguageActive = false;
  languageSubscription!: Subscription;

  languages: Language[] = [
    {value: 'en-UK', viewValue: 'English (UK)'},
    {value: 'en-US', viewValue: 'English (US)'},
    {value: 'de-DE', viewValue: 'German'},
    {value: 'ja-JP', viewValue: 'Japan'},
    {value: 'fr-FR', viewValue: 'French'},
  ];


  constructor(private translate: TranslateService, private languageService: LanguageService) {
    
  }

  ngOnInit(): void {
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.language = language;
      this.translate.use('header.component.i18n');
    });
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }
}
