import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase-config';

const AuthContext = React.createContext();

// Setup context consumer
export const useAuth = () => {
	return useContext(AuthContext);
};

// Setup context provider
export const AuthProvider = ({children}) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	// Set user on auth change
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {!loading && children}
        </AuthContext.Provider>
    )
};
