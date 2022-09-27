import { useState, useEffect } from 'react';
import config from '../config.json';
import Moment from 'moment';

const useLoadAPIData = () => {
	Moment.locale('en');
	const [isLoading, setIsLoading] = useState(true);
	const [serverError, setServerError] = useState(null);
	const [tables, setTables] = useState([]);
	const [progressLog, setProgressLog] = useState('Getting latest affairs');

	let data = [];
	let affairs_count = 0;

	const getList = async (endpoint, page = 0) => {
		let url = `${config.SERVER_URL}/${endpoint}?format=json`;

		if (page) {
			url = `${url}&pageNumber=${page}`;
		};

		const response = await fetch(url);
		const data = await response.json();
		return data;
	};

	const getBatches = async (page) => {
		let batch_promise = getList('affairs', page);

		batch_promise.then((affairs_list) => {		
			let hasMorePages = affairs_list[affairs_list.length-1].hasMorePages;

			if(hasMorePages){
				affairs_count = affairs_count + affairs_list.length;
				console.log(`Getting next batch (page ${page + 1})`);
				getBatches( page + 1 );
			} else {
				setProgressLog(`Loading ${affairs_count} affairs...`);
				console.log(`Finished on page ${page}`);
			};
			loadBatch(affairs_list)
		});
		return `Finished ${page}`;
	};

	const loadBatch = async (affairs_list) => {
		const affairs = await Promise.all(					
			affairs_list.map(				
				async (affair) => {
					let result = await getList(`affairs/${affair.id}`);
					data['affairs'].push(result);
					return result;
				}
			)
		);
		if (data['affairs'].length >= affairs_count){
			data.affairs.forEach(affair => {
				affair['type'] = affair.affairType.abbreviation;
				affair['date'] = Moment(affair.updated).format('DD/MM/yyyy');
				if(affair.hasOwnProperty('author')) {
					affair['councillor'] = data.councillors.find(councillor => councillor.id === affair.author.councillor.id);
					affair['councillorName'] = `${affair.councillor.firstName} ${affair.councillor.lastName}`;
				};
				if(affair.hasOwnProperty('state')) {
					if(affair.state.hasOwnProperty('name')) {
						affair['state'] = affair.state.name;				
					};
				};
			});
			data.affair_states.forEach(state => {
				state['affairs'] = 0;
				data.affairs.forEach(affair => {
					if (state.name === affair.state) {
						state['affairs']++;
					};
				});
			});
			data.councillors.forEach(councillor => {
				councillor['affairs'] = 0;
				data.affairs.forEach(affair => {
					if (affair.hasOwnProperty('councillor')) {
						if (councillor.id === affair.councillor.id) {
							councillor['affairs']++;
						};
					};
				});
				councillor['name'] = `${councillor.firstName} ${councillor.lastName}`;
			});
			setTables(data);
			setIsLoading(false);
		};
		return;
	};

	const loadData = async () => {
		setIsLoading(true);
		try {
			const responses = await Promise.all([getList('councillors/basicdetails'), getList('affairs/types'), getList('affairs/states')]);
			data['councillors'] = responses[0];
			data['affair_types'] = responses[1];
			data['affair_states'] = responses[2];
			data['affairs'] = [];
			let result = getBatches(1095);
			return result;
		} catch(error) {
			setServerError(error);
		};
		
	};

	useEffect(() => {
		loadData();
	}, []);

	return { isLoading, serverError, tables, progressLog };
};

export default useLoadAPIData;