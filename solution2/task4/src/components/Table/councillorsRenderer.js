import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './councillorRenderer.scss';

export default (props) => {
	const councillor = props.data.councillor;
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const buttonClicked = () => setShow(true);

	const handleFilterAffairs = () => {
		console.log('aa');
		props.filterAffairs(props.data.councillorName)
		setShow(false);
	};

	return props.data.hasOwnProperty('author') ? (
			<>
				<div className='councillor-cell' onClick={() => buttonClicked()}>
					<span>{props.data.councillorName}</span>
				</div>

				<Modal show={show} onHide={handleClose} size='lg'>
					<Modal.Header closeButton>
						<Modal.Title>{councillor.firstName} {councillor.lastName} - {councillor.function}</Modal.Title>
					</Modal.Header>

					<Modal.Body>

						<div className='wrap-basic-info'>
							<img 
								src={`https://www.parlament.ch/sitecollectionimages/profil/portrait-260/${councillor.number}.jpg`}
								alt={`Councillor ${councillor.id} portrait`}
							/>

							<div className='basic-info'>
								<span className='id'>{councillor.id}</span>
								<span className='title'>Faction:</span>
								<span>{councillor.factionName} ({councillor.faction})</span>
								<span className='title'>Party:</span>
								<span>{councillor.partyName} ({councillor.party})</span>
								<span className='title' onClick={handleFilterAffairs}>Total Affairs:</span>
								<span>{councillor.affairs}</span>

								<span className='filter' onClick={handleFilterAffairs}>See Affairs</span>
							</div>
						</div>

						<div className='wrap-biography'>
							<span>More about this councillor </span>
							<a href={councillor.biographyUrl}>here.</a>
						</div>
					</Modal.Body>

					<Modal.Footer>
						<span className='close-button' onClick={handleClose}>
							Close
						</span>
					</Modal.Footer>
				</Modal>
			</>
		) : false;
};