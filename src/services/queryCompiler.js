const compileQuery = (data) => {
	const setSearch = (val) => `search "${val}";`;
	const setPlatformFilter = (val) =>
		`where cover != null & platforms.abbreviation = "${val}";`;
	const setCompanyFilter = (val) =>
		`where cover != null & involved_companies.company.name ~ *"${val}"*;`;

	let query =
		'fields id, name, cover.url; where cover != null & platforms.abbreviation = "PC"; limit 500;';
	let fields = 'fields id, name, cover.url;';
	let limit = 'limit 500;';
	let filter = `where cover != null & platforms.abbreviation = "PC";`;
	let search;

	if (data.length === 0) {
		return query;
	} else {
		if (!data.category || data.category === 'name') {
			if (data.string) {
				search = setSearch(data.string);
				if (data.platform) {
					filter = setPlatformFilter(data.platform);
				} else {
					filter = `where cover != null & platforms.abbreviation = "PC";`;
				}
				query = `${search} ${fields} ${filter} ${limit}`;
			} else {
				if (data.platform) {
					filter = setPlatformFilter(data.platform);
				}
				query = `${fields} ${filter} ${limit}`;
			}
		} else {
			if (!data.string) {
				if (data.platform) {
					filter = setPlatformFilter(data.platform);
				}
			} else {
				if (!data.platform) {
					filter = setCompanyFilter(data.string);
				} else {
					filter = `where cover != null & platforms.abbreviation = "${data.platform}" & involved_companies.company.name ~ *"${data.string}"*;`;
				}
			}
			query = `${fields} ${filter} ${limit}`;
		}
	}
	return query;
};

export default compileQuery;