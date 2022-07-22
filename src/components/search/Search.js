import { useState } from 'react';

import SearchBar from './SearchBar';
import SearchCardList from './SearchCardList';
import SearchPaginator from './SearchPaginator';

import useFetchExternal from '../../hooks/useFetchExternal';

import { searchLoader } from '../../styles/auxilary/loaderStyles'
import Loader from '../helpers/RingLoader';
import Err from '../helpers/Error';
import styles from '../../styles/components/Search.module.scss'

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
				<Err error={error} styles={styles['search__error']}/>
			) : loading ? (
				<Loader loading={loading} styles={searchLoader} size={80}/>
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
