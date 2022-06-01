import i18n from 'i18next';
import { initReactI18next } from "react-i18next";

// import all namespaces (for the default language, only)
import ns1 from './translations/pt.json';
import ns2 from './translations/en.json';

export const defaultNS = 'ns1'
export const resources = {
  en: { ns1,ns2,},
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['ns1', 'ns2'],
  defaultNS,
  resources,
});

export default i18n;