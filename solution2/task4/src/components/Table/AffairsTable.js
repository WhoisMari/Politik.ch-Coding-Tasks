import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Moment from 'moment';
import affairsRenderer from './affairsRenderer';
import councillorsRenderer from './councillorsRenderer';
import './AffairsTable.scss';
import 'animate.css';

const AffairsTable = (props) => {
	Moment.locale('en');
	const affairs_list = props.data.affairs;
	const [inputValue, setInputValue] = useState(props.params);
	const gridRef = useRef();

	const defaultColDef = useMemo(() => ({
		sortable: true,
		filter: true,
		resizable: true,
		floatingFilter: true,
		minWidth: 150
	}), []);

	const handleFilter = useCallback((value) => {
		setInputValue(value);
		gridRef.current.api.setQuickFilter(value);
    }, []);

	const onGridReady = (e) => {
		e.api.setQuickFilter(inputValue);
	};

	const [columnDefs] = useState([
		{ headerName: 'Date', field: 'date', flex: 1 },
		{ headerName: 'Id', field: 'shortId', cellRenderer: affairsRenderer, cellRendererParams: { filterAffairs: handleFilter }, flex: 1 },
		{ headerName: 'Title', field: 'title', width: 300 },
		{ headerName: 'State', field: 'state', flex: 1 },
		{ headerName: 'Type', field: 'type', flex: 1 },
		{ headerName: 'Councillor', field: 'councillorName', cellRenderer: councillorsRenderer, cellRendererParams: { filterAffairs: handleFilter }, width: 250 },
	]);

	useEffect(() => {
		setInputValue(props.params);
	}, [props.params]);

	return (
		<div className='wrap-table'>
			<input className='form-control' id="filter-text-box" placeholder='Filter...' value={inputValue} onChange={e => handleFilter(e.currentTarget.value)}  />
			<div className='ag-theme-alpine animate__animated animate__fadeIn'>
				<AgGridReact 
					ref={gridRef}
					animateRows={true}
					sizeColumnsToFit={true}
					rowData={affairs_list}
					columnDefs={columnDefs}
					defaultColDef={defaultColDef}
					onGridReady={onGridReady}
				/>
			</div>
		</div>
	);
};

export default AffairsTable;