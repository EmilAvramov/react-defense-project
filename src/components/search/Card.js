import styles from '../../styles/components/Search.module.scss';
import useCleanData from '../../hooks/useCleanData';
import { Link, useLocation } from 'react-router-dom';

const Card = (props) => {
	const data = useCleanData(props);
	const location = useLocation();

	return (
		<div className={styles['card']}>
			<h3>{data.name}</h3>
			<img src={data.cover} alt='' />
			<Link to={`/search/${data.id}`} state={{data, background: location}}>
				<button>Details</button>
			</Link>
		</div>
	);
};

export default Card;
