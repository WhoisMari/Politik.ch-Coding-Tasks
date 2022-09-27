import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import './CouncillorsList.scss';

const CouncillorsList = (props) => {
	const [councillors] = useState(props.councillors);
	const [columnDefs] = useState([
		{field: 'id', flex: 1},
		{field: 'firstName', flex: 2},
		{field: 'lastName', flex: 3},
	]);
	const defaultColDef = useMemo( ()=> ({
		sortable: true,
		filter: true,
		resizable: true,
		floatingFilter: true,
	}), []);

	return (
		<div className='test ag-theme-alpine'>
			<AgGridReact
				animateRows={true}
				rowData={councillors}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				sizeColumnsToFit={true}
			/>
		</div>
	);
};

export default CouncillorsList;