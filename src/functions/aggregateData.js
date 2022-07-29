const aggregateData = (data) => {
	const filtered = [];
	const counts = {};

	try {
		data.forEach((el) => {
			if (!filtered.some((e) => e.name === el.name)) {
				filtered.push({ name: el.name, cover: el.cover });
				counts[el.name] = 1;
			} else {
				counts[el.name] += 1;
			}
		});

		filtered.sort((a, b) => counts[b.name] - counts[a.name]);
	} catch (err) {
		alert(err.message);
	}

	return filtered;
};

export default aggregateData;
