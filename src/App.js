import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';

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
