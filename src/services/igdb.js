const corsProxy = 'https://heroku-proxy-react.herokuapp.com/';
const baseUrl = 'https://api.igdb.com/v4/';
const endPoint = 'games';

const getAll = async (query) => {
	const request = await fetch(`${corsProxy}${baseUrl}${endPoint}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Client-ID': `${process.env.REACT_APP_IGDB_ID}`,
			Authorization: `${process.env.REACT_APP_IGDB_AUTH}`,
		},
		body: query,
	});
	const response = await request.json();
	return response;
};

export default getAll;
