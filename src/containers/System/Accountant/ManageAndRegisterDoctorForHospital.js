import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import "./ManageAndRegisterDoctorForHospital.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import _, { upperCase } from "lodash";

class ManageAndRegisterDoctorForHospital extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      listSpecialty: [],
      selectedSpecialty: {},
      DegreeArr: [],
      selectedDegree: {},
      idUser: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      position: "",
      clinicId: "",
      role: "",
      avatar: "",
      action: "",
    };
  }
  async componentDidMount() {
    this.props.getPositionStart();
    this.props.fetchAllSpecialtiesOfClinic(this.props.userInfo.clinicId);
    console.log(
      this.props.fetchAllSpecialtiesOfClinic(this.props.userInfo.clinicId)
    );
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (prevProps.clinicSpecialties !== this.props.clinicSpecialties) {
      let listSpecialty = this.buildDataInputSelect(
        this.props.clinicSpecialties,
        ""
      );
      console.log("list specialty", listSpecialty);
      listSpecialty.unshift({
        value: "All",
        label: this.props.language === LANGUAGES.VI ? "Tất cả" : "All",
      });
      this.setState({
        listSpecialty: listSpecialty,
        selectedSpecialty: listSpecialty[0],
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.buildDataInputSelect(
        this.props.positionRedux,
        "allcode"
      );
      console.log(arrPositions);
      arrPositions.unshift({
        value: "All",
        label: this.props.language === LANGUAGES.VI ? "Tất cả" : "All",
      });
      this.setState({
        DegreeArr: arrPositions,
        selectedDegree: arrPositions[0],
      });
    }
  }

  buildDataInputSelect = (inputData, text) => {
    let { language } = this.props;
    let result = [];
    if (text === "allcode") {
      if (inputData && inputData.length > 0) {
        inputData.map((item, index) => {
          let object = {};
          object.label =
            language === LANGUAGES.VI ? item.valueVi : item.valueEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
    } else {
      if (inputData && inputData.length > 0) {
        console.log(inputData);
        inputData.map((item, index) => {
          let object = {};
          object.label = language === LANGUAGES.VI ? item.name : item.nameEn;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };
  handleChange = async (selectedInfor, name) => {
    console.log("handleChange", selectedInfor, name);
    let { selectedDegree, selectedSpecialty } = this.state;
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedInfor;
    this.setState({
      ...stateCopy,
    });
  };
  setGenderCheck = (gender) => {
    this.setState({
      gender: gender.gender,
    });
  };
  SubmitInfor = async () => {
    let {gender,selectedSpecialty,selectedDegree,email,password,firstName,lastName,phoneNumber,address}=this.state
    this.props.SaveNewDoctor({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phoneNumber,
      roleId:'R2',
      gender: gender,
      clinicId: this.props.userInfo.clinicId,
      specialtyId:selectedSpecialty.value,
      positionId:selectedDegree.value
  })
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state }
    console.log(id,event.target.value)
    copyState[id] = event.target.value;
    console.log(copyState)
    
    this.setState({
        ...copyState
    });
}
  render() {
    let {gender,selectedSpecialty,selectedDegree,email,password,firstName,lastName,phoneNumber,address,position}=this.state

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
    const genderArr = [
      {
        id: 1,
        gender: "male",
      },
      {
        id: 2,
        gender: "female",
      },
      {
        id: 3,
        gender: "other",
      },
    ];
    return (
      <div className="manage-container">
        <div className="title-manage">Quản lý thông tin bác sĩ bệnh viện</div>
        <div className="register-form">
          <div className="left"></div>
          <div className="right">
            <div className="form-container">
              <div className="title-form">Thông tin bác sĩ</div>
              <div className="input-form">
                <span>Thông tin cơ bản</span>
                <div className="basic-infor">
                  <div className="account-infor">
                    <div className="basic-infor-container login-name">
                      <label>Tên đăng nhập</label>
                      <input
                        value={email}
                        onChange={(event) => { this.onChangeInput(event, 'email') }} 
                        type="text"
                        className="input-container user-mail "
                      />
                    </div>
                    <div className="basic-infor-container password">
                      <label>Mật khẩu</label>
                      <input
                      value={password}
                      onChange={(event) => { this.onChangeInput(event, 'password') }} 
                        type="password"
                        className="input-container user-password "
                      />
                    </div>
                  </div>
                  <div className="extra-infor">
                    <div className="extra-infor-basic">
                      <div className="basic-infor-container">
                        <label>Tên</label>
                        <input
                        onChange={(event) => { this.onChangeInput(event, 'firstName') }} 
                          value={firstName}
                          type="text"
                          className="input-container firstName"
                        />
                      </div>
                      <div className="basic-infor-container">
                        <label>Họ</label>
                        <input
                        onChange={(event) => { this.onChangeInput(event, 'lastName') }} 
                          value={lastName}
                          type="text"
                          className="input-container lastName"
                        />
                      </div>
                      <div className="basic-infor-container ">
                        <label>Giới tính</label>
                        <div className="radio-group">
                          {genderArr.map((gender) => (
                            <div key={gender.id} className="male">
                              <input
                                type="radio"
                                onChange={() => this.setGenderCheck(gender)}
                                checked={genderCheck === gender.gender}
                              />
                              <label>
                                {gender.gender === "male"
                                  ? "Nam"
                                  : gender.gender === "female"
                                  ? "Nữ"
                                  : "Khác"}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="extra-infor-advanced">
                      <div className="basic-infor-container">
                        <label>Số điện thoại</label>
                        <input
                        onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} 
                         value={phoneNumber} type="text" className="input-container phone " />
                      </div>
                      <div className="basic-infor-container">
                        <label>Địa chỉ</label>
                        <input
                        value={address}
                        onChange={(event) => { this.onChangeInput(event, 'address') }} 
                          type="text"
                          className="input-container address "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="doctor-infor">
                <div className="infor-container">
                  <span>Thông tin chuyên môn</span>
                  <div className="degree">
                    <label>Học vị</label>
                    <Select
                      className="degree-select"
                      value={this.state.selectedDegree}
                      onChange={this.handleChange}
                      name="selectedDegree"
                      options={this.state.DegreeArr}
                    />
                  </div>
                  <div className="specialty">
                    <label>Chuyên khoa</label>
                    <Select
                      className="specialty-select"
                      name="selectedSpecialty"
                      value={this.state.selectedSpecialty}
                      onChange={this.handleChange}
                      options={this.state.listSpecialty}
                    />
                  </div>
                  
                </div>
              </div>
              <div className="btn-container">
                <button
                  onClick={() => this.SubmitInfor()}
                  className="submit-btn"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    clinicSpecialties: state.clinicAccountant.clinicSpecialties,
    positionRedux: state.admin.position,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialtiesOfClinic: (data) =>
      dispatch(actions.fetchAllSpecialtiesOfClinic(data)),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    SaveNewDoctor: (data) => dispatch(actions.SaveNewDoctor(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAndRegisterDoctorForHospital);
