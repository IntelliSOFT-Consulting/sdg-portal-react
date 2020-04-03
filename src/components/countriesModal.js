import React, {useState} from "react";
import {
    Container,
    Modal,
    Row,
    Col,
    CardImg
} from "reactstrap";

function CountriesModal(){

    const [toggleModal, setOpenModal] = useState(false);

    const openModal = (countryId) => {
        setOpenModal(true);
    }
    const closeModal = () => {
        setOpenModal(false);
    }


    return (
        <>

            <Container>
                <Modal size="xl" className="modal-dialog-centered" isOpen={toggleModal}
                    toggle={toggleModal}  >
                    <div className="modal-header">
                    <h5 className="countryName" cssModule={{'modal-title': 'w-100 text-center'}}>Choose data to show</h5>
                        <button aria-label="Close" className="close" data-dismiss="modal" type="button"
                            onClick={closeModal} >
                            <span aria-hidden={true}>×</span>
                        </button>
                        
                    </div>
                    <div className="modal-body" ></div>
                </Modal>
            </Container>

        </>
    )
}

export default CountriesModal;