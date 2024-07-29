import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import { Lang } from '@iglidur-designer/interfaces';

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
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  lang = 'fr-FR';
  selectedLang!: string;

  langs: Lang[] = [
    {value: 'en-UK', viewValue: 'English (UK)'},
    {value: 'en-US', viewValue: 'English (US)'},
    {value: 'de-DE', viewValue: 'German'},
    {value: 'ja-JP', viewValue: 'Japan'},
    {value: 'fr-FR', viewValue: 'French'},
  ];
  constructor(private translate: TranslateService) {
    this.translate.use('header.component.i18n');
  }

  onLangChange() {
    console.log(this.selectedLang);
  }
}
