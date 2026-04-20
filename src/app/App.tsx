import './styles/normalize.css';
import './styles/styles.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Sort } from '@features/search';
import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
	return (
		<>
			<Header />
			<Sort />
			<Outlet />
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				pauseOnHover
				theme='colored'
			/>
			<Footer />
		</>
	);
};
