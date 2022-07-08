import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import CardList from './CardList';
import Loader from '../helpers/GridLoader';
import Paginator from '../helpers/Paginator';
import useFetchExternal from '../../hooks/useFetchExternal';

const Home = () => {
	// Handle incoming search requests
	const [search, setSearch] = useState([]);
	const { data, loading, error } = useFetchExternal(search);

	// Handle passing pages and paginated data to children
	const itemsPerPage = 30;
	const [pages, setPages] = useState(0);
	const [current, setCurrent] = useState(data || [])
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		const endOffset = offset + itemsPerPage;
		setPages(Math.ceil(data.length / itemsPerPage));
		setCurrent(data.slice(offset, endOffset));
	}, [data, offset])
	
	const query = (data) => {
		setOffset(0)
		setSearch(data);
	};

	const handleOffset = (e) => {
		const newOffset = e.selected * itemsPerPage;
		setOffset(newOffset);
	}

	return (
		<main>
			<SearchBar sendData={query} loading={loading} />
			{error 
			? <p>{error}</p>
			: loading 
				? (
					<Loader loading={loading} />
				) : (
					<>
						<CardList data={current} />
						<Paginator pages={pages} offset={handleOffset}/>
					</>
				)
			}
		</main>
	);
};

export default Home;
