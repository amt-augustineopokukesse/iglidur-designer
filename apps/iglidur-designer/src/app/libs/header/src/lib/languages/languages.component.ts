import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { findFlagUrlByCountryName } from 'country-flags-svg';

@Component({
  selector: 'lib-languages',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss',
})
export class LanguagesComponent {
  flagUrls = {
    uk: findFlagUrlByCountryName('United Kingdom'),
    us: findFlagUrlByCountryName('United States'),
    fr: findFlagUrlByCountryName('France'),
    de: findFlagUrlByCountryName('Germany'),
    jp: findFlagUrlByCountryName('Japan')
  };
}
