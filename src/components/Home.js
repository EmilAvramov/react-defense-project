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
		getListData(itemsPerPage, offset).then((data) => setData(data));
		const endOffset = offset + itemsPerPage;
		console.log(`Loading items from ${offset} to ${endOffset}`);
		setData(data.slice(offset, endOffset));
		setPages(Math.ceil(data.length / itemsPerPage));
	}, [offset]);

	const handlePageClick = (e) => {
		const newOffset = (e.selected * itemsPerPage) ;
		console.log(
			`User requested page number ${e.selected}, which is offset ${newOffset}`
		);
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
					pageCount={5}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					onPageChange={handlePageClick}
					containerClassName='pagination'
					activeClassName='active'
					forcePage={offset}
				/>
			</div>
		</main>
	);
};

export default Home;
