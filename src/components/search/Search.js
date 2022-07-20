import { useState } from 'react';

import SearchBar from './SearchBar';
import SearchCardList from './SearchCardList';
import SearchPaginator from './SearchPaginator';

import useFetchExternal from '../../hooks/useFetchExternal';

import Loader from '../helpers/GridLoader';
import Err from '../helpers/Error';

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
					<SearchCardList data={current}/>
					<SearchPaginator rawData={data} sendData={sendData} />
				</>
			)}
		</main>
	);
};

export default Search;
