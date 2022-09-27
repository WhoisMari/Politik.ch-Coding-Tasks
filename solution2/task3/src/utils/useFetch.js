import { useState, useEffect } from 'react';

const useFetch = (url, page) => {
	const [isLoading, setIsLoading] = useState(false);
	const [apiData, setApiData] = useState(null);
	const [serverError, setServerError] = useState(null);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://politk-test-proxy.herokuapp.com/http://ws-old.parlament.ch/${url}?pageNumber=${page}&format=json`, {
					method: 'GET',
				});
				const data = await response.json();

				for (const [key, value] of Object.entries(data.at(-1))) {
					if (key === 'hasMorePages') {
						setHasMore(value);
					};
				};
				setApiData(data);
				setIsLoading(false);
			} catch (error) {
				setServerError(error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [url, page]);
	return { isLoading, apiData, serverError, hasMore };
};

export default useFetch;