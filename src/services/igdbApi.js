const corsProxy = 'https://heroku-proxy-react.herokuapp.com/'
const baseUrl = 'https://api.igdb.com/v4/';

const getListData = (page, offset) => {
	const request = fetch(`${corsProxy}${baseUrl}games`, {
	    method: 'POST',
	    headers: {
	        'Accept': 'application/json',
	        'Client-ID': process.env.REACT_APP_IGDB_ID,
	        'Authorization': process.env.REACT_APP_IGDB_AUTH
	    },
	    body: `fields id, name, cover.url, platforms.abbreviation, release_dates.*; where cover != null & platforms.abbreviation = "PC"; sort release_dates.date desc; limit ${page}; offset ${offset};`
	}).then(res => res.json())

	return request;
};

export default getListData;
