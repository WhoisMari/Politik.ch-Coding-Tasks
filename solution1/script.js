let direction = true;

document.addEventListener('DOMContentLoaded', function() {
	async function getCouncillors() {
		const response = await fetch(
			"https://politk-test-proxy.herokuapp.com/http://ws-old.parlament.ch/councillors?format=json", {
				method: 'GET',
			}
		);
		return response.json();
	};

	let table = document.querySelector('table');

	getCouncillors().then((data) => { 
		const columns = generateTableHead(table);
		generateTableBody(table, data, columns);

		let headers = table.querySelectorAll('th');
		[].forEach.call(headers, function(header, index) {
			header.addEventListener('click', function () {
				data.sort(sortColumn(index));
				const tbody = table.querySelector('tbody');
				tbody.remove();
				generateTableBody(table, data, columns);
			});
		});
	});
});

function generateTableHead(table) {
	let thead = table.createTHead();
	let row = thead.insertRow();

	let columns = [
		{field: 'id', header: 'ID'},
		{field: 'firstName', header: 'First Name'},
		{field: 'lastName', header: 'Last Name'},
	];

	for (let key of columns) {
		let th = document.createElement("th");
		let text = document.createTextNode(key.header);
		th.classList.add('sort-header');
		th.appendChild(text);
		row.appendChild(th);
	};

	return columns;
};

function generateTableBody(table, data, columns) {
	let tbody = table.createTBody();
	for (let item of data) {
		let body_row = tbody.insertRow();
		for (let key of columns) {
			let cell = body_row.insertCell();
			let text = document.createTextNode(item[key.field]);
			cell.appendChild(text);
		};
	};
};

function sortColumn(index) {
	const column = index === 0 ? 'id' : index === 1 ? 'firstName' : 'lastName';
	const multiplier = direction === true ? 1 : -1;
	direction = !direction;

	return function(a, b) {
		if (a[column] > b[column]) {
			return 1 * multiplier;
		} else if (a[column] < b[column]) {
			return -1 * multiplier;
		};
		return 0;
	};
};

function filterTable() {
	let input = document.querySelector('input');
	let tbody = document.querySelector('tbody');
	let tr = tbody.getElementsByTagName('tr');

	for (i = 0; i < tr.length; i++) {
		let rowContent = tr[i].textContent;

		if (rowContent) {
			if (rowContent.toLowerCase().includes(input.value)) {
				tr[i].style.display = '';
			} else {
				tr[i].style.display = 'none';
			};
		};
	};
};