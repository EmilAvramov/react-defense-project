import { useState } from 'react';

import SearchBar from './SearchBar';
import CardList from './CardList';
import Loader from '../helpers/GridLoader';
import Paginator from '../helpers/Paginator';
import Err from '../helpers/Error';

import useFetchExternal from '../../hooks/useFetchExternal';

const Search = () => {
	// Handle incoming search requests
	const [search, setSearch] = useState([]);
	const { data, loading, error } = useFetchExternal(search);

	const query = (data) => {
		setSearch(data);
	};

	// Handle passing incoming paginated data
	const [current, setCurrent] = useState(data || []);

	const sendData = (incoming) => {
		setCurrent(incoming);
	};

	return (
		<main>
			<SearchBar sendData={query} loading={loading} />
			{error ? (
				<Err error={error} />
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

export default Search;
