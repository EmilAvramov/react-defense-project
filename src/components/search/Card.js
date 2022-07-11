import styles from '../../styles/components/Home.module.scss';
import useCleanData from '../../hooks/useCleanData';

const Card = (props) => {
	const {id, name, cover} = useCleanData(props)

	return (
		<div className={styles['card']}>
			<h3>{name}</h3>
			<img src={cover} alt='' />
			<button
				onClick={() => {
					props.details();
					props.send(id)
				}}
			>
				Details
			</button>
		</div>
	);
};

export default Card;
