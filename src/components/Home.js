import { useEffect, useState } from 'react';
import Card from './Card';
import SearchBar from './SearchBar';
import getListData from '../services/igdbApi';
import styles from '../styles/components/Home.module.scss';
import ReactPaginate from 'react-paginate';

const Home = () => {
	const itemsPerPage = 30;
	const [data, setData] = useState([]);
	const [pages, setPages] = useState(0);
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		const endOffset = offset + itemsPerPage;
		getListData().then((res) => {
			setPages(Math.ceil(res.length / itemsPerPage));
			setData(res.slice(offset, endOffset));
		});
	}, [offset]);

	const handlePageClick = (e) => {
		const newOffset = e.selected * itemsPerPage;
		setOffset(newOffset);
	};

	const cardArray = data.map((x) => <Card key={x.id} {...x} />);
	return (
		<main>
			<SearchBar />
			<section className={styles['home__container']}>{cardArray}</section>
			<div className={styles['home__container']}>
				<ReactPaginate
					previousLabel='Previous'
					nextLabel='Next'
					pageClassName='page-item'
					pageLinkClassName='page-link'
					previousClassName='page-item'
					previousLinkClassName='page-link'
					nextClassName='page-item'
					nextLinkClassName='page-link'
					breakLabel='...'
					breakClassName='page-item'
					breakLinkClassName='page-link'
					pageCount={pages}
					marginPagesDisplayed={2}
					pageRangeDisplayed={2}
					onPageChange={handlePageClick}
					containerClassName='pagination'
					activeClassName='active'
				/>
			</div>
		</main>
	);
};

export default Home;
