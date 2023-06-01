import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import Select from "react-select";
import "./ManagePatient.scss";
import * as actions from "../../../store/actions";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPatient: [],
      checkerPatient: {
        value: "All",
        label: "Tất cả",
      },
      notYetPatients: "",
      examinatedPatients: "",
      registeredPatients: "",
      listSpecialty: [],
      selectedSpecialty: {

      },
      selectedDoctor: {},
      DoctorsArr: [],
    };
  }
  async componentDidMount() {
    this.props.fetchAllSpecialtiesOfClinic(this.props.userInfo?.clinicId);
    this.props.fetchAllDoctorsOfHospital({
      clinicId: this.props.userInfo.clinicId,
      specialtyCode: "All",
      positionCode: "All",
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (prevProps.clinicSpecialties !== this.props.clinicSpecialties) {
      let listSpecialty = this.buildDataInputSelect(
        this.props.clinicSpecialties,
        ""
      );
      listSpecialty.unshift({
        value: "All",
        label: this.props.language === LANGUAGES.VI ? "Tất cả" : "All",
      });
      console.log(listSpecialty);
      this.setState({
        listSpecialty: listSpecialty,
        selectedSpecialty: listSpecialty[0],
      });
    }
    if (prevProps.hospitalDoctors !== this.props.hospitalDoctors) {
      console.log("Please", this.props.hospitalDoctors);
      let listDoctor = this.buildDataInputSelect(
        this.props.hospitalDoctors,
        "doctor"
      );
      listDoctor.unshift({
        value: "All",
        label: this.props.language === LANGUAGES.VI ? "Tất cả" : "All",
      });
      console.log(listDoctor);
      this.setState({
        DoctorsArr: listDoctor,
        selectedDoctor: listDoctor[0],
      });
    }
  }
  buildDataInputSelect = (inputData, text) => {
    let { language } = this.props;
    let result = [];
    if (text !== "") {
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
      }
      if (text === "doctor") {
        if (inputData && inputData.length > 0) {
          inputData.map((item, index) => {
            let object = {};
            object.label = item.lastName + " " + item.firstName;
            object.value = item.id;
            result.push(object);
          });
        }
      }
    } else {
      console.log("khong vo day a");
      if (inputData && inputData.length > 0) {
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
  handleOnChangeDatePicker = async (date) => {
    this.setState({
      currentDate: date[0],
    });
    let { user } = this.props;
    let formatedDate = new Date(date[0]).getTime();
    await this.props.fetchRegisteredPatientByDate(user.id, formatedDate);
    await this.props.fetchExaminatedPatientByDate(user.id, formatedDate);
  };
  handleChangeSelectInfor = async (selectedInfor, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedInfor;
    this.setState({
      ...stateCopy,
    });
    if (stateName === "selectedSpecialty") {
      this.props.fetchAllDoctorsOfHospital({
        clinicId: this.props.userInfo.clinicId,
        specialtyCode: selectedInfor.value,
        positionCode: "All",
      });
    }
  };
  render() {
    let {
      dataPatient,
      isOpenModalBooking,
      dataScheduleTimeModal,
      dataExaminatedPatients,
      isOpenModalReview,
      bookingId,
      registeredPatients,
      notYetPatients,
      checkerPatient,
      examinatedPatients,
      reviewMedicalRecord,
      dataMedicineByClinicId,
      patientInformation,
      DoctorsArr,
      selectedDoctor,
      selectedSpecialty,
      listSpecialty
    } = this.state;
    const checkerPatientArr = [
      {
        value: "All",
        label: "Tất cả",
      },
      {
        label: "Chưa khám",
        value: "N",
      },
      {
        label: "Đã khám",
        value: "Y",
      },
    ];
    return (
      <div className="manage-patient-container-hospital-accountant">
        <div className="manage-patient-body-hospital-accountant">
          <div className="left-container">
            <div className="filter-container">
              <div className="type-search">
                <label>Chuyên khoa</label>
                <Select
                  className="type-select"
                  name="selectedSpecialty"
                  value={selectedSpecialty}
                  onChange={this.handleChangeSelectInfor}
                  options={listSpecialty}
                />
              </div>
              <div className="type-search">
                <label>Bác sĩ</label>
                <Select
                  className="type-select"
                  name="selectedDoctor"
                  value={selectedDoctor}
                  onChange={this.handleChangeSelectInfor}
                  options={DoctorsArr}
                />
              </div>
              <div className="type-search">
                <label>Bộ lọc bệnh nhân</label>
                <Select
                  className="type-select"
                  name="checkerPatient"
                  value={this.state.checkerPatient}
                  onChange={this.handleChangeSelectInfor}
                  options={checkerPatientArr}
                />
              </div>
              <div className="search-container">
                <label>Bệnh nhân</label>
                <div className="search">
                  <input
                    className="search-medicine"
                    type="text"
                    id="myInput"
                    //   onChange={(event) => this.searchMedicine(event)}
                    title="Type in a name"
                  />
                  <div className="icon-container">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="statistical-container">
              <div className="total total-medicine ">
                <label>Đăng ký</label>
                {/* <span>{registeredPatients}</span> */}
              </div>
              <div className="total total-tupe ">
                <label>Đã khám</label>
                {/* <span>{examinatedPatients}</span> */}
              </div>
              <div className="total total-pill ">
                <label>Chưa khám</label>
                {/* <span>{notYetPatients}</span> */}
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className="table-manage-patient">
              <table id="TableManagePatients" style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <th>Thời gian</th>
                    <th>Họ và Tên</th>
                    <th>Cao</th>
                    <th>Nặng</th>
                    <th>Máu</th>
                    <th>Sex</th>
                    <th>Tuổi</th>
                    <th>Triệu chứng</th>
                    <th>Action</th>
                  </tr>
                  {checkerPatient.value === "N" ||
                  (checkerPatient.value === "All" &&
                    dataPatient &&
                    dataPatient.length > 0)
                    ? dataPatient.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td width="26%">{item.bookingDate}</td>
                            <td width="20%">{item.forWho}</td>
                            <td width="3%">{item.height}</td>
                            <td width="3%">{item.weight}</td>
                            <td width="3%">{item.bloodType}</td>
                            <td width="3%">{item.gender}</td>
                            <td width="3%">{item.patientAge}</td>
                            <td width="20%">{item.prognostic}</td>
                            <td width="3%">
                              <button
                                className="mp-btn-remedy"
                                onClick={() =>
                                  this.handleClickScheduleTime(item)
                                }
                              >
                                <i class="fas fa-paper-plane"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : ""}
                  {checkerPatient.value === "Y" ||
                  (checkerPatient.value === "All" &&
                    dataExaminatedPatients &&
                    dataExaminatedPatients.length > 0)
                    ? dataExaminatedPatients.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td width="24%">{item.bookingDate}</td>
                            <td width="20%">{item.forWho}</td>
                            <td width="3%">{item.height}</td>
                            <td width="3%">{item.weight}</td>
                            <td width="3%">{item.bloodType}</td>
                            <td width="3%">{item.gender}</td>
                            <td width="3%">{item.patientAge}</td>
                            <td width="20%">{item.prognostic}</td>
                            <td width="3%">
                              <button
                                className="mp-btn-remedy"
                                onClick={() =>
                                  this.handleClickReviewMedicalRecord(
                                    item,
                                    item.id,
                                    index
                                  )
                                }
                              >
                                <i class="fas fa-eye"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : ""}
                </tbody>
              </table>
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
    userInfo: state.user.userInfo,
    hospitalDoctors: state.clinicAccountant.hospitalDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialtiesOfClinic: (data) =>
      dispatch(actions.fetchAllSpecialtiesOfClinic(data)),
    fetchAllDoctorsOfHospital: (data) =>
      dispatch(actions.fetchAllDoctorsOfHospital(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
