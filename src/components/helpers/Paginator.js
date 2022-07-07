import { useState } from 'react';
import styles from '../../styles/components/Home.module.scss';
import ReactPaginate from 'react-paginate';

const Paginator = (props) => {
    const itemsPerPage = 30;
    const [data, setData] = useState(props.data)
	const [pages, setPages] = useState(0);
	const [offset, setOffset] = useState(0);

    const endOffset = offset + itemsPerPage;
    setPages(Math.ceil(data.length / itemsPerPage));
    setData(data.slice(offset, endOffset));

	const handlePageClick = (e) => {
		const newOffset = e.selected * itemsPerPage;
		setOffset(newOffset);
	};

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
            onPageChange={handlePageClick}
            containerClassName='pagination'
            activeClassName='active'
        />
    </div>
    )
}

export default Paginator;