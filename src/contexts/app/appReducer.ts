import browserLang from 'browser-lang';
import { I18n } from 'i18n-js';
import { I18n as I18nType } from 'i18n-js/typings';
import { TRANSLATIONS_EN } from 'src/translations/translations.en';
import { TRANSLATIONS_FR } from 'src/translations/translations.fr';
import { type Action } from 'src/types/Action';

export enum I18nActionType {
	SET_LOCALE = 'SET_LOCALE',
	SET_THEME_LIGHT = 'SET_THEME_LIGHT',
	SET_THEME_DARK = 'SET_THEME_DARK'
}

interface appState {
	i18n: I18nType,
	theme: string
}

export const initializeState = (): appState => {
  const language = browserLang({
    languages: ['fr-FR', 'fr-EN', 'en-GB', 'en-US'],
    fallback: 'fr-FR'
  });
  
  const translations = {
    'fr-FR': TRANSLATIONS_FR,
    'fr-EN': TRANSLATIONS_FR,
    'en-GB': TRANSLATIONS_EN,
    'en-US': TRANSLATIONS_EN
  }
  
  const defaultI18n = new I18n(translations);
  defaultI18n.locale = language;
  defaultI18n.defaultLocale = 'fr-FR';
  defaultI18n.enableFallback = true;

  return {
		i18n: defaultI18n,
		theme: ''
	};
}

export const appReducer = (state: appState, action: Action<I18nActionType>): appState => {
	switch (action.type) {
		case I18nActionType.SET_LOCALE:
			return {
				...state,
				i18n: {
					...state.i18n,
					locale: action.payload as string
				} as I18nType
			};

		case I18nActionType.SET_THEME_LIGHT:
			return {
				...state,
				theme: ''
			};
		
		case I18nActionType.SET_THEME_DARK:
			return {
				...state,
				theme: ' theme-dark'
			};

		default:
			return state;
	}
}