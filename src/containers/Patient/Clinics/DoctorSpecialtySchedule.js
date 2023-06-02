import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import * as actions from "../../../store/actions";
import BookingModal from "./../Doctor/Modal/BookingModal";
import "./DoctorSpecialtySchedule.scss";
import {  withRouter } from "react-router-dom";

class DoctorSpecialtySchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
      isNotifyBooked: false,
    };
  }
  async componentDidMount() {
    let { language } = this.props;
    let arrDays = this.getArrDays(language);
    if (arrDays && arrDays.length > 0) {
      this.setState({
        allDays: arrDays,
      });
    }
    console.log(this.props.clinicId, this.props.specialtyId);
    await this.props.fetchWeekSpecialtyScheduleClinic(
      this.props.clinicId,
      this.props.specialtyId
    );
    let day = new Date();
    day.setDate(day.getDate() + 1);
    if (this.props.specialtyWeekSchedules[day.getDay()]) {
      let converter = Object.entries(
        this.props.specialtyWeekSchedules[day.getDay()]
      );
      this.setState({
        allAvailableTime: converter,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let { language } = this.props;
    if (this.props.language !== prevProps.language) {
      let arrDays = this.getArrDays(language);
      this.setState({ allDays: arrDays });
    }
    if (
      this.props.specialtyWeekSchedules !== prevProps.specialtyWeekSchedules
    ) {
      let day = new Date().getDay();
      console.log(this.props.specialtyWeekSchedules);
      if (this.props.specialtyWeekSchedules[day]) {
        let converter = Object.entries(this.props.specialtyWeekSchedules[day]);
        this.setState({
          allAvailableTime: converter,
        });
      } else {
        this.setState({
          allAvailableTime: [],
        });
      }
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  getArrDays = (language) => {
    let arrDate = [];
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    console.log(currentDate);
    for (let i = 1; i <= 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        object.label = this.capitalizeFirstLetter(labelVi);
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      object.valueTi = new Date(currentDate).getDay();
      currentDate.setDate(currentDate.getDate() + 1);
      arrDate.push(object);
    }
    return arrDate;
  };
  handleOnChangeSelect = async (event, SpecialtySchedule) => {
    console.log(event.target.value);
    if (SpecialtySchedule[event.target.value]) {
      let converter = Object.entries(SpecialtySchedule[event.target.value]);
      console.log(converter);
      this.setState({
        allAvailableTime: converter,
      });
    } else {
      this.setState({
        allAvailableTime: [],
      });
    }
  };
  handleClickScheduleTime = (item, bookingInfor) => {
    if (this.props.isLoggedIn) {
      let object = {};
      object.date = item.date;
      object.bookingTimeVi = item.valueVi;
      object.bookingTimeEn = item.valueEn;
      object.bookingInfor = bookingInfor;
      this.setState({
        dataScheduleTimeModal: object,
        isOpenModalBooking: true,
      });
    } else {
      // this.props.history.push("/login");
      // /hospital-specialty/:id/:specialtyId
      this.props.history.push(`/login?redirect=%2Fhospital-specialty%2F${this.props.match.params.id}%2F${this.props.match.params.specialtyId}`);

    }
  };
  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  closeNotification = () => {
    this.setState({
      isNotifyBooked: false,
    });
  };
  openBooking = () => {
    this.setState({
      isOpenModalBooking: true,
      isNotifyBooked: false,
    });
  };
  render() {
    let {
      allDays,
      allAvailableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
    } = this.state;
    let { language } = this.props;
    let { name, nameEn, image } = this.props;
    return (
      <>
        <div className="doctor-specialty-schedule-container">
          <div className="all-schedule">
            <select
              onChange={(event) =>
                this.handleOnChangeSelect(
                  event,
                  this.props.specialtyWeekSchedules
                )
              }
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.valueTi}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <span>
                <i className="fas fa-calendar-alt"> </i>
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </div>
            <div className="time-contain">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <React.Fragment>
                  <div className="time-contain-button">
                    {allAvailableTime.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? item[1][0].valueVi
                          : item[1][0].valueEn;
                      console.log("timeDisplay", item);
                      return (
                        <button
                          className={
                            language === LANGUAGES.VI ? "btn-vi" : "btn-en"
                          }
                          key={index}
                          onClick={() =>
                            this.handleClickScheduleTime(item[1][0], item[1])
                          }
                        >
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>
                  <div className="book-free">
                    <span>
                      <FormattedMessage id="patient.detail-doctor.choose" />{" "}
                      <i className="far fa-hand-point-up"></i>{" "}
                      <FormattedMessage id="patient.detail-doctor.book" />
                    </span>
                  </div>
                </React.Fragment>
              ) : (
                <div className="unavailable">
                  <FormattedMessage id="patient.detail-doctor.unavailable" />{" "}
                </div>
              )}
            </div>
          </div>
          <BookingModal
            isOpenModal={isOpenModalBooking}
            closeBookingModal={this.closeBookingModal}
            dataTime={dataScheduleTimeModal}
            name={name}
            nameEn={nameEn}
            image={image}
            specialtyBooking={true}
            // fetchWeekSpecialtyScheduleClinic={this.props.fetchWeekSpecialtyScheduleClinic(
            //   this.props.clinicId,
            //   this.props.specialtyId
            // )}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    specialtyWeekSchedules: state.hospitalAccountant.specialtyWeekSchedules,
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWeekSpecialtyScheduleClinic: (clinicId, specialtyId) =>
      dispatch(actions.fetchWeekSpecialtyScheduleClinic(clinicId, specialtyId)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorSpecialtySchedule));
