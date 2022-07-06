import styles from '../styles/components/Home.module.scss';

const Card = (props) => {
    const imgCover = (props.cover.url).replace('t_thumb', 't_cover_big')
	return (
		<div className={styles['card']}>
			<h3>{props.name}</h3>
			<img
				src={imgCover}
				alt=''
			/>
			<button>Details</button>
		</div>
	);
};

export default Card;