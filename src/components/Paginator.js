import styles from '../styles/components/Home.module.scss';
import ReactPaginate from 'react-paginate';

const Paginator = (props) => {
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
            pageCount={props.pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={props.handlePageClick}
            containerClassName='pagination'
            activeClassName='active'
        />
    </div>
    )
}

export default Paginator;