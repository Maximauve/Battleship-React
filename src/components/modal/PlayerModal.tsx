import React, { useRef, useEffect, useState, useLayoutEffect, useContext, type MouseEvent } from 'react';
import { AppContext } from 'src/contexts/app/AppProvider';
import { availableLanguages } from 'src/contexts/app/AppProvider';
import "src/assets/styles/components/PlayerModal.scss";
import useTranslations from 'src/hooks/useTranslation';
import { I18nActionType } from 'src/contexts/app/appReducer';
import useTheme from 'src/hooks/useTheme';
interface Props {
    onClose: () => void;
}

const PlayerModal: React.FC<Props> = ({onClose}) => {
    const modalEl = useRef<HTMLDivElement>(null);
    const languageSelectedEl = useRef<HTMLDivElement>(null);
    const languageUnselectedEl = useRef<HTMLButtonElement>(null);
    const [render, setRender] = useState(false);
    const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
    const { dispatch } = useContext(AppContext);
    const theme = useTheme();
    const i18n = useTranslations();
    const currentLanguage = availableLanguages.find((language) => language.values.includes(i18n.locale));


    useLayoutEffect(() => {
        const clickHandler = (e: MouseEvent) => {
            if (modalEl.current === null) {
                return;
            }

            if (!modalEl.current.contains(e.target as Node)) {
                if (e.target !== languageSelectedEl.current && e.target !== languageUnselectedEl.current) {
                    onClose();
                }
            }
        }
        if (!render) {
            return;
        }

        document.addEventListener('click', clickHandler as any);

        return () => {
            document.removeEventListener('click', clickHandler as any);
        }
    })

    useEffect(() => {
        setRender(true);
    }, [render])

    const handleLanguageSelector = (language: string) => {
        dispatch({type: I18nActionType.SET_LOCALE, payload: language});
        setIsLanguageSelectorOpen(false);
    }

    const handleTheme = () => {
        if (theme === '') {
            dispatch({type: I18nActionType.SET_THEME_DARK, payload: null});
        } else {
            dispatch({type: I18nActionType.SET_THEME_LIGHT, payload: null});
        }
    }

    return (
        <div className={"player-modal" + theme} ref={modalEl}>
            <div>
                <button className="button-voir-profil">
                    {i18n.t('layout.global.playerModal.seeProfile')}
                </button>
            </div>
            <div className='theme-selector'>
                <input type="checkbox" id='theme-checkbox' checked={theme !== ''} onChange={handleTheme}/>
                <label htmlFor='theme-checkbox'>
                    {i18n.t('layout.global.playerModal.darkMode')}
                    <div className="slider"></div>
                </label>
            </div>
            <div className='language-selector' onClick={() => setIsLanguageSelectorOpen(!isLanguageSelectorOpen)}>
                <div className="select-language">
                    {isLanguageSelectorOpen ? (
                        <>
                            <button>{i18n.t('layout.global.playerModal.selectLanguage')}</button>
                            <div className='language-flags' onClick={(e) => e.stopPropagation()}>
                                {availableLanguages.map((language, i) => {
                                    return (
                                        <button key={i} className='language-flag' onClick={() => handleLanguageSelector(language.values[0])}>
                                            <img src={language.img} />
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                            <button>{i18n.t('layout.global.playerModal.languageSelected')}</button>
                            <img src={currentLanguage?.img} onClick={(e) => e.stopPropagation()} />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PlayerModal;