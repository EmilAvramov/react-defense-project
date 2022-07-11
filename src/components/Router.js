import Header from './header/Header';
import Home from './home/Home';
import Footer from './footer/Footer';
import Profile from './profile/Profile'
import Login from './login/Login'
import About from './about/About'
import Register from './register/Register'
import Community from './community/Community'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
	return (
		<BrowserRouter>
			<Header hasToken={false} />
			<Routes>
				<Route exact path='/' element={<Home />}></Route>
                <Route path='/community' element={<Community />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/about' element={<About />}></Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default Router;
