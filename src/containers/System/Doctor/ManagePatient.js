import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";

import "./ManagePatient.scss";
import {
  getListPatientForDoctor,
  getListExaminatedPatientForDoctor,
} from "../../../services/userServices";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import ConfirmtoPatientModal from "./ConfirmtoPatientModal";
import ReviewMedicalRecordsModal from "./ReviewMedicalRecordsModal";
import Select from "react-select";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("days").valueOf(),
      dataPatient: [],
      dataExaminatedPatients: [],
      dataPatientsMedicalRecords: [],
      isOpenModalReview: false,
      isOpenModalBooking: false,
      bookingId: "",
      dataScheduleTimeModal: {},
      checkerPatient: {
        value: "All",
        label: "Tất cả",
      },
      notYetPatients: "",
      examinatedPatients: "",
      registeredPatients: "",
      reviewMedicalRecord: {},
      dataMedicineByClinicId: [],
      patientInformation:{}
      // medicalRecords:{}
    };
  }

  async componentDidMount() {
    let { user } = this.props;
    let { currentDate } = this.state;
    if (currentDate) {
      let formatedDate = new Date(currentDate).getTime();
      await this.props.fetchRegisteredPatientByDate(user.id, formatedDate);
      await this.props.fetchExaminatedPatientByDate(user.id, formatedDate);
    }
    this.setState({
      dataMedicineByClinicId: this.props.myProp,
    });
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.registeredPatients !== this.props.registeredPatients) {
      this.setState({
        dataPatient: this.props.registeredPatients,
        notYetPatients: this.props.registeredPatients.length,
      });
    }
    if (
      prevProps.patientsMedicalRecords !== this.props.patientsMedicalRecords
    ) {
      this.setState({
        dataPatientsMedicalRecords: this.props.patientsMedicalRecords,
      });
    }
    if (prevProps.examinatedPatients !== this.props.examinatedPatients) {
      this.setState({
        dataExaminatedPatients: this.props.examinatedPatients,
        examinatedPatients: this.props.examinatedPatients.length,
      });
    }
    if (prevProps.myProp !== this.props.myProp) {
      this.setState({
        dataMedicineByClinicId: this.props.myProp,
      });
    }
    if (prevProps.medicalRecords !== this.props.medicalRecords) {
      this.setState({
        reviewMedicalRecord: this.props.medicalRecords,
      });
    }
  }

  handleOnChangeDatePicker = async (date) => {
    this.setState({
      currentDate: date[0],
    });
    let { user } = this.props;
    let formatedDate = new Date(date[0]).getTime();
    await this.props.fetchRegisteredPatientByDate(user.id, formatedDate);
    await this.props.fetchExaminatedPatientByDate(user.id, formatedDate);
  };
  handleClickScheduleTime = (time) => {
    if (this.props.isLoggedIn) {
      console.log('Schedule',time)
      let patientInformation={}
      patientInformation.height=time.height
      patientInformation.weight=time.weight
      patientInformation.pathology=time.pathology
      patientInformation.patientAge=time.patientAge
      patientInformation.prognostic=time.prognostic
      patientInformation.bloodType=time.bloodType
      patientInformation.gender=time.gender
      this.setState({
        dataScheduleTimeModal: time,
        bookingId: time.id,
        isOpenModalBooking: true,
        patientInformation:patientInformation
      });
    } else {
      this.props.history.push("/login");
    }
  };
  handleClickReviewMedicalRecord = async (time, bookingId, index) => {
    if (this.props.isLoggedIn) {
      await this.props.fetchMedicalRecordByBookingId(bookingId);
      let { reviewMedicalRecord } = this.state;
      let patientInformation={}
      patientInformation.height=time.height
      patientInformation.weight=time.weight
      patientInformation.pathology=time.pathology
      patientInformation.patientAge=time.patientAge
      patientInformation.prognostic=time.prognostic
      patientInformation.bloodType=time.bloodType
      patientInformation.gender=time.gender
      if (reviewMedicalRecord) {
        this.setState({
          bookingId: bookingId,
          dataScheduleTimeModal: time,
          isOpenModalReview: true,
          reviewMedicalRecord: reviewMedicalRecord,
        patientInformation:patientInformation

        });
      } else
        toast.warn(
          "Hiện tại hệ thống đang cập nhật dữ liệu!Vui lòng đợi trong giây lát"
        );
    } else {
      this.props.history.push("/login");
    }
  };
  closeBookingModal = async () => {
    this.setState({
      isOpenModalBooking: false,
    });
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    await this.props.fetchRegisteredPatientByDate(user.id, formatedDate);
    await this.props.fetchExaminatedPatientByDate(user.id, formatedDate);
  };
  closeReviewModal = () => {
    this.setState({
      isOpenModalReview: false,
    });
  };
  handleChangeSelectInfor = async (selectedInfor, name) => {
    let { medicine, tableFilter } = this.state;
    let { user } = this.props;
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedInfor;
    this.setState({
      ...stateCopy,
    });
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
      patientInformation
    } = this.state;
    let { permission, user, myProp } = this.props;
    registeredPatients = examinatedPatients + notYetPatients;
    if (permission === "R3") {
      return <Redirect to="/home" />;
    }
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
      <React.Fragment>
        <div className="manage-patient-container">
          <div className="manage-patient-body">
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
                      onChange={(event) => this.searchMedicine(event)}
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
                  <span>{registeredPatients}</span>
                </div>
                <div className="total total-tupe ">
                  <label>Đã khám</label>
                  <span>{examinatedPatients}</span>
                </div>
                <div className="total total-pill ">
                  <label>Chưa khám</label>
                  <span>{notYetPatients}</span>
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
                                  <i className="fas fa-paper-plane"></i>
                                </button>
                                <ConfirmtoPatientModal
                                  isOpenModal={isOpenModalBooking}
                                  closeBookingModal={this.closeBookingModal}
                                  dataTime={dataScheduleTimeModal}
                                  bookingId={bookingId}
                                  dataMedicineByClinicId={dataMedicineByClinicId}
                                  patientInformation={patientInformation}
                                />
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
                                  <i className="fas fa-eye"></i>
                                </button>
                                <ReviewMedicalRecordsModal
                                  isOpenModalReview={isOpenModalReview}
                                  closeReviewModal={this.closeReviewModal}
                                  dataTime={dataScheduleTimeModal}
                                  bookingId={bookingId}
                                  reviewMedicalRecord={reviewMedicalRecord}
                                  patientInformation={patientInformation}
                                />
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.userInfo,
    permission: state.user.permission,
    registeredPatients: state.doctor.registeredPatients,
    examinatedPatients: state.doctor.examinatedPatients,
    patientsMedicalRecords: state.doctor.patientsMedicalRecords,
    medicalRecords: state.doctor.medicalRecords,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersRedux: () => {
      dispatch(actions.fetchAllUsersStart());
    },
    fetchDeleteUser: (id) => {
      dispatch(actions.deleteUser(id));
    },
    fetchRegisteredPatientByDate: (doctorId, date) => {
      dispatch(actions.fetchRegisteredPatientByDate(doctorId, date));
    },
    fetchExaminatedPatientByDate: (doctorId, date) => {
      dispatch(actions.fetchExaminatedPatientByDate(doctorId, date));
    },
    fetchPatientMedicalRecordsByDate: (date) => {
      dispatch(actions.fetchPatientMedicalRecordsByDate(date));
    },
    // fetchAllMedicine: (clinicId) =>
    // dispatch(actions.fetchAllMedicine(clinicId)),
    fetchMedicalRecordByBookingId: (bookingId) =>
      dispatch(actions.fetchMedicalRecordByBookingId(bookingId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
