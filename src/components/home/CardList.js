import { useState } from 'react';

import Card from './Card';
import styles from '../../styles/components/Home.module.scss';
import Details from '../helpers/Details';

const CardList = ({ data }) => {
	const [single, setSingle] = useState(null);
	const [details, setDetails] = useState(false);

	const toggleDetails = () => {
		setDetails((state) => !state);
	};

	const sendClicked = (id) => {
		let item = {};
		data.forEach((el) => {
			if (el.id === id) {
				item = el;
			}
		});
		setSingle(item);
	};

	const cardArray = data.map((x) => (
		<Card key={x.id} {...x} details={toggleDetails} send={sendClicked} />
	));
	return (
		<>
			{details ? (
				<Details single={single} details={toggleDetails} />
			) : (
				<section className={styles['home__container']}>
					{cardArray}
				</section>
			)}
		</>
	);
};

export default CardList;
