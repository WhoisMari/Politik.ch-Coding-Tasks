import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import Header from './components/Layout/Header';
import EntitiesPage from './pages/Entities/EntitiesPage';
import Home from './pages/Home/Home';
import columns from './utils/entitiesColumns.json';
import './App.css';

function App() {
	return (
		<div className='container'>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/' exact element={<Home />} />
					<Route path='/affairs' exact element={<EntitiesPage key='affairs' url='affairs' columns={columns.affairs} />} />
					<Route path='/councillors' exact element={<EntitiesPage key='councillors' url='councillors' columns={columns.councillors} />} />
					<Route path='/councils' exact element={<EntitiesPage key='councils' url='councils' columns={columns.councils} />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
