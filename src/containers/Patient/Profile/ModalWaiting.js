import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { Modal } from "reactstrap";
import "./UserProfile.scss";
class ModalWaiting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  render() {
    let { isOpenModalWaiting } = this.props;
    return (
      <Modal
        className="modal-waiting"
        size="lg"
        centered={true}
        isOpen={isOpenModalWaiting}
      >
        <div className="modal-waiting">
          <img src="https://cdn-icons-png.flaticon.com/512/5229/5229377.png" />
          <div className="title">
            Bạn đợi 1 xí nhé, hệ thống đang xử lý yêu cầu của bạn
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWaiting);
