import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CommonUtils } from "../../../utils";
import HomeHeader from "../../HomePage/HomeHeader";
import {
  getAllUsers,
  editUserInforByOwnService,
} from "../../../services/userServices";
import "./ProfileUser.scss";
import * as actions from "../../../store/actions";
import { EditUserInforByOwn } from "../../../store/actions";
import { Redirect, withRouter } from "react-router";
class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      avatar: "",
      previewImgURL: "",
    };
  }
  async componentDidMount() {
    let { patientId } = this.props;
    console.log("chheck redux user", patientId);
    let response = await getAllUsers(patientId);

    if (response && response.errCode === 0) {
      this.setState({
        email: response.users?.email,
        firstName: response.users?.firstName,
        lastName: response.users?.lastName,
        phoneNumber: response.users?.phoneNumber,
        address: response.users?.address,
        gender: response.users?.gender,
        previewImgURL: response.users?.image,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.patientId !== prevProps.patientId) {
      let { patientId } = this.props;
      let response = await getAllUsers(patientId);
      if (response && response.errCode === 0) {
        this.setState({
          email: response.users?.email,
          firstName: response.users?.firstName,
          lastName: response.users?.lastName,
          phoneNumber: response.users?.phoneNumber,
          address: response.users?.address,
          gender: response.users?.gender,
          previewImgURL: response.users?.image,
        });
      }
    }
  }
  setGenderCheck = (gender) => {
    this.setState({
      gender: gender.gender,
    });
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  render() {
    let { language, permission, isLoggedIn, patientInformation } = this.props;

    let genderCheck = this.state.gender;
    if (genderCheck === "M") {
      genderCheck = "male";
    }
    if (genderCheck === "F") {
      genderCheck = "female";
    }
    if (genderCheck === "O") {
      genderCheck = "other";
    }
    let { email, firstName, lastName, phoneNumber, address, previewImgURL } =
      this.state;
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <div className="patient-detail-container">
          <div className="left-container">
            <input
              className="preview-img"
              disabled
              style={{ backgroundImage: `url(${previewImgURL})` }}
              read
            />
          </div>
          <div className="right-container">
            <div className="basic-information">
              <div className="title">
                <label className="sub-title">
                  <span>
                    <i class="fas fa-user"></i> Họ và tên{" "}
                  </span>{" "}
                </label>
                :
                <input
                  readOnly
                  className="each-input"
                  value={lastName + " " + firstName}
                />
              </div>
              <div className="title">
                <label className="sub-title">
                  <span>
                    <i class="fas fa-phone"></i> Điện thoại{" "}
                  </span>{" "}
                </label>
                :
                <input
                  readOnly
                  className="each-input"
                  defaultValue={phoneNumber}
                />
              </div>
            </div>
            <div className="medical-information">
              <table id="TablePatientInformation" style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <th>Cao</th>
                    <th>Nặng</th>
                    <th>Máu</th>
                    <th>Sex</th>
                    <th>Tuổi</th>
                    <th>Triệu chứng</th>
                  </tr>
                  {patientInformation && (
                    <tr>
                      <td width="3%">{patientInformation.height}</td>
                      <td width="3%">{patientInformation.weight}</td>
                      <td width="3%">{patientInformation.bloodType}</td>
                      <td width="3%">{patientInformation.gender}</td>
                      <td width="3%">{patientInformation.patientAge}</td>
                      <td width="20%">{patientInformation.prognostic}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="pathology">
                <label>
                  <i class="fas fa-notes-medical"></i>
                  <span>  </span>
                  <FormattedMessage id="patient.modal-booking.pathology" />
                </label>
                <textarea
                  className="pathology form-control"
                  type="text"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "pathology")
                  }
                  value={patientInformation.pathology}
                  placeholder="Nếu có thông tin về bệnh lý, bệnh nhân vui lòng cung cấp để các bác sĩ nắm rõ thông tin"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
    permission: state.user.permission,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileUser)
);
