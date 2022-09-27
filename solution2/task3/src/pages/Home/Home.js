import React from 'react';
import { Link } from 'react-router-dom';
import './HomeStyle.scss';

const Home = () => {
	return (
		<div className='wrap-buttons'>
			<Link to={'/affairs'}>Affairs</Link>
			<Link to={'/councillors'}>Councillors</Link>
			<Link to={'/councils'}>Councils</Link>
		</div>
	);
};

export default Home;