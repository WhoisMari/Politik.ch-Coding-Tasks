import React from 'react';
import CouncillorsPage from './pages/CouncillorsPage';
import './App.css';
import Header from './components/Layout/Header';

function App() {
	return (
		<div className='container'>
			<Header />
			<CouncillorsPage className='container-fluid' />
		</div>
	);
}

export default App;
