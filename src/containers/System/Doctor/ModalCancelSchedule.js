import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../../utils/emitter";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteSelectedSchedule } from "../../../services/userServices";
import "./ModalCancelSchedule.scss";
class ModalCancelSchedule extends Component {
  constructor(props) {
    super(props);
  }
  handleCancelSchedule = async () => {
    let res = await deleteSelectedSchedule(this.props.selectedItem.id);
    console.log("Cancelling Schedule", res);

    this.props.toggleFromParent();
    console.log("checkid", this.props.selectedItem.id);
    console.log("delete schedule", res);
    this.props.CheckCanceled(true);
  };
  toggle = () => {
    this.props.toggleFromParent();
  };
  render() {
    return (
      <Modal
        className="modal-cancel-schedule"
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
      >
        <ModalHeader>Cancel Schedule</ModalHeader>
        <ModalBody>
          <div>
            Đây là lịch hẹn bạn đã chọn để bệnh nhân có thể đăng ký khám!Bạn
            chắc chắn muốn hủy?
          </div>
          <div className="btn-group-cancel-schedule">
            <Button
              color="primary"
              className="px-5"
              onClick={() => {
                this.handleCancelSchedule();
              }}
            >
              Yes
            </Button>{" "}
            <Button
              color="secondary"
              className="px-5"
              onClick={() => {
                this.toggle();
              }}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalCancelSchedule);
