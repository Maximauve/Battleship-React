import React from "react";
import 'src/assets/styles/components/Button.scss';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    state?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled, state }) => {
    return (
        <div className={"button-container "+state}>
            <button onClick={onClick} disabled={disabled ? disabled : false}>{text}</button>
        </div>
    );
};

export default Button;