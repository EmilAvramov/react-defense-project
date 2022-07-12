import styles from '../../styles/components/Home.module.scss';
import useCleanData from '../../hooks/useCleanData';
import { Link } from 'react-router-dom';

const Card = (props) => {
	const data = useCleanData(props);

	return (
		<div className={styles['card']}>
			<h3>{data.name}</h3>
			<img src={data.cover} alt='' />
			<Link to={`/search/${data.id}`} state={data}>
				<button>Details</button>
			</Link>
		</div>
	);
};

export default Card;
