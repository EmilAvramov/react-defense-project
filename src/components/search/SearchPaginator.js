import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import styles from '../../styles/components/Search.module.scss';

const SearchPaginator = ({ rawData, sendData }) => {
	// Manage incoming and current page data
	const [data, setData] = useState(rawData);
	const [current, setCurrent] = useState([]);

	const paginate = (data) => sendData(data);

	// Paginate and manage offset
    const itemsPerPage = 24;
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
		<div className={styles['pagination__container']}>
			<ReactPaginate
				previousLabel='Previous'
				nextLabel='Next'
				pageClassName={styles['pagination__li']}
				pageLinkClassName={styles['pagination__a']}
				previousClassName={styles['pagination__previous_li']}
				previousLinkClassName={styles['pagination__previous_a']}
				nextClassName={styles['pagination__next_li']}
				nextLinkClassName={styles['pagination__next_a']}
				breakLabel='...'
				breakClassName={styles['pagination__break_li']}
				breakLinkClassName={styles['pagination__break_a']}
				pageCount={pages}
				marginPagesDisplayed={2}
				pageRangeDisplayed={2}
				onPageChange={handleOffset}
				containerClassName={styles['pagination__wrapper']}
				activeClassName={styles['active']}
			/>
		</div>
	);
};

export default SearchPaginator;
