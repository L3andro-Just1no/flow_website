import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/i18n/routing';

// Import all locale files explicitly for edge runtime compatibility
import pt from '@/messages/pt.json';
import en from '@/messages/en.json';
import fr from '@/messages/fr.json';

const messages = {
  pt,
  en,
  fr,
};

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messages[locale as keyof typeof messages],
  };
});
