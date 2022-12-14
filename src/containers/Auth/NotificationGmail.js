import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import './NotificationGmail.scss'
import * as actions from "../../store/actions";


class NotificationGmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }
  componentDidMount() {
    this.props.getGendersStart();
    if (this.props.isLoggedIn) {
      this.setState({
        email: this.props.userInfo?.email,
        lastName: this.props.userInfo?.lastName,
        firstName: this.props.userInfo?.firstName,
        address: this.props.userInfo?.address,
        phoneNumber: this.props.userInfo?.phoneNumber,
      });
    }
  }
  handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const donthuocs = [...this.state.donthuocs];
    donthuocs[idx] = {
      ...donthuocs[idx],
      [name]: value,
    };
    this.setState({
      donthuocs,
    });
  };
  handleAddRow = () => {
    const item = {
      tenthuoc: "",
      donvitinh: "",
      soluong: "",
    };
    this.setState({
      donthuocs: [...this.state.donthuocs, item],
    });
  };
  handleRemoveRow = () => {
    this.setState({
      donthuocs: this.state.donthuocs.slice(0, -1),
    });
  };
  handleRemoveSprcificRow = (idx) => () => {
    const donthuocs = [...this.state.donthuocs];
    donthuocs.splice(idx, 1);
    this.setState({ donthuocs });
  };

  handleOnChangeInput = (event, id) => {
    let inputValue = event.target.value;
    let copyState = { ...this.state };
    copyState[id] = inputValue;
    this.setState({
      ...copyState,
    });
  };
  handleOnChangeDataPicker = (date) => {
    this.setState({
      doB: date[0],
    });
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    let { isOpenModal, closeRegisterModal } = this.props;
    return (
      <Modal
        isOpen={isOpenModal}
        size="lg"
        centered={true}
        backdrop={true}
        className="booking-modal-container"
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">Mời bạn xác thực tài khoản qua mail</span>
            <span className="right" onClick={closeRegisterModal}>
            <i className="fas fa-times"></i>
            </span>
          </div>

          
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGendersStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationGmail);
