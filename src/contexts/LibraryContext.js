import React, { useContext, useState } from 'react';

const LibraryContext = React.createContext();

export const useLibrary = () => {
	return useContext(LibraryContext);
};

export const LibraryProvider = ({ children }) => {
	const [changed, setChanged] = useState(false);

	return (
		<LibraryContext.Provider value={{ changed, setChanged }}>
			{children}
		</LibraryContext.Provider>
	);
};
