import React from 'react';
import AffairsTable from '../../components/Table/AffairsTable';
import { useSearchParams } from 'react-router-dom';

const EntitiesPage = (props) => {
	const [searchParams] = useSearchParams();

	return (
		<div className='wrap-content'>
			<AffairsTable data={props.tables} columns={props.columns} params={searchParams.get('filter')} />
		</div>
	);
};

export default EntitiesPage;