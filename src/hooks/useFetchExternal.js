import { useEffect, useState } from 'react';
import compileQuery from '../services/queryCompiler';

const corsProxy = 'https://heroku-proxy-react.herokuapp.com/';
const baseUrl = 'https://api.igdb.com/v4/';
let endPoint = 'games';

const parseOptions = (params) => {
	const query = compileQuery(params);
	const options = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Client-ID': process.env.REACT_APP_IGDB_ID,
			Authorization: process.env.REACT_APP_IGDB_AUTH,
		},
		body: query,
	}

	return options;
};

const useFetchExternal = (filter) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const options = parseOptions(filter)

	useEffect(() => {
		setLoading((state) => !state);
		const getData = async () => {
			try {
				const request = await fetch(
					`${corsProxy}${baseUrl}${endPoint}`,
					{ ...options }
				);
				const response = await request.json();
				setData(response);
			} catch (err) {
				setError(err);
			}
		}	;
		getData();
		setLoading((state) => !state);
	}, [loading, options]);

	return { data, loading, error };
};

export default useFetchExternal;