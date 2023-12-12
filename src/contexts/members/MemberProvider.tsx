import React, {createContext, useContext, ReactNode, Dispatch, SetStateAction, useState} from 'react';
import { UserRoom } from "../../types/user/UserRoom";

interface GameContextProps {
    members: UserRoom[];
    setMembers: Dispatch<SetStateAction<UserRoom[]>>;
    myUser: UserRoom | undefined;
    setMyUser: Dispatch<SetStateAction<UserRoom | undefined>>;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameContextProvider');
    }
    return context;
};

interface GameContextProviderProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameContextProviderProps> = ({ children }) => {
    const [members, setMembers] = useState<UserRoom[]>([]);
    const [myUser, setMyUser] = useState<UserRoom | undefined>();

    const contextValue: GameContextProps = {
        members,
        setMembers,
        myUser,
        setMyUser,
    };

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};