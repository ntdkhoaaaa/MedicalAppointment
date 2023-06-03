import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import "./ManageClinicDoctorSchedules.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import _, { result, times } from "lodash";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Modal, ModalBody } from "reactstrap";
import ProfileUser from "../Doctor/ProfileUser";

class ManageClinicDoctorSchedules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctocs: [],
      doctorWeekSchedules: [],
      selectedDoctor: {},
      currentDate: new Date(),
      rangeTime: [],
      isSelectedSchedule: [],
      isOpenModalCanceSchedule: false,
      selectedItem: "",
      selectedButton: "",
      eventState: [],
      modalIsOpen: false,
      dataPatient: [],
    };
  }
  async componentDidMount() {
    await this.props.fetchAllDoctorsOfClinic({
      clinicId: this.props.userInfo.clinicId,
      specialtyCode: "All",
      positionCode: "All",
    });
    await this.props.fetchAllScheduleTime();

    await this.props.fetchAllScheduleForWeek(
      this.props?.clinicDoctors[0]?.doctorId,
      new Date().getTime()
    );
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({
          ...item,
          isSelected: false,
          isFullAppointment: false,
          isBooked: false,
        }));
      }
      this.setState({
        rangeTime: data,
      });
    }
    if (prevProps.clinicDoctors !== this.props.clinicDoctors) {
      let { clinicDoctors } = this.props;
      let dataSelect = this.buildDataInputSelect(clinicDoctors);
      console.log("dataSelect", dataSelect, clinicDoctors);
      this.setState({
        listDoctocs: dataSelect,
        selectedDoctor: dataSelect[0],
      });
    }
    if (prevProps.doctorWeekSchedules !== this.props.doctorWeekSchedules) {
      let { language } = this.props;
      let temp = [];
      let doctorWeekSchedules = await this.props.doctorWeekSchedules;
      doctorWeekSchedules.map((item) => {
        let object = {};
        let hour = new Date(Date.parse(item.picked_date));
        let tempDay = hour.getDay(item.valueVi[0]);
        object.title = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.start = tempDay;
        object.timetype = item.timetype;
        object.position = item.timetype.slice(1);
        object.isFullAppointment = item.isFullAppointment;
        object.isBooked = item.isBooked;
        object.date = item.date;
        temp.push(object);
      });
      this.setState({
        eventState: temp,
      });
    }
    if (prevProps.dataPatients !== this.props.dataPatients) {
      console.log(this.props.dataPatients);
      this.setState({
        dataPatient: this.props.dataPatients,
      });
    }
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  handleChange = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
    let { currentDate, rangeTime, isSelectedSchedule } = this.state;
    if (currentDate) {
      rangeTime.map((item) => {
        item.isSelected = false;
        return item;
      });
      if (selectedOption) {
        await this.props.fetchAllScheduleForWeek(
          selectedOption.value,
          currentDate
        );
      }
    }
  };
  handleOnChangeDataPicker = async (date) => {
    console.log("onChangeDataPicker", date);
    this.setState({
      currentDate: date[0],
    });
    await this.props.fetchAllScheduleForWeek(
      this.state.selectedDoctor.value,
      date[0].getTime()
    );
  };
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  checkData = async (data) => {
    console.log("checkData", data);
    let { selectedDoctor } = this.state;
    await this.props.fetchRegisteredPatientByDateAndTimeType(
      selectedDoctor.value,
      data.date,
      data.timetype
    );
    console.log(this.state.dataPatient);
    this.openModal();
  };
  render() {
    let { rangeTime, eventState, currentDate, dataPatient } = this.state;
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
    if (eventState && eventState.length > 0) {
      eventState.forEach((element) => {
        if (element.start === 1) {
          mon.push(element);
        }
        if (element.start === 2) {
          tue.push(element);
        }
        if (element.start === 3) {
          wed.push(element);
        }
        if (element.start === 4) {
          thu.push(element);
        }
        if (element.start === 5) {
          fri.push(element);
        }
        if (element.start === 6) {
          sat.push(element);
        }
        if (element.start === 0) {
          sun.push(element);
        }
      });
    }
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    let temporary={}
    if(dataPatient && dataPatient.length===1)
    {
      temporary=dataPatient[0];
    }
    console.log('temporary',dataPatient )
    return (
      <div className="manage-clinic-doctors-schedule">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctocs}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                className="form-control picker-date"
                onChange={this.handleOnChangeDataPicker}
                value={this.state.currentDate}
              />
            </div>
            <div className="color-description">
              <div className="color-active">
                <span className="summary-status-active">
                  <i className="fas fa-circle"></i> Lịch trống
                </span>
              </div>
              <div className="color-booked">
                <span className="summary-status-booked">
                  <i className="fas fa-circle"></i> Đã đặt
                </span>
              </div>
              <div className="color-full">
                <span className="summary-status-full">
                  <i className="fas fa-circle"></i> Đã kín
                </span>
              </div>
            </div>
            <div className="ExtraCalendar">
              <table
                id="TableManageSchedule"
                cellspacing="0"
                cellpadding="0"
                className="extra-calendar-schedule"
              >
                <tbody>
                  <tr>
                    <th></th>
                    <th>
                      <div>
                        Thứ 2
                        <div>
                          {arrDayofWeek &&
                            arrDayofWeek.length > 0 &&
                            arrDayofWeek[0]}
                        </div>
                      </div>
                    </th>
                    <th>
                      <div>
                        Thứ 3
                        <div>
                          {arrDayofWeek &&
                            arrDayofWeek.length > 0 &&
                            arrDayofWeek[1]}
                        </div>
                      </div>
                    </th>
                    <th>
                      <div>
                        Thứ 4
                        <div>
                          {arrDayofWeek &&
                            arrDayofWeek.length > 0 &&
                            arrDayofWeek[2]}
                        </div>
                      </div>
                    </th>
                    <th>
                      <div>
                        Thứ 5
                        <div>
                          {arrDayofWeek &&
                            arrDayofWeek.length > 0 &&
                            arrDayofWeek[3]}
                        </div>
                      </div>
                    </th>
                    <th>
                      <div>
                        Thứ 6
                        <div>
                          {arrDayofWeek &&
                            arrDayofWeek.length > 0 &&
                            arrDayofWeek[4]}
                        </div>
                      </div>
                    </th>
                    <th>
                      <div>
                        Thứ 7
                        <div>
                          {arrDayofWeek &&
                            arrDayofWeek.length > 0 &&
                            arrDayofWeek[5]}
                        </div>
                      </div>
                    </th>
                    <th>
                      <div>
                        Chủ Nhật
                        <div>
                          {arrDayofWeek &&
                            arrDayofWeek.length > 0 &&
                            arrDayofWeek[6]}
                        </div>
                      </div>
                    </th>
                  </tr>
                  {rangeTime &&
                    rangeTime.length > 0 &&
                    rangeTime.map((item, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <th>{item.valueVi}</th>
                            <td>
                              {mon &&
                                mon.length > 0 &&
                                mon.map((element) => {
                                  if (element.timetype === item.keyMap) {
                                    return (
                                      <div
                                        className={
                                          element.isFullAppointment === true
                                            ? "full-schedule schedule"
                                            : element.isBooked === true
                                            ? "booked-schedule schedule"
                                            : "schedule"
                                        }
                                        // onClick={()=>this.checkData(element)}
                                        onClick={() =>
                                          (element.isFullAppointment === true &&
                                            this.checkData(element)) ||
                                          (element.isBooked === true &&
                                            this.checkData(element))
                                        }
                                      >
                                        {element.title}
                                      </div>
                                    );
                                  } else {
                                    return;
                                  }
                                })}
                            </td>
                            <td>
                              {tue &&
                                tue.length > 0 &&
                                tue.map((element) => {
                                  if (element.timetype === item.keyMap) {
                                    return (
                                      <div
                                        className={
                                          element.isFullAppointment === true
                                            ? "full-schedule schedule"
                                            : element.isBooked === true
                                            ? "booked-schedule schedule"
                                            : "schedule"
                                        }
                                        onClick={() =>
                                          (element.isFullAppointment === true &&
                                            this.checkData(element)) ||
                                          (element.isBooked === true &&
                                            this.checkData(element))
                                        }
                                      >
                                        {element.title}
                                      </div>
                                    );
                                  } else {
                                    return;
                                  }
                                })}
                            </td>
                            <td>
                              {wed &&
                                wed.length > 0 &&
                                wed.map((element) => {
                                  if (element.timetype === item.keyMap) {
                                    return (
                                      <div
                                        className={
                                          element.isFullAppointment === true
                                            ? "full-schedule schedule"
                                            : element.isBooked === true
                                            ? "booked-schedule schedule"
                                            : "schedule"
                                        }
                                        onClick={() =>
                                          (element.isFullAppointment === true &&
                                            this.checkData(element)) ||
                                          (element.isBooked === true &&
                                            this.checkData(element))
                                        }
                                      >
                                        {element.title}
                                      </div>
                                    );
                                  } else {
                                    return;
                                  }
                                })}
                            </td>
                            <td>
                              {thu &&
                                thu.length > 0 &&
                                thu.map((element) => {
                                  if (element.timetype === item.keyMap) {
                                    return (
                                      <div
                                        className={
                                          element.isFullAppointment === true
                                            ? "full-schedule schedule"
                                            : element.isBooked === true
                                            ? "booked-schedule schedule"
                                            : "schedule"
                                        }
                                        onClick={() =>
                                          (element.isFullAppointment === true &&
                                            this.checkData(element)) ||
                                          (element.isBooked === true &&
                                            this.checkData(element))
                                        }
                                      >
                                        {element.title}
                                      </div>
                                    );
                                  } else {
                                    return;
                                  }
                                })}
                            </td>
                            <td>
                              {fri &&
                                fri.length > 0 &&
                                fri.map((element) => {
                                  if (element.timetype === item.keyMap) {
                                    return (
                                      <div
                                        className={
                                          element.isFullAppointment === true
                                            ? "full-schedule schedule"
                                            : element.isBooked === true
                                            ? "booked-schedule schedule"
                                            : "schedule"
                                        }
                                        onClick={() =>
                                          (element.isFullAppointment === true &&
                                            this.checkData(element)) ||
                                          (element.isBooked === true &&
                                            this.checkData(element))
                                        }
                                      >
                                        {element.title}
                                      </div>
                                    );
                                  } else {
                                    return;
                                  }
                                })}
                            </td>
                            <td>
                              {sat &&
                                sat.length > 0 &&
                                sat.map((element) => {
                                  if (element.timetype === item.keyMap) {
                                    return (
                                      <div
                                        className={
                                          element.isFullAppointment === true
                                            ? "full-schedule schedule"
                                            : element.isBooked === true
                                            ? "booked-schedule schedule"
                                            : "schedule"
                                        }
                                        onClick={() =>
                                          (element.isFullAppointment === true &&
                                            this.checkData(element)) ||
                                          (element.isBooked === true &&
                                            this.checkData(element))
                                        }
                                      >
                                        {element.title}
                                      </div>
                                    );
                                  } else {
                                    return;
                                  }
                                })}
                            </td>
                            <td>
                              {sun &&
                                sun.length > 0 &&
                                sun.map((element) => {
                                  if (element.timetype === item.keyMap) {
                                    return (
                                      <div
                                        className={
                                          element.isFullAppointment === true
                                            ? "full-schedule schedule"
                                            : element.isBooked === true
                                            ? "booked-schedule schedule"
                                            : "schedule"
                                        }
                                        onClick={() =>
                                          (element.isFullAppointment === true &&
                                            this.checkData(element)) ||
                                          (element.isBooked === true &&
                                            this.checkData(element))
                                        }
                                      >
                                        {element.title}
                                      </div>
                                    );
                                  } else {
                                    return;
                                  }
                                })}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          toggle={this.closeModal}
          contentLabel="Slider Modal"
          // size="lg"
          centered={true}
          className="slider-modal"
        >
          <ModalBody>
            {dataPatient && dataPatient.length > 1 ? (
              <Slider {...settings}>
                {dataPatient &&
                  dataPatient.map((item) => 
                  (
                    <div className="patient-infor">
                      <ProfileUser
                        patientId={item.patientId}
                        patientInformation={item}
                        fromAccountant={true}
                      />
                    </div>
                  ))}
              </Slider>
            ) : (
              <div className="patient-infor">
                <ProfileUser
                  patientId={temporary?.patientId}
                  patientInformation={temporary}
                  fromAccountant={true}
                />
              </div>
            )}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
    allScheduleTime: state.admin.allScheduleTime,
    clinicDoctors: state.clinicAccountant.clinicDoctors,
    doctorWeekSchedules: state.doctor.doctorWeekSchedules,
    dataPatients: state.doctor.dataPatients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsOfClinic: (data) =>
      dispatch(actions.fetchAllDoctorsOfClinic(data)),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    fetchAllScheduleForWeek: (doctorId, date) =>
      dispatch(actions.fetchAllScheduleForWeek(doctorId, date)),
    fetchRegisteredPatientByDateAndTimeType: (doctorId, date, timeType) => {
      dispatch(
        actions.fetchRegisteredPatientByDateAndTimeType(
          doctorId,
          date,
          timeType
        )
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageClinicDoctorSchedules);
