const compileQuery = (data) => {
	try {
		const setSearch = (val) => `search "${val}";`;
		const setPlatformFilter = (val) =>`platforms.abbreviation = "${val}"`;
		const setCompanyFilter = (val) =>`involved_companies.company.name ~ *"${val}"*;`;
		const checkPlatforms = () => {
			if (data.PC || data.PS4 || data.PS5 || data.XBOX || data.Switch) {
				return true
			}
			return false
		}
	
		const compilePlatforms = () => {
			let platforms = 'where '
			let tempArr = []

			if (data.PC) {
				tempArr.push(setPlatformFilter('PC'))
			}
			if (data.PS4) {
				tempArr.push(setPlatformFilter('PS4'))
			}
			if (data.PS5) {
				tempArr.push(setPlatformFilter('PS5'))
			}
			if (data.XBOX) {
				tempArr.push(setPlatformFilter('XBOX'))
			}
			if (data.Switch) {
				tempArr.push(setPlatformFilter('Switch'))
			}
			if (tempArr.length > 1) {
				platforms += tempArr.join(' | ')
				return platforms
			} else if (tempArr.length === 1) {
				platforms += tempArr[0]
				return platforms
			} 
		}
	
		const platformFilter = [
			'platforms.abbreviation = "PC"', 
			'platforms.abbreviation = "XBOX"', 
			'platforms.abbreviation = "PS4"',
			'platforms.abbreviation = "PS5"',
			'platforms.abbreviation = "Switch"'
		]
	
		let fields ='fields id, name, cover.url, genres.name, platforms.abbreviation, involved_companies.company.name, total_rating_count, total_rating, release_dates.human, summary, websites.*;';
		let limit = 'limit 150;';
		let filter = `where ${platformFilter.join(" | ")};`;
		let search;
	
		let query = `${fields} where ${platformFilter.join(" | ")}; ${limit}`;
	
		if (data.length === 0) {
			return query;
		} else {
			if (!data.category || data.category === 'name') {
				if (checkPlatforms()) {
					filter = `${compilePlatforms()};`
				}
				if (data.string) {
					search = setSearch(data.string);
					query = `${search} ${fields} ${filter} ${limit}`;
				} else {
					query = `${fields} ${filter} ${limit}`;
				}
			} else {
				if (!data.string) {
					if (checkPlatforms()) {
						filter = `${compilePlatforms()};`
					}
				} else {
					if (!checkPlatforms()) {
						filter = `where (${platformFilter.join(" | ")}) & ${setCompanyFilter(data.string)}`
					} else {
						filter = `${compilePlatforms()} & ${setCompanyFilter(data.string)}`;
					}
				}
				query = `${fields} ${filter} ${limit}`;
			}
		}
		return query;
	} catch (err) { 
		alert(err.message)
	}

};

export default compileQuery;
