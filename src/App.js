import Router from './components/Router';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LibraryProvider } from './contexts/LibraryContext';

const App = () => {
	return (
		<BrowserRouter>
			<LibraryProvider>
				<AuthProvider>
					<Router />
				</AuthProvider>
			</LibraryProvider>
		</BrowserRouter>
	);
};

export default App;
