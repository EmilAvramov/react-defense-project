import styles from '../../styles/components/Home.module.scss';
import placeholder from '../../assets/no-image.png';

const Card = (props) => {
	let imgCover;
	if (props.cover) {
		imgCover = props.cover.url.replace('t_thumb', 't_cover_big');
	} else {
		imgCover = placeholder;
	}
	return (
		<div className={styles['card']}>
			<h3>{props.name}</h3>
			<img src={imgCover} alt='' />
			<button
				onClick={() => {
					props.details();
					props.send(props.id)
				}}
			>
				Details
			</button>
		</div>
	);
};

export default Card;
