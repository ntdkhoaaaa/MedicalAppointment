import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import Select from "react-select";
import "./ManagePatient.scss";
import * as actions from "../../../store/actions";
import moment from "moment";

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
      selectedSpecialty: {},
      rangeTime: [],
      currentDate: moment(new Date("06-06-2023")).startOf("days").valueOf(),
      selectedDoctor: {},
      DoctorsArr: [],
      appointmentByDate: [],
      appointmentForShow: [],
    };
  }
  async componentDidMount() {
    this.props.fetchAllSpecialtiesOfClinic(this.props.userInfo?.clinicId);
    this.props.fetchAllDoctorsOfHospital({
      clinicId: this.props.userInfo.clinicId,
      specialtyCode: "All",
      positionCode: "All",
    });
    let { currentDate } = this.state;
    if (currentDate) {
      let formatedDate = new Date(currentDate).getTime();
      this.props.fetchAllAppointmentByDate({
        hospitalId: this.props.userInfo.clinicId,
        date: formatedDate,
      });
    }
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
    if (prevProps.appointmentByDate !== this.props.appointmentByDate) {
      console.log(this.props.appointmentByDate);
      this.setState({
        appointmentByDate: this.props.appointmentByDate,
        appointmentForShow: this.props.appointmentByDate,
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
  };
  handleChangeSelectInfor = async (selectedInfor, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedInfor;
    this.setState({
      ...stateCopy,
    });
    let { appointmentForShow, appointmentByDate } = this.state;
    if (stateName === "selectedSpecialty") {
      if (selectedInfor.value !== "All") {
        let temp = appointmentByDate.filter(
          (x) => x.specialtyId === selectedInfor.value
        );
        this.setState({
          appointmentForShow: temp,
        });
      } else {
        this.setState({
          appointmentForShow: appointmentByDate,
        });
      }
    }
    if (stateName === "selectedDoctor") {
      if (selectedInfor.value !== "All") {
        let temp = appointmentByDate.filter(
          (x) => x.doctorId === selectedInfor.value
        );
        this.setState({
          appointmentForShow: temp,
        });
      } else {
        this.setState({
          appointmentForShow: appointmentByDate,
        });
      }
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
      listSpecialty,
      currentDate,
      appointmentByDate,
      appointmentForShow,
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
    let arrDayofWeek = [];
    let tempDate = new Date(currentDate);
    tempDate.setDate(tempDate.getDate() - tempDate.getDay() + 1);
    for (var i = 0; i < 7; i++) {
      arrDayofWeek.push(new Date(tempDate).toLocaleDateString());
      tempDate.setDate(tempDate.getDate() + 1);
    }
    let mon = [];
    let tue = [];
    let wed = [];
    let thu = [];
    let fri = [];
    let sat = [];
    let sun = [];
    return (
      <div className="manage-patient-container-hospital-accountant">
        <div className="manage-patient-body-hospital-accountant">
          <div className="left-container">
            <div className="filter-container">
              <div className="col-12 form-group">
                <label>Chọn ngày</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="date-picker form-control"
                  value={this.state.currentDate}
                />
              </div>
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
              <div className="statistical-container">
                <div className="total total-pill ">
                  <label>Chưa khám</label>
                  <span>{appointmentForShow.length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className="table-manage-patient">
              <table id="TableManagePatients" style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <th>#</th>
                    <th>Họ và Tên</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                    <th>Bác sĩ</th>
                    <th>Chuyên khoa</th>
                  </tr>
                  {appointmentForShow && appointmentForShow.length > 0
                    ? appointmentForShow.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td width="3%">{item.id}</td>
                            <td width="20%">{item.forWho}</td>
                            <td width="22%">{item.address}</td>
                            <td width="10%">{item.phoneNumber}</td>
                            <td width="20%">
                              {item.doctorInfoData.lastName}{" "}
                              {item.doctorInfoData.firstName}
                            </td>
                            <td width="25%">
                              {
                                item.doctorInfoData.Doctor_Clinic_Specialty
                                  .specialtyData.name
                              }
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
    allScheduleTime: state.admin.allScheduleTime,
    hospitalDoctors: state.clinicAccountant.hospitalDoctors,
    appointmentByDate: state.hospitalAccountant.appointmentByDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialtiesOfClinic: (data) =>
      dispatch(actions.fetchAllSpecialtiesOfClinic(data)),
    fetchAllDoctorsOfHospital: (data) =>
      dispatch(actions.fetchAllDoctorsOfHospital(data)),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    fetchAllAppointmentByDate: (data) =>
      dispatch(actions.fetchAllAppointmentByDate(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
