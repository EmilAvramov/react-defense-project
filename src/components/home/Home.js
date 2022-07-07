import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import CardList from './CardList';
import Loader from '../helpers/GridLoader';
import Paginator from './Paginator';
import useFetchExternal from '../../hooks/UseFetchExternal';

const Home = () => {
	const [search, setSearch] = useState([]);
	const { data, loading, error } = useFetchExternal(search);

	useEffect(() => {}, [search]);

	const query = (data) => {
		setSearch(data);
	};

	return (
		<main>
			<SearchBar sendData={query} loading={loading} />
            {error 
            ? <p>{error}</p> 
            : loading 
                ? <Loader loading={loading} /> 
                : <CardList data={data} />}
			<Paginator data={data} />
		</main>
	);
};

export default Home;
