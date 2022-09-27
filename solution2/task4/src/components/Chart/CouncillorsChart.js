import React, { useState, useEffect } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { useNavigate } from "react-router-dom";
import './Charts.scss';

const CouncillorsChart = (props) => {
	const [councillors, setCouncillors] = useState([]);
	const affairs = props.data.affairs;
	const councillors_list = props.data.councillors;
	let navigate = useNavigate();

	useEffect(() => {
		councillors_list.sort((a, b) => a.affairs - b.affairs)
		councillors_list.reverse()
		setCouncillors(councillors_list);
	}, [councillors_list, affairs]);

	const renderer = (params) => {
		return {
			content: `${params.yValue.toFixed(0)} Affairs`,
		};
	};

	let options = {
		data: councillors.slice(0, 10),
		theme: {
			overrides: {
				bar: {
					series: {
						strokeWidth: 0,
					},
				},
			},
		},
		title: {
			text: "10 Most Active Councillors",
			fontSize: 18,
		},
		series: [
			{
				type: 'bar',
				xKey: 'name',
				yKey: 'affairs',
				tooltip: { renderer: renderer },
				listeners: {
					nodeClick: (event) => {
						navigate(`/?filter=${event.datum.name}`);
					},
				},
				fill: '#F9556D',
			},
		],
		axes: [
			{
				type: 'category',
				position: 'left',
			},
			{
				type: 'number',
				position: 'bottom',
				title: {
					enabled: true,
					text: 'Total Affairs',
				},
			},
		],
		legend: {
			enabled: false,
		},
	};

	return (
		<div className='wrap-chart'>
			<AgChartsReact options={options}/>
		</div>
	);
};

export default CouncillorsChart;