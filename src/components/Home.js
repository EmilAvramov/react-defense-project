import { useEffect, useState } from 'react';
import Card from './Card';
import SearchBar from './SearchBar';
import Paginator from './Paginator';
import getListData from '../services/igdbApi';
import styles from '../styles/components/Home.module.scss';

const Home = () => {
	const itemsPerPage = 30;
	const [data, setData] = useState([]);
	const [pages, setPages] = useState(0);
	const [offset, setOffset] = useState(0);
	const [search, setSearch] = useState([])

	useEffect(() => {
		const endOffset = offset + itemsPerPage;	
		getListData(search).then((res) => {
			setPages(Math.ceil(res.length / itemsPerPage));
			setData(res.slice(offset, endOffset));
		});
	}, [offset, search]);

	const handlePageClick = (e) => {
		const newOffset = e.selected * itemsPerPage;
		setOffset(newOffset);
	};

	const receiveData = (data) => {
		setSearch(data)
	}

	const cardArray = data.map((x) => <Card key={x.id} {...x} />);
	return (
		<main>
			<SearchBar sendData={receiveData}/>
			<section className={styles['home__container']}>{cardArray}</section>
			<Paginator pages={pages} handlePageClick={handlePageClick} />
		</main>
	);
};

export default Home;
