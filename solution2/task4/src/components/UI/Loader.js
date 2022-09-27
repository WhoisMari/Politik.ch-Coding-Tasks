import React from 'react';
import './Loader.scss';

const Loader = (props) => {
	return (
		<div className="loader-wrapper">
			<div className="loader">
				<div className="dot"></div>
				<div className="dot"></div>
				<div className="dot"></div>
				<div className="dot"></div>
				<div className="dot"></div>
				<div className="dot"></div>
				<div className="log-message">{props.progressLog}</div>
				<div className="log-message">Please wait - this may take a moment.</div>
			</div>
		</div>
	);
};

export default Loader;