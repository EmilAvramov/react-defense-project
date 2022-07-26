import styles from '../../styles/components/Home.module.scss';

const HomeCard = ({ cover }) => {
	return (
		<div className={styles['home__card']}>
			<img src={cover} alt='' />
		</div>
	);
};

export default HomeCard;
