import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangService } from '@iglidur-designer/services';
// import tools from '../../../assets/images/tools.png';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss',
})
export class ModelComponent {
  lang!: string;
  tools = '../../../assets/images/tools.png';
  constructor(private translate: TranslateService, private langService: LangService) {
    this.langService.lang$.subscribe((lang) => {
      this.lang = lang;
      this.translate.use('model.component.i18n');
    })
    

  }
}
