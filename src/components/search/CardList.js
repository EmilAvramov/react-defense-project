import Card from './Card';
import styles from '../../styles/components/Home.module.scss';

const CardList = ({ data }) => {
	const cardArray = data.map((x) => <Card key={x.id} {...x} />);

	return (
		<section className={styles['home__container']}>
			{cardArray}
		</section>
	)
};

export default CardList;
