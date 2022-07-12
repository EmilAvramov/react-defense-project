import Card from './Card';
import styles from '../../styles/components/Home.module.scss';
import { useLocation } from 'react-router-dom';

const CardList = ({ data }) => {
	const item = useLocation();
	console.log(item);

	const cardArray = data.map((x) => <Card key={x.id} {...x} />);
	return (
		<section className={styles['home__container']}>
			{cardArray}
		</section>
	)
};

export default CardList;
