import { useEffect, useState } from 'react';

import compileQuery from '../common/queryCompiler';

const corsProxy = 'https://heroku-proxy-react.herokuapp.com/';
const baseUrl = 'https://api.igdb.com/v4/';
const endPoint = 'games';

const useFetchExternal = (filter) => {
	// Setup state and send filter string to query for processing
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const query = compileQuery(filter);

	//Run request to IGDB when query changes
	useEffect(() => {
		setLoading((state) => !state);
		fetch(`${corsProxy}${baseUrl}${endPoint}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Client-ID': `${process.env.REACT_APP_CLIENT}`,
				Authorization: `${process.env.REACT_APP_AUTH}`,
			},
			body: query,
		})
			.then((res) => res.json())
			.then((resData) => {
				setData(resData);
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
