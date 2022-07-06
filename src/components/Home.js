import { useEffect, useState } from 'react';
import Card from './Card';
import SearchBar from './SearchBar'
import getListData from '../services/igdbApi';
import styles from '../styles/components/Home.module.scss';

const Home = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		getListData().then((data) => setData(data));
	}, []);
	const cardArray = data.map((x) => <Card key={x.id} {...x} />);
	return (
		<main>
			<SearchBar/>
			<section className={styles['home__container']}>
				{cardArray}
			</section>
		</main>
	);
};

export default Home;
