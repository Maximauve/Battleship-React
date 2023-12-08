import React, { type Dispatch, type PropsWithChildren, createContext, useReducer } from 'react';
import { type Action } from 'src/types/Action';
import { initialUserState, type UserActionType, UserReducer, type UserState } from 'src/contexts/user/userReducer';

export const UserContext = createContext<[UserState, Dispatch<Action<UserActionType>>]>([
	initialUserState,
	() => null
]);

const initializeState = (): UserState => {
	const user = localStorage.getItem('user');
	if (user != null) {
		return {
			user: JSON.parse(user),
			loading: false
		};
	}
	return initialUserState;
};

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const oldState = initializeState();
	const [state, dispatch] = useReducer(UserReducer, oldState);

	return (
		<UserContext.Provider value={[state, dispatch]}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
