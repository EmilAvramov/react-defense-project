import { useEffect, useState } from 'react';
import compileQuery from '../services/queryCompiler';

const corsProxy = 'https://heroku-proxy-react.herokuapp.com/';
const baseUrl = 'https://api.igdb.com/v4/';
const endPoint = 'games';

const useFetchExternal = (filter) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const query = compileQuery(filter);
	console.log(query)

	useEffect(() => {
		setLoading(true);
		async function getData() {
			try {
				const request = await fetch(`${corsProxy}${baseUrl}${endPoint}`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Client-ID': process.env.REACT_APP_IGDB_ID,
						Authorization: process.env.REACT_APP_IGDB_AUTH,
					},
					body: query,
				});
				const response = await request.json()
				setData(response)
				setLoading(false);
			} catch (err) {
				setError(err)
				setLoading(false);
			}
		}
		getData();
	}, [query]);

	return { data, loading, error };
};

export default useFetchExternal;
