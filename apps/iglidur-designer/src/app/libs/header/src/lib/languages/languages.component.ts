import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { findFlagUrlByCountryName } from 'country-flags-svg';
import { LanguageService } from '@iglidur-designer/services';

@Component({
  selector: 'lib-languages',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss',
})
export class LanguagesComponent {
  constructor(private languageService: LanguageService) {}
  @Output() emitClose = new EventEmitter<boolean>();
  flagUrls = {
    uk: findFlagUrlByCountryName('United Kingdom'),
    us: findFlagUrlByCountryName('United States'),
    fr: findFlagUrlByCountryName('France'),
    de: findFlagUrlByCountryName('Germany'),
    jp: findFlagUrlByCountryName('Japan')
  };

  onClose() {
    this.emitClose.emit(true);
  }

  onSelectLanguage(language: string) {
    this.languageService.setLanguage(language);
    this.emitClose.emit(false);
  }
}
