import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import CardList from './CardList';
import Loader from '../helpers/GridLoader';
import Paginator from '../helpers/Paginator';
import useFetchExternal from '../../hooks/useFetchExternal'

const Home = () => {
	const [search, setSearch] = useState([]);
	const { data, loading, error } = useFetchExternal([]);
	console.log(error)
	
	useEffect(() => {}, [search]);
	
	const query = (data) => {
		setSearch(data);
	};

	return (
		<main>
			<SearchBar sendData={query} loading={loading} />
            { loading 
                ? <Loader loading={loading} /> 
                : <>
					<CardList data={data} />
					<Paginator data={data} />
				</> }
		</main>
	);
};

export default Home;
