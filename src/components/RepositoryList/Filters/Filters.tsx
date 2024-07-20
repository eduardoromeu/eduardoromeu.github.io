import { Fragment, useState } from "react";
import { Button, Modal} from 'react-bootstrap';

// interface Props {
    
// }

export default function Filters(){

    const [showModal, setShowModal] = useState(false);

    const showHandler = (show : boolean = !showModal) => setShowModal(show);

    return (
        <Fragment>
            <Button variant="outline-primary" onClick={() => showHandler()} disabled>Filters <i className="bi bi-sliders ms-1" /></Button>

            <Modal show={showModal} onHide={showHandler} size="xl">
                <Modal.Header>
                    <Modal.Title>Filter Repositories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        className="flex-grow-1 flex-lg-grow-0"
                        variant="outline-secondary"
                        onClick={() => showHandler()}    
                    > Cancel </Button>
                    <Button 
                        className="flex-grow-1 flex-lg-grow-0" 
                        variant="success"
                    >Apply</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}