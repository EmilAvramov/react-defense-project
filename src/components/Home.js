import styles from '../styles/components/Home.module.scss';
import { useEffect, useState } from 'react';
import getListData from '../services/igdbApi';

const Home = () => {
	const [data, setData] = useState([])
	useEffect(() => {
		getListData().then(data => setData(data))
	}, [])
	console.log(data)
	return (
		<main className={styles['home__container']}>
			<div className={styles['card']}>
				<h3>Dragon Age: Origins - Awakening</h3>
				<img
					src='//images.igdb.com/igdb/image/upload/t_thumb/ari8i.jpg'
					alt=''
				/>
				<button>Details</button>
			</div>
		</main>
	);
};

export default Home;
