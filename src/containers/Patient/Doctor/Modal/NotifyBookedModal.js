import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import { emitter } from "../../../utils/emitter"
import './NotifyBookedModal.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class NotifyBookedModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("hello from modal");
    let { isNotify, closeNotification, openBooking } = this.props;
    return (
      <Modal
      className="modal-notify-booked-appointment" isOpen={isNotify} toggle={this.closeNotification}>
        <ModalHeader>Another Appointment</ModalHeader>
        <ModalBody>
          <div>
            Đây là lịch hẹn bạn đã chọn để đăng ký khám bệnh? Bạn muốn đặt thêm
            một lịch nữa?
          </div>
          <div className="btn-group-notify-booked-appointment">
          <Button color="primary" className="px-5" onClick={openBooking}>
            Yes
          </Button>{" "}
          <Button
            color="secondary"
            className="px-5"
            onClick={closeNotification}
          >
            Close
          </Button>
          </div>

        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NotifyBookedModal);
