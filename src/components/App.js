import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Path } from '../enums/routes';
import { useSelector } from 'react-redux';
import './App.css';
import Main from './MainPage/Main';
import TripPage from './Trips/TripPage';
import Bookings from './Bookings/Bookings';
import SignIn from './Sign/SignIn';
import SignUp from './Sign/SignUp';
import Footer from './Footer/Footer';
import NotFound from './NotFound/NotFound';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
	const user = useSelector((state) => state.user.userInfo);
	return (
		<BrowserRouter>
			<div className='App'>
				<Routes>
					<Route path={Path.SIGN_UP} element={<SignUp />} />
					<Route path={Path.SIGN_IN} element={<SignIn />} />
					<Route path={Path.NOTFOUND} element={<NotFound />} />
					<Route element={<ProtectedRoute user={user} />}>
						<Route path={Path.ROOT} element={<Main />} />
						<Route path={Path.TRIP_ID} element={<TripPage />} />
						<Route path={Path.BOOKINGS} element={<Bookings />} />
					</Route>
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default App;
