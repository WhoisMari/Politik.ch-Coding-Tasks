import React from 'react';
import './Loader.scss';

const Loader = () => {
	return (
		<div className="loader-wrapper">
			<div className="loader">
			<div className="dot"></div>
			<div className="dot"></div>
			<div className="dot"></div>
			<div className="dot"></div>
			<div className="dot"></div>
			<div className="dot"></div>
			</div>
		</div>
	);
};

export default Loader;