import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  igusLogo = 'assets/igus-logo.svg';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en-UK');
    // this.translate.use('en-UK');
  }
}
