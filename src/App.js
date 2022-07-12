import Router from "./components/Router";
import { BrowserRouter } from 'react-router-dom';

const App = () => {
	return (
		<BrowserRouter>
			<Router/>
		</BrowserRouter>
	);
};

export default App;
