import { useState } from 'react';

// Hook used to test error handling
const useThrowError = () => {
	const [error] = useState(Error('I broke it'));

	return { error };
};

export default useThrowError;
