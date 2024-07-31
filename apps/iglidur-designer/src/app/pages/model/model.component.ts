import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@iglidur-designer/services';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss',
})
export class ModelComponent {
  language!: string;
  tools = '../../../assets/images/tools.png';
  constructor(private translate: TranslateService, private languageService: LanguageService) {
    this.languageService.language$.subscribe((language) => {
      this.language = language;
      this.translate.use('model.component.i18n');
    })
    

  }
}
