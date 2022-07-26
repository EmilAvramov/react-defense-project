import styles from '../../styles/components/Home.module.scss';

const HomeCard = ({ name, cover }) => {
	return (
		<div className={styles['home__card']}>
			<h3>{name}</h3>
			<img src={cover} alt='' />
		</div>
	);
};

export default HomeCard;
