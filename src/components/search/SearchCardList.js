import SearchCard from './SearchCard';

import styles from '../../styles/components/Search.module.scss';

const SearchCardList = ({ data }) => {
	const cardArray = data.map((x) => <SearchCard key={x.id} {...x} />);

	return (
		<>
			<section className={styles['search__cardList']}>
				{cardArray}
			</section>
		</>
	);
};

export default SearchCardList;
