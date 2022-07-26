import HomeCard from './HomeCard';

import styles from '../../styles/components/Home.module.scss';

const HomeCardList = ({ data }) => {
	const cardArray = data.map((x) => <HomeCard key={x.id} {...x} />);

	return (
		<section className={styles['home__list']}>
			{cardArray}
		</section>
	)
};

export default HomeCardList;
