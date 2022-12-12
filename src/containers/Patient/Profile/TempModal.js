import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ModalRatingAppointment.scss';
import Lightbox from 'react-image-lightbox';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import DatePicker from '../../../components/Input/DatePicker';

class TempModal extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { isOpenModalRating, closeRatingModal } = this.props;

        return (
            <Modal
                isOpen={isOpenModalRating}
                size='lg'
                toggle={closeRatingModal}
                centered={true}
                fade={true}
                backdrop={true}
                
                // backdropClassName='modal-backdrop'
                className='booking-modal-container'>
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id="patient.modal-booking.booking-infor" /></span>
                        <span className='right' onClick={closeRatingModal}><i className='fas fa-times'></i></span>
                    </div>

                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}

                    </div>

                    <div className='booking-modal-footer'>
                        <button className='btn-booking-comfirm' onClick={() => this.handleConfirmBooking()}>Xác nhận</button>
                        <button className='btn-booking-cancel' onClick={closeRatingModal}>Hủy</button>
                    </div>
                </div>
            </Modal >
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TempModal);
