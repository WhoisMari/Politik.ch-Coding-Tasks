import React, { useState } from 'react';
import EntitiesTable from '../../components/Table/EntitiesTable';
import useFetch from "../../utils/useFetch";
import Loader from '../../components/UI/Loader';
import './EntitiesStyles.scss';

const EntitiesPage = (props) => {
	const [page, setPage] = useState(1);
	const { isLoading, serverError, apiData, hasMore } = useFetch(props.url, page);
	const handleNext = () => {
		setPage(page+1);
	};
	const handlePrevious = () => {
		setPage(page-1);
	};

	return (
		<div className='wrap-page'>
			{isLoading && <Loader />}
			{!isLoading &&
				<div className='wrap-content'>
					{hasMore && 
						<div className='wrap-pagination'>
							{page > 1 && <span className='previous' onClick={handlePrevious}>Previous</span>}
							<span className='page'>Page {page}</span>
							<span className='next' onClick={handleNext}>Next</span>
						</div>
					}
					{apiData && <EntitiesTable apiData={apiData} columns={props.columns} />}
				</div>
			}
			{serverError && <span>{serverError}</span>}
		</div>
	);
};

export default EntitiesPage;