import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from "../../../utils/emitter"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { deleteSelectedSchedule } from '../../../services/userServices'
class ModalCancelSchedule extends Component {
    constructor(props) {
        super(props);
    }
    handleCancelSchedule = async () => {
        let res = await deleteSelectedSchedule(this.props.selectedItem.id);
        console.log('Cancelling Schedule', res);

        this.props.toggleFromParent();
        console.log('checkid', this.props.selectedItem.id)
        console.log('delete schedule', res);
        this.props.CheckCanceled(true);
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        console.log('hello from modal');
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}>
                <ModalHeader>
                    Cancel Schedule
                </ModalHeader>
                <ModalBody>
                    <div>
                        Đây là lịch hẹn bạn đã chọn để bệnh nhân có thể đăng ký khám!Bạn chắc chắn muốn hủy?
                    </div>
                    <Button color="primary" className='px-3' onClick={() => { this.handleCancelSchedule() }}>
                        Yes
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalBody>
            </Modal>
            // <Modal
            //     isOpen={true}
            //     toggle={true}
            //     size="lg"
            //     centered
            //     className='modal-user-container'
            // >
            //     <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
            //     <ModalBody>
            //         <div className='modal-user-body '>
            //             <div className='input-container'>
            //                 <label>Email</label>
            //                 <input type="text"
            //                     onChange={(event) => { this.handleOnChangeInput(event, "email") }}
            //                     value={this.state.email} />
            //             </div>
            //             <div className='input-container'>
            //                 <label>Password</label>
            //                 <input type="password"
            //                     onChange={(event) => { this.handleOnChangeInput(event, "password") }}
            //                     value={this.state.password} />
            //             </div>
            //             <div className='input-container'>
            //                 <label>First Name</label>
            //                 <input type="text"
            //                     onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
            //                     value={this.state.firstName} />
            //             </div>
            //             <div className='input-container'>
            //                 <label>Last Name</label>
            //                 <input type="text"
            //                     onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
            //                     value={this.state.lastName} />
            //             </div>
            //             <div className='input-container max-width-input'>
            //                 <label>Address</label>
            //                 <input type="text"
            //                     onChange={(event) => { this.handleOnChangeInput(event, "address") }}
            //                     value={this.state.address} />
            //             </div>
            //         </div>
            //     </ModalBody>
            //     <ModalFooter>
            //         <Button color="primary" className='px-3' onClick={() => { this.handleCancelSchedule() }}>
            //             Add new
            //         </Button>{' '}
            //         <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
            //             Close
            //         </Button>
            //     </ModalFooter>
            // </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCancelSchedule);
