import Card from './Card';
import styles from '../../styles/components/Home.module.scss';

const CardList = ({data, details, send}) => {
	const cardArray = data.map((x) => <Card key={x.id} {...x} details={details} send={send}/>);
	return (
		<section className={styles['home__container']}>
			{cardArray}
		</section>
	);
};

export default CardList;