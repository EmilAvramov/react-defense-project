import { useEffect, useState } from 'react';

import SearchBar from './SearchBar';
import CardList from './CardList';
import Loader from '../helpers/GridLoader';
import Paginator from '../helpers/Paginator';
import Details from '../helpers/Details';

import useFetchExternal from '../../hooks/useFetchExternal';

const Home = () => {
	// Handle incoming search requests
	const [search, setSearch] = useState([]);
	const { data, loading, error } = useFetchExternal(search);

	// Handle passing pages and paginated data to children
	const itemsPerPage = 30;
	const [pages, setPages] = useState(0);
	const [current, setCurrent] = useState(data || []);
	const [offset, setOffset] = useState(0);

	//Handle toggling visibility of details modal
	const [details, setDetails] = useState(false);
	const [single, setSingle] = useState(null);

	useEffect(() => {
		const endOffset = offset + itemsPerPage;
		setPages(Math.ceil(data.length / itemsPerPage));
		setCurrent(data.slice(offset, endOffset));
	}, [data, offset]);

	const query = (data) => {
		setOffset(0);
		setSearch(data);
	};

	const handleOffset = (e) => {
		const newOffset = e.selected * itemsPerPage;
		setOffset(newOffset);
	};

	const showDetails = () => {
		setDetails((state) => !state);
	};

	const sendClicked = (id) => {
		let item = {};
		current.forEach((el) => {
			if (el.id === id) {
				item = el;
			}
		});
		console.log(item)
		setSingle(item)
		console.log(single)
	}

	return (
		<main>
			<SearchBar sendData={query} loading={loading} />
			{details ? (
				<Details details={showDetails} data={single} />
			) : error ? (
				<p>{error}</p>
			) : loading ? (
				<Loader loading={loading} />
			) : (
				<>
					<CardList data={current} details={showDetails} send={sendClicked}/>
					<Paginator pages={pages} offset={handleOffset} />
				</>
			)}
		</main>
	);
};

export default Home;
