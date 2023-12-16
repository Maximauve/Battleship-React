import React from "react";
import 'src/assets/styles/components/Button.scss';

interface ButtonProps {
    text: string;
    onClick: () => void;
    state?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, state }) => {
    return (
        <div className={"button-container "+state}>
            <button onClick={onClick}>{text}</button>
        </div>
    );
};

export default Button;