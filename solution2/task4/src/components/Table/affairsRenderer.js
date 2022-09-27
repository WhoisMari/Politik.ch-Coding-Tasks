import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './affairsRenderer.scss';

export default (props) => {
	const affair = props.data;
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const buttonClicked = () => setShow(true);
	let reg_ex = new RegExp('</p>', "g")

	const handleFilterBy = (e, column) => {
		if (column === 'councillor') {
			props.filterAffairs(affair.councillorName);
		} else if (column === 'date') {
			props.filterAffairs(affair.date);
		} else if (column === 'type') {
			props.filterAffairs(affair.type);
		}
		setShow(false);
	};

	return (
		<>
			<div className='affair-cell' onClick={() => buttonClicked()}>
				<span>{affair.shortId}</span>
			</div>

			<Modal show={show} onHide={handleClose} size='lg'>
				<Modal.Header closeButton>
					<div className='wrap-header'>
						<span className='affair-id'>{affair.shortId}</span>
						<span className='affair-type' onClick={e => handleFilterBy(e, 'type')}>{affair.affairType.name}</span>
					</div>
				</Modal.Header>

				<Modal.Body>
					<span className='affair-title'>{affair.title}</span>

					<div className='wrap-info'>
						{affair.councillorName &&
							<div className='info'>
								<span className='title'>Submitted by: </span>
								<span onClick={e => handleFilterBy(e, 'councillor')}>{affair.councillorName}</span>
							</div>
						}
						<div className='info'>
							<span className='title'>Submission date: </span>
							<span onClick={e => handleFilterBy(e, 'date')}>{affair.date}</span>
						</div>
						{affair.deposit.hasOwnProperty('council') &&
							<div className='info'>
								<span className='title'>Submitted: </span>
								<span>{affair.deposit.council.name}</span>
							</div>
						}

						{affair.texts && 
							<div className='info'>
								<span className='title'>Submitted text: </span>
								{affair.texts.map((text) => 
									<p key={text.value}>{text.value.replace(/<p>/g, '').replace(reg_ex, ' ')}</p>
								)}
							</div>

						}
					</div>
				</Modal.Body>

				<Modal.Footer>
					<span className='close-button' onClick={handleClose}>
						Close
					</span>
				</Modal.Footer>
			</Modal>
		</>
	);
};