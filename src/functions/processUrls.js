const processUrls = (urls) => {
	const mappedUrls = [];

	try {
		const splitUrls = urls.split(', ');

		if (urls) {
			for (let i = 0; i < splitUrls.length; i += 2) {
				mappedUrls.push([[splitUrls[i]], splitUrls[i + 1]]);
			}
		}
	} catch (err) {
		alert(err.message);
	}

	return mappedUrls;
};

export default processUrls;
