import Header from './header/Header';
import Footer from './footer/Footer';

import Home from './home/Home';
import Search from './search/Search';
import Details from './helpers/Details';
import Profile from './profile/Profile'
import Login from './login/Login'
import About from './about/About'
import Register from './register/Register'
import Reset from './reset/Reset';
import Community from './community/Community'

import { Routes, Route, useLocation } from 'react-router-dom';

const Router = () => {
	const location = useLocation();
	const background = location.state && location.state.background
	
	return (
		<>
			<Header hasToken={false} />
			<Routes location={background || location}>
				<Route exact path='/' element={<Home />}></Route>
                <Route path='/community' element={<Community />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/about' element={<About />}></Route>
				<Route path='/search' element={<Search />}></Route>
				<Route path='/reset' element={<Reset />}></Route>
			</Routes>
			{background && (
				<Routes>
					<Route exact path='/search/:id' element={<Details/>}></Route>
				</Routes>
			)}
			<Footer />
		</>
	);
};

export default Router;
