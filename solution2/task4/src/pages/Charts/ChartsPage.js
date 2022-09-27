import React from 'react';
import CouncillorsChart from '../../components/Chart/CouncillorsChart';
import AffairsStatesChart from '../../components/Chart/AffairsStatesChart';
import 'animate.css';

const ChartsPage = (props) => {
	return (
		<div>
			<div className='animate__animated animate__fadeIn'>
				<CouncillorsChart data={props.tables} />
			</div>
			<div className='animate__animated animate__fadeIn'>
				<AffairsStatesChart data={props.tables} />
			</div>
		</div>
	);
};

export default ChartsPage;