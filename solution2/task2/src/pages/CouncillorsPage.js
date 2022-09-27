import React, { useCallback, useState, useEffect, Fragment } from 'react';
import CouncillorsList from '../components/Councillors/CouncillorsList';
import Loader from '../components/UI/Loader';

const CouncillorsPage = () => {
	const [councillors, setCouncillors] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [error, setError] = useState(null);

	const handleNext = () => {
		setPage(page+1);
	}

	const handlePrevious = () => {
		setPage(page-1);
	}

	const fetchCouncillorsHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`https://politk-test-proxy.herokuapp.com/http://ws-old.parlament.ch/councillors?format=json&pageNumber=${page}`, {
				method: 'GET',
			});
			const data = await response.json();
			setCouncillors(data);
		} catch (error) {
			setError(error);
		}
		setIsLoading(false);
	}, [page]);

	useEffect(() => {
		fetchCouncillorsHandler();
	}, [fetchCouncillorsHandler]);

	return (
		<Fragment>
			{isLoading === false ? (
				<Fragment>
					<div className='wrap-pagination'>
						<span>Page {page}</span>
						<div className='wrap-previous-next'>
							{page > 1 &&
								<span className='previous-btn' onClick={handlePrevious}>Previous</span>
							}
							{page < 73 && 
								<span className='next-btn' onClick={handleNext}>Next</span>
							}
						</div>
					</div>
					<CouncillorsList councillors={councillors} setPage={setPage}/>
				</Fragment>
			) : (
				<Loader />
			)}
		</Fragment>
	);
};

export default CouncillorsPage;