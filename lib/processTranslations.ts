import processData from '@/messages/process.json';

export function getProcessTranslations(locale: string) {
  return processData[locale as 'en' | 'de'] || processData.en;
}
