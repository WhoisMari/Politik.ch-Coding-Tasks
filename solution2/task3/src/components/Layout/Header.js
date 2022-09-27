import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
	return (
		<header>
			<span className='logo'><Link to='/'>POLITIK.CH - Task 3</Link></span>
			<div className='wrap-nav-items'>
				<Link to='/affairs'>Affairs</Link>
				<Link to='/councillors'>Councillors</Link>
				<Link to='/councils'>Councils</Link>
			</div>
		</header>
	);
};

export default Header;