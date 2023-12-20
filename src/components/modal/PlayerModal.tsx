import React, { useRef, useEffect, useState, useLayoutEffect, type MouseEvent } from 'react';
import "src/assets/styles/components/PlayerModal.scss";
interface Props {
    onClose: () => void;
}

const PlayerModal: React.FC<Props> = ({onClose}) => {
    const modalEl = useRef<HTMLDivElement>(null);
    const languageSelectedEl = useRef<HTMLDivElement>(null);
    const languageUnselectedEl = useRef<HTMLButtonElement>(null);
    const [render, setRender] = useState(false);
    const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);


    useLayoutEffect(() => {
        const clickHandler = (e: MouseEvent) => {
            if (modalEl.current === null) {
                return;
            }

            if (!modalEl.current.contains(e.target as Node)) {
                if (e.target !== languageSelectedEl.current && e.target !== languageUnselectedEl.current) {
                    console.log(e.target);
                    console.log(languageSelectedEl.current);
                    console.log(languageUnselectedEl.current);
                    onClose();
                }
            }
        }
        if (!render) {
            return;
        }

        document.addEventListener('click', clickHandler as any);

        setRender(true);
        return () => {
            document.removeEventListener('click', clickHandler as any);
        }
    })

    useEffect(() => {
        setRender(true);
    }, [render])

    return (
        <div className="player-modal" ref={modalEl}>
            <div>
                <button className="button-voir-profil">
                    Voir mon profil
                </button>
            </div>
            <div className='theme-selector'>
                <input type="checkbox" id='theme-checkbox'/>
                <label htmlFor='theme-checkbox'>
                    Dark mode
                    <div className="slider"></div>
                </label>
            </div>
            <div className='language-selector' onClick={() => setIsLanguageSelectorOpen(!isLanguageSelectorOpen)}>
                <div className="select-language">
                    {isLanguageSelectorOpen ? (
                        <>
                            <p>Choisir une langue :</p>
                            <div className='language-flags' onClick={(e) => e.stopPropagation()}>
                                <p>français</p>
                                <p>anglais</p>
                            </div>
                        </>
                    ) : (
                        <p>Langue choisie :</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PlayerModal;