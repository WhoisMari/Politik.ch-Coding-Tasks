import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import Header from './components/Layout/Header';
import AffairsPage from './pages/Affairs/AffairsPage';
import ChartsPage from './pages/Charts/ChartsPage';
import useLoadAPIData from './utils//useLoadAPIData';
import Loader from './components/UI/Loader';
import './App.css';

function App() {
	const { isLoading, serverError, tables, progressLog } = useLoadAPIData();
	return (
		<div className='container'>
			{isLoading && <Loader progressLog={progressLog} />}
			{!isLoading &&
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path='/' exact element={<AffairsPage id='affairs' tables={tables} />} />
						<Route path='/charts' exact element={<ChartsPage tables={tables} />} />
					</Routes>
				</BrowserRouter>
			}
			{serverError && <span>{serverError}</span>}
		</div>
	);
}

export default App;
