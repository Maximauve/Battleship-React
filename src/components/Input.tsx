import React from "react";
import 'src/assets/styles/components/Input.scss';

interface InputProps {
    text: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type?: string;
}

const Input: React.FC<InputProps> = ({ text, onChange, value, type }) => {
    return (
        <div className="container">
            <div className="field">
                
                <input type={type} value={value} onChange={onChange} required autoComplete="off" />
                <label title={text} data-title={text}></label>
            </div>
            
        </div>
    );
}

export default Input;