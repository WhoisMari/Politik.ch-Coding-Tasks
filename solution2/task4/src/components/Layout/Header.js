import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
	return (
		<header>
			<span className='logo'><Link to='/'>AFFAIRS EXPLORER</Link></span>
			<div className='wrap-nav-items'>
				<Link to='/'>Affairs</Link>
				<Link to='/charts'>Charts</Link>
			</div>
		</header>
	);
};

export default Header;