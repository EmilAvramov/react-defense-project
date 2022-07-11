import { useState } from 'react';

import SearchBar from './SearchBar';
import CardList from './CardList';
import Loader from '../helpers/GridLoader';
import Paginator from '../helpers/Paginator';

import useFetchExternal from '../../hooks/useFetchExternal';

const Home = () => {
	// Handle incoming search requests
	const [search, setSearch] = useState([]);
	const { data, loading, error } = useFetchExternal(search);

	// Handle passing incoming paginated data
	const [current, setCurrent] = useState(data || []);

	const query = (data) => {
		setSearch(data);
	};

	const sendData = (incoming) => {
		setCurrent(incoming)
	}

	return (
		<main>
			<SearchBar sendData={query} loading={loading} />
			{error ? (
				<p>{error}</p>
			) : loading ? (
				<Loader loading={loading} />
			) : (
				<>
					<CardList data={current}/>
					<Paginator rawData={data} sendData={sendData} />
				</>
			)}
		</main>
	);
};

export default Home;
