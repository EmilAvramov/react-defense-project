import { useState } from 'react';

import SearchBar from './SearchBar';
import SearchCardList from './SearchCardList';
import SearchPaginator from './SearchPaginator';

import useFetchExternal from '../../hooks/useFetchExternal';

import { searchLoader } from '../../styles/auxilary/loaderStyles';
import Loader from '../helpers/RingLoader';
import Err from '../helpers/Error';
import styles from '../../styles/components/Search.module.scss';

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
		<main className={styles['search__master_wrapper']}>
			<SearchBar sendData={query} loading={loading} />
			{loading ? (
				<Loader loading={loading} styles={searchLoader} size={80} />
			) : error ? (
				<Err error={error} styles={styles['search__error']} />
			) : (
				<>
					{data.length > 0 && <SearchCardList data={current} />}
					{data.length > 0 && (
						<SearchPaginator rawData={data} sendData={sendData} />
					)}
				</>
			)}
			{data.length === 0 && !loading && (
				<p className={styles['search__empty']}>
					No results found matching your query.
				</p>
			)}
		</main>
	);
};

export default Search;
