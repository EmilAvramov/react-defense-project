import Header from './header/Header';
import Footer from './footer/Footer';

import Home from './home/Home';
import Search from './search/Search';
import SearchDetails from './search/SearchDetails';
import Profile from './profile/Profile';
import ProfileLibrary from './profile/ProfileLibrary';
import ProfileLibraryDetails from './profile/ProfileLibraryDetails';
import ProfileSettings from './profile/ProfileSettings';
import ProfileSettingsEdit from './profile/ProfileSettingsEdit';
import ProfileSettingsDelete from './profile/ProfileSettingsDelete';
import ProfileSettingsPassword from './profile/ProfileSettingsPassword';
import ProfileSettingsEmail from './profile/ProfileSettingsEmail';
import Login from './login/Login';
import About from './about/About';
import Register from './register/Register';
import Reset from './reset/Reset';
import NotFound from './helpers/NotFound';
import Protected from './helpers/Protected';

import { Routes, Route, useLocation } from 'react-router-dom';

const Router = () => {
	const location = useLocation();
	const searchBackground = location.state && location.state.searchBackground;
	const carouselBackground = location.state && location.state.carouselBackground

	return (
		<>
			<Header />
			<Routes location={searchBackground || carouselBackground || location}>
				<Route path='/' element={<Home />}></Route>
				<Route path='profile' element={
					<Protected>
						<Profile />
					</Protected>
					}>
					<Route index element={<ProfileLibrary/>}></Route>
					<Route path='library' element={<ProfileLibrary/>}></Route>
					<Route path='settings' element={<ProfileSettings/>}>
						<Route path='edit' element={<ProfileSettingsEdit/>}></Route>
						<Route path='email' element={<ProfileSettingsEmail/>}></Route>
						<Route path='password' element={<ProfileSettingsPassword/>}></Route>
						<Route path='delete' element={<ProfileSettingsDelete/>}></Route>
					</Route>
				</Route>
				<Route path='register' element={<Register />}></Route>
				<Route path='login' element={<Login />}></Route>
				<Route path='about' element={<About />}></Route>
				<Route path='search' element={<Search />}></Route>
				<Route path='reset' element={<Reset />}></Route>
				<Route path='*' element={<NotFound/>}></Route>
			</Routes>
			{searchBackground && (
				<Routes>
					<Route
						path='search/:id'
						element={<SearchDetails />}
					></Route>
				</Routes>
			)}
			{carouselBackground && (
				<Routes>
					<Route
						path='profile/library/:id'
						element={<ProfileLibraryDetails/>}
					>
					</Route>
				</Routes>
			)}
			<Footer />
		</>
	);
};

export default Router;
