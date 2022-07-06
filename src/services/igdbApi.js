const corsProxy = 'https://heroku-proxy-react.herokuapp.com/'
const baseUrl = 'https://api.igdb.com/v4/';

const getListData = () => {
	const request = fetch(`${corsProxy}${baseUrl}games`, {
	    method: 'POST',
	    headers: {
	        'Accept': 'application/json',
	        'Client-ID': process.env.REACT_APP_IGDB_ID,
	        'Authorization': process.env.REACT_APP_IGDB_AUTH
	    },
	    body: `fields id, name, cover.url, platforms.abbreviation, release_dates.*; search "dragon"; where cover != null & platforms.abbreviation = "PC"; limit 500;`
	}).then(res => res.json())

	return request;
};

export default getListData;
