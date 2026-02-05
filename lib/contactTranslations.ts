import contactData from '@/messages/contact.json';

export function getContactTranslations(locale: string) {
  return contactData[locale as 'en' | 'de'] || contactData.en;
}
