import { findFlagUrlByCountryName } from 'country-flags-svg';

export const flagUrls = {
  uk: findFlagUrlByCountryName('United Kingdom'),
  us: findFlagUrlByCountryName('United States'),
  fr: findFlagUrlByCountryName('France'),
  de: findFlagUrlByCountryName('Germany'),
  jp: findFlagUrlByCountryName('Japan'),
};
