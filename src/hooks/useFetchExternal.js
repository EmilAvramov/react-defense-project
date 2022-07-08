import { useEffect, useState } from 'react';
import compileQuery from '../services/queryCompiler';
import getAll from '../services/igdb';

const useFetchExternal = (filter) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const query = compileQuery(filter);

	useEffect(() => {
		setLoading((state) => !state);
		getAll(query)
			.then((res) => {
				setData(res);
				setLoading((state) => !state);
			})
			.catch((err) => {
				setError(err);
				setLoading((state) => !state);
			});
	}, [query]);
	return { data, loading, error };
};

export default useFetchExternal;
