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

	useEffect(() => {
		const endOffset = offset + itemsPerPage;
		getListData().then((res) => {
			setPages(Math.ceil(res.length / itemsPerPage));
			setData(res.slice(offset, endOffset));
		});
	}, [offset]);

	const handlePageClick = (e) => {
		const newOffset = e.selected * itemsPerPage;
		setOffset(newOffset);
	};

	const cardArray = data.map((x) => <Card key={x.id} {...x} />);
	return (
		<main>
			<SearchBar />
			<section className={styles['home__container']}>{cardArray}</section>
			<Paginator pages={pages} handlePageClick={handlePageClick} />
		</main>
	);
};

export default Home;
