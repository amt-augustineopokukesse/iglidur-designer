export type SupportedLanguage = 'en-UK' | 'en-US' | 'de-DE' | 'ja-JP' | 'fr-FR';

export type Languages = {
  [K in SupportedLanguage]: string;
};

export interface FlagUrls {
  uk: string;
  us: string;
  fr: string;
  de: string;
  jp: string;
}
