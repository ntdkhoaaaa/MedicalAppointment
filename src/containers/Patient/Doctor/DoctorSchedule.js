import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import {
  getScheduleDoctorByDate,
  getScheduleDoctorByDateContainUserId,
} from "../../../services/userServices";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";
import {  withRouter,Route ,BrowserRouter as Router} from "react-router-dom";
import { toast } from "react-toastify";
import NotifyBookedModal from "./Modal/NotifyBookedModal";
import DetailDoctor from "./DetailDoctor";
class DoctorSchedule extends Component {
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
    let doctorId = this.props.doctorIdFromParent;
    if (!this.props.isLoggedIn) {
      let res = await getScheduleDoctorByDate(doctorId, arrDays[0].value);
      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    } else {
      let res = await getScheduleDoctorByDateContainUserId(
        doctorId,
        arrDays[0].value,
        this.props.user.id
      );
      console.log("check result", res);

      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  getArrDays = (language) => {
    let arrDate = [];
    for (let i = 1; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        object.label = this.capitalizeFirstLetter(labelVi);
        // }
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(object);
    }
    return arrDate;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    let { language } = this.props;

    if (this.props.language !== prevProps.language) {
      let arrDays = this.getArrDays(language);
      this.setState({ allDays: arrDays });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let doctorId = this.props.doctorIdFromParent;

      let arrDays = this.getArrDays(this.props.language);
      if (!this.props.isLoggedIn) {
        let res = await getScheduleDoctorByDate(doctorId, arrDays[0].value);
        if (res && res.errCode === 0) {
          this.setState({
            allAvailableTime: res.data ? res.data : [],
          });
        }
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      } else {
        let res = await getScheduleDoctorByDateContainUserId(
          doctorId,
          arrDays[0].value,
          this.props.user.id
        );
        if (res && res.errCode === 0) {
          this.setState({
            allAvailableTime: res.data ? res.data : [],
          });
        }
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
        console.log("check result", res);
      }
    }

  }
  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      if (!this.props.isLoggedIn) {
        let res = await getScheduleDoctorByDate(doctorId, date);
        if (res && res.errCode === 0) {
          this.setState({
            allAvailableTime: res.data ? res.data : [],
          });
        }
      } else {
        let res = await getScheduleDoctorByDateContainUserId(
          doctorId,
          date,
          this.props.user.id
        );
        if (res && res.errCode === 0) {
          this.setState({
            allAvailableTime: res.data ? res.data : [],
          });
        }
      }
    }
  };
  handleClickScheduleTime = (time) => {
    if (this.props.isLoggedIn) {
      if (time.bookedByThisUser) {
        toast.warning("Bạn đã đăng ký 1 lịch hẹn ở khung giờ này");
        this.setState({
          isNotifyBooked: true,
          dataScheduleTimeModal: time,
        });
      } else {
        this.setState({
          isOpenModalBooking: true,
          dataScheduleTimeModal: time,
        });
      }
    } else {
      this.props.history.push(`/login?redirect=%2Fdetail-doctor%2F${this.props.match.params.id}`);
      // <Route path="/login/:redirect?" component={DetailDoctor} />

    } 
  };
  closeBookingModal =async () => {
    this.setState({
      isOpenModalBooking: false,
    });
    let doctorId = this.props.doctorIdFromParent;
    let arrDays = this.getArrDays(this.props.language);
    let res = await getScheduleDoctorByDateContainUserId(
      doctorId,
      arrDays[0].value,
      this.props.user.id
    );
    if (res && res.errCode === 0) {
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
    this.setState({
      allAvailableTime: res.data ? res.data : [],
    });
    console.log("check result", res);
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
    //
    let {
      allDays,
      allAvailableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
      isNotifyBooked,
    } = this.state;
    let { language,doctorInfor } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
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
                          ? item.timetypeData.valueVi
                          : item.timetypeData.valueEn;
                      return (
                        <button
                          className={
                            language === LANGUAGES.VI &&
                            item.bookedByThisUser === true
                              ? "btn-vi booked"  
                              : item.bookedButFull===true ? "btn-vi fulled"
                              : language === LANGUAGES.EN &&
                                item.bookedByThisUser === true
                              ? "btn-en booked" : item.bookedButFull===true ? "btn-en fulled"
                              : language === LANGUAGES.VI
                              ? "btn-vi"
                              : "btn-en"
                          }
                          disabled={item.bookedButFull===true ? true : false}
                          key={index}
                          onClick={() => this.handleClickScheduleTime(item)}
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
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataTime={dataScheduleTimeModal}
          doctorInfor={doctorInfor}
        />
        <NotifyBookedModal
          isNotify={isNotifyBooked}
          closeNotification={this.closeNotification}
          openBooking={this.openBooking}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)
);
