import { useEffect, useState } from 'react';

import ReactPaginate from 'react-paginate';
import styles from '../../styles/components/Home.module.scss';

const Paginator = ({ rawData, sendData }) => {
	// Manage incoming and current page data
	const [data, setData] = useState(rawData);
	const [current, setCurrent] = useState([]);

	const paginate = (data) => sendData(data);

	// Paginate and manage offset
    const itemsPerPage = 30;
	const [pages, setPages] = useState(Math.ceil(data.length / itemsPerPage));
	const [offset, setOffset] = useState(0);

	const handleOffset = (e) => {
		const newOffset = e.selected * itemsPerPage;
		setOffset(newOffset);
	};

    // Run recurring events for pagination on change

	useEffect(() => {
		setData(rawData);
		setPages(Math.ceil(data.length / itemsPerPage));
		const endOffset = offset + itemsPerPage;
		setCurrent(data.slice(offset, endOffset));
	}, [data, rawData, offset]);

	useEffect(() => {
		paginate(current);
	});

	return (
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
				onPageChange={handleOffset}
				containerClassName='pagination'
				activeClassName='active'
			/>
		</div>
	);
};

export default Paginator;
