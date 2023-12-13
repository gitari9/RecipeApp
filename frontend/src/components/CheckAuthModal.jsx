import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const CheckAuthModal = ({show, setShow}) => {
    const navigate = useNavigate()
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are not logged in</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => navigate('/login')}>
            login
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}
export default CheckAuthModal