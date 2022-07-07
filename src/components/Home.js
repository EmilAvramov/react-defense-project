import { useEffect, useState } from 'react';
import Card from './Card';
import SearchBar from './SearchBar';
import Paginator from './Paginator';
import getListData from '../services/igdbApi';
import styles from '../styles/components/Home.module.scss';
import PulseLoader from "react-spinners/ClipLoader";

const override = { 
	display: "block",
	margin: "0 auto",
	borderColor: "red",
  };

const Home = () => {
	const itemsPerPage = 30;
	const [data, setData] = useState([]);
	const [pages, setPages] = useState(0);
	const [offset, setOffset] = useState(0);
	const [search, setSearch] = useState([])
	const [loading, setLoading] = useState(true);
	const [color, setColor] = useState("#ffffff");
	const removeListener = () => window.removeEventListener("load",setLoading(false))

	useEffect(() => {
		window.addEventListener("load",setLoading(false));
		const endOffset = offset + itemsPerPage;
		getListData(search).then((res) => {
			setPages(Math.ceil(res.length / itemsPerPage));
			setData(res.slice(offset, endOffset));
		});
		
	}, [offset, search]);

	const handlePageClick = (e) => {
		setLoading(true)
		const newOffset = e.selected * itemsPerPage;
		setOffset(newOffset);
	};

	const receiveData = (data) => {
		setLoading(true)
		setSearch(data)
	}

	const cardArray = data.map((x) => <Card key={x.id} {...x} />);
	
	return (
		<main>
			<SearchBar sendData={receiveData}/>
			{loading 
				? <PulseLoader color={color} loading={loading} cssOverride={override} size={150} />
				: <section onChange={removeListener} className={styles['home__container']}>{cardArray}</section>
			}
			<Paginator pages={pages} handlePageClick={handlePageClick} />
		</main>
	);
};

export default Home;
