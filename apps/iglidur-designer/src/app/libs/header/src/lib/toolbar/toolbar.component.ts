import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@iglidur-designer/services';

@Component({
  selector: 'lib-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  language!: string;
  links = [
    { name: 'MODEL', url: 'model' },
    { name: 'MATERIAL', url: 'material' },
    { name: 'POST-PROCESSING', url: 'postprocessing' },
    { name: 'PRODUCIBILITY', url: 'producibility' },
  ];
  activeLink = this.links[0].name;

  constructor(private translate: TranslateService, private languageService: LanguageService) {
    this.languageService.language$.subscribe((language) => {
      this.language = language;
      this.translate.use('toolbar.component.i18n');
      this.translate.get('MENU.' + this.language).subscribe((res) => {
        this.links = this.links.map((link, index) => ({ ...link, name: res[index] }));
      });
    })
  }
}
