import placeholder from '../assets/search__placeholder.png';

const normalizeExternalData = (data) => {
	// Normalize IGDB data
	try {
		const allowedPlatforms = ['PC', 'XBOX', 'PS5', 'PS4', 'Switch'];
		const categories = {
			1: 'Official',
			3: 'Wikipedia',
			10: 'iOS',
			12: 'Android',
			13: 'Steam',
			17: 'GOG',
		};
	
		let cover, releaseDate, rating, summary, name, id;
		let genres = [];
		let platforms = [];
		let companies = [];
		let urls = [];
	
		if (data.cover) {
			if (data.cover.url) {
				cover = data.cover.url.replace('t_thumb', 't_cover_big');
			} else {
				cover = placeholder;
			}
		} else {
			cover = placeholder;
		}
	
		if (data.genres) {
			data.genres.forEach((el) => genres.push(el.name));
		} else {
			genres.push('No data available');
		}
		data.platforms.forEach((el) => {
			if (allowedPlatforms.includes(el.abbreviation)) {
				platforms.push(el.abbreviation);
			}
		});
	
		if (data.involved_companies) {
			data.involved_companies.forEach((el) =>
				companies.push(el.company.name)
			);
		} else {
			companies.push('No data available');
		}
	
		if (data.websites) {
			data.websites.forEach((el) => {
				if (
					el.category === 1 ||
					el.category === 3 ||
					el.category === 10 ||
					el.category === 12 ||
					el.category === 13 ||
					el.category === 17
				) {
					urls.push([categories[el.category], el.url]);
				}
			});
		}
		platforms = platforms.join(', ');
		genres = genres.join(', ');
		companies = companies.join(', ');
		releaseDate = data.release_dates[0].human;
		rating = data.total_rating ? Math.floor(data.total_rating) : '-'
		summary = data.summary;
		name = data.name
		id = data.id
	
		return {
			id,
			name,
			cover,
			platforms,
			genres,
			companies,
			releaseDate,
			rating,
			summary,
			urls,
		};
	} catch (err) {
		alert(err.message)
	}

};

export default normalizeExternalData;
