import React from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { useNavigate } from "react-router-dom";
import './Charts.scss';

const AffairsStatesChart = (props) => {
	const states_list = props.data.affair_states;
	let navigate = useNavigate();

	const renderer = (params) => {
		return {
			content: params.angleValue.toFixed(0),
		};
	};

	let options = {
		data: states_list,
		series: [
			{
				type: 'pie',
				angleKey: 'affairs',
				labelKey: 'name',
				tooltip: { renderer: renderer },
				listeners: {
					nodeClick: (event) => {
						navigate(`/?filter=${event.datum.name}`);
					},
				},
			},
		],
		title: {
			text: "Affairs by states",
			fontSize: 18,
		},
	};

	return (
		<div className='wrap-chart'>
			<AgChartsReact options={options} />
		</div>
	);
};

export default AffairsStatesChart;