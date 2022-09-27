import React, { useState, useMemo, useCallback, useRef } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import './EntitiesTable.scss';

const EntitiesTable = (props) => {
	const [data] = useState(props.apiData);
	const defaultColDef = useMemo(() => ({
		sortable: true,
		filter: true,
		resizable: true,
		floatingFilter: true,
	}), []);

	return (
		<div className='wrap-table'>
			<div
				className='ag-theme-alpine'
			>
				<AgGridReact 
					animateRows={true}
					sizeColumnsToFit={true}
					rowData={data}
					columnDefs={props.columns}
					defaultColDef={defaultColDef}
				/>
			</div>
		</div>
	);
};

export default EntitiesTable;