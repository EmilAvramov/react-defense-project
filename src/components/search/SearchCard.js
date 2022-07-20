import { Link, useLocation } from 'react-router-dom';

import normalizeExternalData from '../../common/normalizeExternalData'

import styles from '../../styles/components/Search.module.scss';

const SearchCard = (props) => {
	// Capture and clean incoming adata
	const data = normalizeExternalData(props);
	const location = useLocation();

	return (
		<div className={styles['card']}>
			<h3>{data.name}</h3>
			<img src={data.cover} alt='' />
			<Link to={`/search/${data.id}`} state={{data, searchBackground: location}}>
				<button>Details</button>
			</Link>
		</div>
	);
};

export default SearchCard;
