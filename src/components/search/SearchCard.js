import { Link, useLocation } from 'react-router-dom';

import normalizeExternalData from '../../functions/normalizeExternalData';

import styles from '../../styles/components/Search.module.scss';

const SearchCard = (props) => {
	// Capture and clean incoming adata
	const data = normalizeExternalData(props);
	const location = useLocation();

	return (
		<div className={styles['card']}>
			<h3>{data.name}</h3>
			<Link
				className={styles['card__img_wrapper']}
				to={`/search/${data.id}`}
				state={{ data, searchBackground: location }}
			>
				<img src={data.cover} alt='' />
			</Link>
			<Link
				to={`/search/${data.id}`}
				state={{ data, searchBackground: location }}
			>
				<button>Details</button>
			</Link>
		</div>
	);
};

export default SearchCard;
