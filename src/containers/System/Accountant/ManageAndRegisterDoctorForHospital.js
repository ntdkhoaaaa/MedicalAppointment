import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CommonUtils, CRUD_ACTIONS } from "../../../utils";
import "./ManageAndRegisterDoctorForHospital.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import _, { upperCase } from "lodash";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-number-input";
class ManageAndRegisterDoctorForHospital extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      listSpecialty: [],
      selectedSpecialty: {},
      DegreeArr: [],
      selectedDegree: {},
      filterSpecialty: {
        value: "All",
        label: "Tất cả",
      },
      filterDegree: {
        value: "All",
        label: "Tất cả",
      },
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
      action: CRUD_ACTIONS.CREATE,
      count: "",
      previewImgURL: "",
      avatar: "",
      DoctorsArr: [],
      id: "",
      tableFilter: [],
      search: "",
      note: "",
      listPrices: [],
      selectedPrice: {},
    };
  }
  async componentDidMount() {
    await this.props.getPositionStart();
    await this.props.getAllRequiredInfor();
    // this.props.saveNewUserSuccess()
    await this.props.fetchAllSpecialtiesOfClinic(this.props.userInfo.clinicId);
    await this.props.loadAllSpecialties();
    await this.props.fetchAllDoctorsOfClinic({
      clinicId: this.props.userInfo.clinicId,
      specialtyCode: "All",
      positionCode: "All",
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (prevProps.allRequiredInfor !== this.props.allRequiredInfor) {
      let { resPrice, resPayment, resProvince } = this.props.allRequiredInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      dataSelectPrice.unshift({
        value:'choose',
        label: this.props.language ===LANGUAGES.VI ? 'Chọn giá tiền' : 'Choose price'
      })
      this.setState({
        listPrices: dataSelectPrice,
        selectedPrice:dataSelectPrice[0]
      });
    }
    if (prevProps.allSpecialties !== this.props.allSpecialties) {
      let listSpecialty = this.buildDataInputSelect(
        this.props.allSpecialties,
        "SPECIALTIES"
      );
      listSpecialty.unshift({
        value: "All",
        label: this.props.language === LANGUAGES.VI ? "Tất cả" : "All",
      });
      this.setState({
        listSpecialty: listSpecialty,
        selectedSpecialty: listSpecialty[0],
      });
    }
    if (prevProps.clinicDoctors !== this.props.clinicDoctors) {
      console.log("fqfbqubqs");
      let { clinicDoctors } = this.props;
      console.log(clinicDoctors);
      this.setState({
        DoctorsArr: clinicDoctors,
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.buildDataInputSelect(
        this.props.positionRedux,
        "POSITION"
      );
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

  buildDataInputSelect = (inputData, type) => {
    let { language } = this.props;
    let result = [];
    if (inputData && inputData.length > 0) {
      if (type === "POSITION") {
        inputData.map((item, index) => {
          let object = {};
          object.label =
            language === LANGUAGES.VI ? item.valueVi : item.valueEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTIES") {
        inputData.map((item, index) => {
          let object = {};
          object.label = language === LANGUAGES.VI ? item.name : item.nameEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} VND`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
    }

    return result;
  };

  // handleOnChangeSelect=async (selectedInfor, name) => {
  setGenderCheck = (gender) => {
    this.setState({
      gender: gender.value,
    });
  };
  SubmitInfor = async () => {
    let {
      gender,
      selectedSpecialty,
      selectedDegree,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      count,
      avatar,
      action,
      id,
      note,
      selectedPrice,
    } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      await this.props.SaveNewDoctor({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        address: address,
        phoneNumber: phoneNumber,
        roleId: "R2",
        gender: gender,
        clinicId: this.props.userInfo.clinicId,
        specialtyId: selectedSpecialty.value,
        positionId: selectedDegree.value,
        count: count,
        avatar: avatar,
        note: note,
        selectedPrice: selectedPrice.value,
        nameSpecialty: selectedSpecialty.label,
      });
      if (this.props.saveNewUserSuccess.errCode === 0) {
        this.setState({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          address: "",
          phoneNumber: "",
          roleId: "R2",
          gender: "",
          clinicId: this.props.userInfo.clinicId,
          selectedSpecialty: {},
          selectedDegree: {},
          count: "",
          id: "",
          previewImgURL: "",
          action: CRUD_ACTIONS.CREATE,
          note: "",
          selectedPrice: {},
        });
      }
    }
    if (action === CRUD_ACTIONS.EDIT) {
      await this.props.EditInforDoctor({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        address: address,
        phoneNumber: phoneNumber,
        gender: gender,
        clinicId: this.props.userInfo.clinicId,
        specialtyId: selectedSpecialty.value,
        positionId: selectedDegree.value,
        count: count,
        avatar: avatar,
        id: id,
      });
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        roleId: "R2",
        gender: "",
        clinicId: this.props.userInfo.clinicId,
        selectedSpecialty: {},
        selectedDegree: {},
        count: "",
        previewImgURL: "",
        id: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
    console.log(
      "selected",
      this.state.selectedSpecialty,
      this.state.selectedDegree
    );
  };
  keyPress = (e) => {
    if (e.key === "-") {
      toast.error("Không nhập số âm");
      return false;
    }
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };
  handleEditUser = async (user) => {
    console.log("Edit User", user);
    let { resPrice } = this.props.allRequiredInfor;

    let { language, positionRedux, allSpecialties } = this.props;
    let tempselectedDegree = {
      value: user.positionId,
    };
    let tempselectedSpecialty = {
      value: user.specialtyId,
    };
    let tempSelectedPrice = {
      value: user.priceId,
    };
    positionRedux.forEach((item) => {
      if (item.keyMap === user.positionId) {
        tempselectedDegree.label =
          language === LANGUAGES.VI ? item.valueVi : item.valueEn;
      }
    });
    allSpecialties.forEach((item) => {
      if (item.keyMap === user.selectedSpecialty) {
        tempselectedSpecialty.label =
          language === LANGUAGES.VI ? user.nameSpecialty : user.nameSpecialtyEn;
      }
    });
    resPrice.forEach((item) => {
      if (item.keyMap === user.priceId) {
        tempSelectedPrice.label =
          language === LANGUAGES.VI ? item.valueVi : item.valueEn;
      }
    });
    // console.log(temp
    this.setState({
      email: user.UserEmail,
      password: "hardcode",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      roleId: "R2",
      gender: user.gender,
      clinicId: this.props.userInfo.clinicId,
      selectedSpecialty: tempselectedSpecialty,
      selectedDegree: tempselectedDegree,
      count: user.count,
      avatar: user.image,
      id: user.id,
      previewImgURL: user.image,
      action: CRUD_ACTIONS.EDIT,
      note: user.note,
      selectedPrice: tempSelectedPrice,
    });
  };
  handleDeleteUser = async (userId) => {
    this.props.DeleteDoctor(userId, this.props.userInfo.clinicId);
  };
  searchDoctorInClinic = (event) => {
    let keyword = event.target.value;
    let { DoctorsArr } = this.state;
    if (!_.isEmpty(keyword)) {
      this.setState({ search: keyword });
      let filterTable = DoctorsArr.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(keyword.toLowerCase())
        )
      );
      this.setState({ tableFilter: filterTable });
      console.log("search in 1 ", this.state.tableFilter);
    } else {
      console.log("search in 2", this.state.search);
      this.setState({
        search: keyword,
        DoctorsArr: this.state.DoctorsArr,
      });
    }
  };
  handleChange = async (selectedInfor, name) => {
    let { filterDegree, filterSpecialty } = this.state;
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedInfor;
    this.setState({
      ...stateCopy,
    });
    if (name.name === "filterSpecialty") {
      await this.props.fetchAllDoctorsOfClinic({
        clinicId: this.props.userInfo.clinicId,
        specialtyCode: selectedInfor.value,
        positionCode: filterDegree.value,
      });
    }
    if (name.name === "filterDegree") {
      await this.props.fetchAllDoctorsOfClinic({
        clinicId: this.props.userInfo.clinicId,
        specialtyCode: filterSpecialty.value,
        positionCode: selectedInfor.value,
      });
    }
  };
  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  render() {
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      previewImgURL,
      DoctorsArr,
      action,
      tableFilter,
      search,
    } = this.state;

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
        value: "M",
      },
      {
        id: 2,
        gender: "female",
        value: "F",
      },
      {
        id: 3,
        gender: "other",
        value: "O",
      },
    ];

    return (
      <div className="manage-container">
        <div className="title-manage">Quản lý thông tin bác sĩ phòng khám</div>
        <div className="register-form">
          <div className="left">
            <input
              className="preview-img"
              type="file"
              style={{
                backgroundImage: `url(${
                  previewImgURL !== ""
                    ? previewImgURL
                    : "/static/media/bac-si-gia-dinh.c908baa4.png"
                })`,
              }}
              onChange={(event) => this.handleOnChangeImage(event)}
            />
          </div>
          <div className="right">
            <div className="form-container">
              <div className="input-form">
                <span>Thông tin cơ bản</span>
                <div className="basic-infor">
                  <div className="account-infor">
                    <div className="basic-infor-container login-name">
                      <label>Tên đăng nhập</label>
                      <input
                        value={email}
                        disabled={action === CRUD_ACTIONS.CREATE ? false : true}
                        onChange={(event) => {
                          this.onChangeInput(event, "email");
                        }}
                        type="text"
                        className="input-container user-mail "
                      />
                    </div>
                    <div className="basic-infor-container password">
                      <label>Mật khẩu</label>
                      <input
                        disabled={action === CRUD_ACTIONS.CREATE ? false : true}
                        value={password}
                        onChange={(event) => {
                          this.onChangeInput(event, "password");
                        }}
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
                          onChange={(event) => {
                            this.onChangeInput(event, "firstName");
                          }}
                          value={firstName}
                          type="text"
                          className="input-container firstName"
                        />
                      </div>
                      <div className="basic-infor-container">
                        <label>Họ</label>
                        <input
                          onChange={(event) => {
                            this.onChangeInput(event, "lastName");
                          }}
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
                          onChange={(event) => {
                            this.onChangeInput(event, "phoneNumber");
                          }}
                          value={phoneNumber}
                          type="number"
                          className="input-container phone "
                        />
                      </div>
                      <div className="basic-infor-container">
                        <label>Địa chỉ</label>
                        <input
                          value={address}
                          onChange={(event) => {
                            this.onChangeInput(event, "address");
                          }}
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
                  <div className="selection-infor">
                    <div className="degree">
                      <label>Học vị</label>
                      <Select
                        style={{ border: "1px solid #000 !important" }}
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
                    <div className="price">
                      <label>
                        <FormattedMessage id="admin.manage-doctor.choose-price" />
                      </label>

                      <Select
                        placeholder={
                          <FormattedMessage id="admin.manage-doctor.choose-price" />
                        }
                        className="price-select"
                        value={this.state.selectedPrice}
                        onChange={this.handleChange}
                        name="selectedPrice"
                        options={this.state.listPrices}
                      />
                    </div>
                  </div>
                  <div className="type-infor">
                    <div className="count">
                      <label>Maximum per time</label>
                      <input
                        onChange={(event) => this.onChangeInput(event, "count")}
                        value={this.state.count}
                        type="number"
                        min="0"
                        max="9999"
                        maxlength="4"
                        onKeyPress={(event) => this.keyPress(event)}
                        className="form-control"
                      />
                    </div>
                    <div className="note">
                      <label>
                        <FormattedMessage id="admin.manage-doctor.clinic-Note" />
                      </label>
                      <textarea
                        onChange={(event) =>
                          this.handleOnChangeText(event, "note")
                        }
                        value={this.state.note}
                        className="note-text"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-container">
                <button
                  onClick={() => this.SubmitInfor()}
                  className={
                    action === CRUD_ACTIONS.CREATE
                      ? "submit-btn create"
                      : "submit-btn edit"
                  }
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="doctors-hospital">
          <div className="filter">
            <div className="doctor-search">
              <label>Tên bác sĩ</label>
              <div className="search">
                <input
                  className="search-medicine"
                  type="text"
                  id="myInput"
                  onChange={(event) => this.searchDoctorInClinic(event)}
                  title="Type in a name"
                />
                <div className="icon-container">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>

            <div className="specialty-search">
              <label>Chuyên khoa</label>
              <Select
                className="specialty-select"
                name="filterSpecialty"
                value={this.state.filterSpecialty}
                onChange={this.handleChange}
                options={this.state.listSpecialty}
              />
            </div>
            <div className="degree-search">
              <label>Học vị</label>
              <Select
                className="degree-select"
                value={this.state.filterDegree}
                onChange={this.handleChange}
                name="filterDegree"
                options={this.state.DegreeArr}
              />
            </div>
          </div>
          <div className="doctors-contain">
            {DoctorsArr && search.length > 0 && tableFilter.length >= 1
              ? tableFilter.map((item, index) => {
                  return (
                    <div className="item-doctor">
                      <div
                        className={
                          item.positionId === "P4"
                            ? "doctor-avatar professor-position"
                            : item.positionId === "P3"
                            ? "doctor-avatar assi-position"
                            : item.positionId === "P2"
                            ? "doctor-avatar doctor-position"
                            : item.positionId === "P1"
                            ? "master-position doctor-avatar"
                            : "doctor-avatar"
                        }
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="extra-infor">
                        <div className="doctor-name">
                          {" "}
                          {item.lastName} {item.firstName}
                        </div>
                        <div className="doctor-specialty">
                          {item.nameSpecialty}
                        </div>
                        <div className="doctor-specialty">
                          {item.phoneNumber}
                        </div>
                        <div className="btn-group-accountant">
                          <button
                            onClick={() => this.handleEditUser(item)}
                            className=" btn btn-edit-user-item"
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className=" btn btn-delete-user-item"
                            onClick={() => this.handleDeleteUser(item.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : DoctorsArr.map((item, index) => {
                  return (
                    <div className="item-doctor">
                      <div>
                        <div
                          className={
                            item.positionId === "P4"
                              ? "doctor-avatar professor-position"
                              : item.positionId === "P3"
                              ? "doctor-avatar assi-position"
                              : item.positionId === "P2"
                              ? "doctor-avatar doctor-position"
                              : item.positionId === "P1"
                              ? "master-position doctor-avatar"
                              : "doctor-avatar"
                          }
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className="extra-infor">
                          <div className="doctor-name">
                            {" "}
                            {item.lastName} {item.firstName}
                          </div>
                          <div className="doctor-specialty">
                            {item.nameSpecialty}
                          </div>
                          <div className="doctor-specialty">
                            {item.phoneNumber}
                          </div>
                          <div className="btn-group-accountant">
                            <button
                              onClick={() => this.handleEditUser(item)}
                              className=" btn btn-edit-user-item"
                            >
                              <i className="fas fa-pencil-alt"></i>
                            </button>
                            <button
                              className=" btn btn-delete-user-item"
                              onClick={() => this.handleDeleteUser(item.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
    saveNewUserSuccess: state.clinicAccountant.saveNewUserSuccess,
    allSpecialties: state.admin.allSpecialties,
    clinicDoctors: state.clinicAccountant.clinicDoctors,
    allRequiredInfor: state.admin.allRequiredInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialtiesOfClinic: (data) =>
      dispatch(actions.fetchAllSpecialtiesOfClinic(data)),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    SaveNewDoctor: (data) => dispatch(actions.SaveNewClinicDoctor(data)),
    EditInforDoctor: (data) => dispatch(actions.EditInforDoctor(data)),
    fetchAllDoctorsOfClinic: (data) =>
      dispatch(actions.fetchAllDoctorsOfClinic(data)),
    DeleteDoctor: (userId, clinicId) =>
      dispatch(actions.DeleteDoctor(userId, clinicId)),
    loadAllSpecialties: () => dispatch(actions.fetchAllSpecialties()),
    getAllRequiredInfor: () => dispatch(actions.getAllRequiredInfor()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAndRegisterDoctorForHospital);
