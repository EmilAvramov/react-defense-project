import styles from '../styles/components/Home.module.scss';

const Card = (props) => {
	return (
		<div className={styles['card']}>
			<h3>{props.name}</h3>
			<img
				src={props.url}
				alt=''
			/>
			<button>Details</button>
		</div>
	);
};

export default Card;