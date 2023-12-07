import React, { type Dispatch, type PropsWithChildren, useReducer } from 'react';
import { io } from 'socket.io-client';
import { type User } from 'src/types/user/User';
import { initialSocketState, type SocketActionType, SocketReducer, type SocketState } from 'src/contexts/socket/socketReducer';
import { type Action } from 'src/types/Action';

export const SocketContext = React.createContext<[SocketState, Dispatch<Action<SocketActionType>>]>([
	initialSocketState,
	() => null
]);

const initializeState = ({user, slug}: Props): SocketState => {
	if (user !== undefined && slug !== undefined) {
		console.log('[SocketProvider] User is defined : ', user);
		const state: SocketState = {
			socket: io(import.meta.env.VITE_REACT_APP_WS_URL as string, { query: { token: user.access_token, slug: slug } }),
			loading: false
		};
		console.log('[SocketProvider] initializeState : ', state);
		return state;
	}
	return initialSocketState;
};

interface Props {
	user: User;
	slug: string;
}

const SocketProvider: React.FC<PropsWithChildren<Props>> = ({ children, slug, user }) => {
	const oldState = initializeState({ user, slug });
	const [state, dispatch] = useReducer(SocketReducer, oldState);

	return (
		<SocketContext.Provider value={[state, dispatch]}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
