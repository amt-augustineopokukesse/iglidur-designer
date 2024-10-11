import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '@iglidur-designer/services';
import { flagUrls } from '@iglidur-designer/utils';
import { SupportedLanguage } from '@iglidur-designer/interfaces';

@Component({
  selector: 'lib-languages',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagesComponent {
  constructor(private languageService: LanguageService) {}
  public emitClose = output<boolean>();
  public flagUrls = flagUrls;

  onClose() {
    this.emitClose.emit(true);
  }

  onSelectLanguage(language: SupportedLanguage) {
    this.languageService.setLanguage(language);
    this.emitClose.emit(false);
  }
}
