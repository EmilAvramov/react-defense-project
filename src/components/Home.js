import styles from '../styles/components/Home.module.scss';
import { useEffect, useState } from 'react';
import getListData from '../services/igdbApi';
import Card from './Card';

const Home = () => {
	const [data, setData] = useState([])
	useEffect(() => {
		getListData().then(data => setData(data))
	}, [])
	const cardArray = data.map(x => <Card key={x.id} name={x.name} url={x.artworks.url}/>)
	return (
		<main className={styles['home__container']}>
			{cardArray}
		</main>
	);
};

export default Home;
