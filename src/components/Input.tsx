import React from "react";
import 'src/assets/styles/components/Input.scss';

interface InputProps {
    text: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type?: string;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({ text, onChange, value, type, placeholder }) => {
    const ref = React.useRef<HTMLInputElement>(null);
    
    const setInputActive = () => {
        ref.current?.focus();
    }
    return (
        <div className="container">
            <div className="field">
                
                <input type={type} value={value} onChange={onChange} {...{ placeholder }} required autoComplete="off" ref={ref} />
                <label title={text} data-title={text} onClick={setInputActive}></label>
            </div>
            
        </div>
    );
}

export default Input;