import { useState } from 'react';

const useThrowError = () => {
	const [error] = useState(Error('I broke it'));

	return { error };
};

export default useThrowError;
