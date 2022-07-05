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
	    body: "fields id, name, artworks.*, platforms.*; where artworks != null & platforms != null; limit 20;"
	}).then(res => res.json())

	return request;
};

export default getListData;
