const processUrls = (urls) => {
	const mappedUrls = [];
	const splitUrls = urls.split(', ');

	if (urls) {
		for (let i = 0; i < splitUrls.length; i += 2) {
			mappedUrls.push([[splitUrls[i]], splitUrls[i + 1]]);
		}
	}

	return mappedUrls;
};

export default processUrls;
