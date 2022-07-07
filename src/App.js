import Header from './components/header/Header';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';

const App = () => {
	return (
			<div>
				<Header hasToken={false} />
				<Home />
				<Footer />
			</div>
	);
};

export default App;
