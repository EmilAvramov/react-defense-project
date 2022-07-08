import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import CardList from './CardList';
import Loader from '../helpers/GridLoader';
import Paginator from '../helpers/Paginator';
import useFetchExternal from '../../hooks/useFetchExternal';

const Home = () => {
	const [search, setSearch] = useState([]);
	const { data, loading, error } = useFetchExternal(search);
	console.log(error);

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
		setSearch(data);
	};

	const handleOffset = (e) => {
		const newOffset = e.selected * itemsPerPage;
		setOffset(newOffset);
	}

	return (
		<main>
			<SearchBar sendData={query} loading={loading} />
			{loading ? (
				<Loader loading={loading} />
			) : (
				<>
					<CardList data={current} />
					<Paginator pages={pages} offset={handleOffset}/>
				</>
			)}
		</main>
	);
};

export default Home;
