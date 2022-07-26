const aggregateData = (data) => {
	const filtered = [];
	const counts = {};

	data.forEach((el) => {
		if (!filtered.some((e) => e.name === el.name)) {
			filtered.push({ name: el.name, cover: el.cover });
			counts[el.name] = 1;
		} else {
			counts[el.name] += 1;
		}
	});

	filtered.sort((a, b) => counts[b.name] - counts[a.name]);

	return filtered;
};

export default aggregateData;
