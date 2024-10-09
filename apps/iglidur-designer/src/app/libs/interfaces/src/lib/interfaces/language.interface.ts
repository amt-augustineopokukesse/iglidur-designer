export type LanguageCode = 'en-UK' | 'en-US' | 'de-DE' | 'ja-JP' | 'fr-FR';

export type Languages = {
  [K in LanguageCode]: string;
};

export interface FlagUrls {
  uk: string;
  us: string;
  fr: string;
  de: string;
  jp: string;
}
