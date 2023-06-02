import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import FormattedDate from "../../../components/Formating/FormattedDate";
import _, { result, times } from "lodash";
import { toast } from "react-toastify";
import {
  saveBulkScheduleDoctor,
  getSelectedScheduleFromDoctor,
} from "../../../services/userServices";
import ModalCancelSchedule from "./ModalCancelSchedule";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Calendar from "react-calendar";
import { C } from "@fullcalendar/core/internal-common";
const events = [];
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctocs: [],
      doctorWeekSchedules: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
      isSelectedSchedule: [],
      isOpenModalCanceSchedule: false,
      selectedItem: "",
      selectedButton: "",
      eventState: [],
      checker:0,
      arrDayofWeek:[]
    };
  }
  async componentDidMount() {
    await this.props.fetchAllDoctors();
    await this.props.fetchAllScheduleTime();
    await this.props.fetchAllScheduleForWeek(
      this.props.user.id,
      new Date().getTime()
    );
    let temp=[]
    for (var i = 1; i <= 7; i++) {
      let currentDate = moment().isoWeekday(i);
      temp.push(new Date(currentDate).toLocaleDateString());
    }
    this.setState({
      arrDayofWeek:temp
    })
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctocs: dataSelect,
        selectedDoctor: dataSelect[0],
      });
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
    if (prevProps.doctorWeekSchedules !== this.props.doctorWeekSchedules) {
      this.setState({
        eventState: [],
      });
      let { language } = this.props;
      let temp = [];
      let doctorWeekSchedules = await this.props.doctorWeekSchedules;
      doctorWeekSchedules.map((item) => {
        let object = {};
        let pick = new Date(item.picked_date);
        let tempDay = new Date(item.picked_date).getDay();
        object.title = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.start = tempDay;
        object.timetype = item.timetype;
        object.position = item.timetype.slice(1);
        object.isFullAppointment = item.isFullAppointment;
        object.isBooked = item.isBooked;
        temp.push(object);
      });
      this.setState({
        eventState: temp,
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
      let formatedDate = new Date(currentDate).getTime();
      if (selectedOption) {
        let res = await getSelectedScheduleFromDoctor(
          selectedOption.value,
          formatedDate.toString()
        );
        if (res && res.errCode === 0) {
          this.setState({
            isSelectedSchedule: res.data ? res.data : [],
          });
        }
        rangeTime.map((item) => {
          this.checkIsSelected(item);
          return item;
        });
        this.setState({
          rangeTime: rangeTime,
        });
      }
    }
  };
  checkIsSelected = (item) => {
    let { isSelectedSchedule } = this.state;
    if (isSelectedSchedule && isSelectedSchedule.length !== 0) {
      isSelectedSchedule?.nobooking.forEach((element) => {
        if (element.timetype === item.keyMap) {
          item.isSelected = true;
        }
      });
      isSelectedSchedule?.booked.forEach((element) => {
        if (element.timetype === item.keyMap) {
          item.isBooked = true;
        }
      });
      isSelectedSchedule?.full.forEach((element) => {
        if (element.timetype === item.keyMap) {
          item.isFullAppointment = true;
        }
      });
    }
  };
  getSelectedScheduleforDoctor = async () => {
    let { selectedDoctor, currentDate, rangeTime } = this.state;
    rangeTime.map((item) => {
      item.isSelected = false;
      item.isFullAppointment = false;
      item.isBooked = false;
      return item;
    });
    let formatedDate = new Date(currentDate).getTime();
    if (selectedDoctor) {
      let res = await getSelectedScheduleFromDoctor(
        selectedDoctor.value,
        formatedDate.toString()
      );
      console.log("schedule", res);
      if (res && res.errCode === 0) {
        this.setState({
          isSelectedSchedule: res.data ? res.data : [],
        });
      }
      rangeTime.map((item) => {
        this.checkIsSelected(item);
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleOnChangeDataPicker = async (date) => {
    console.log("onChangeDataPicker", date);
    this.setState({
      currentDate: date[0],
    });
    this.getSelectedScheduleforDoctor();
  };
  CheckCanceled = async (data) => {
    if (data === true) {
      await this.props.fetchAllScheduleForWeek(
        this.props.user.id,
        new Date().getTime()
      );
      let { selectedButton, rangeTime } = this.state;
      if (rangeTime && rangeTime.length > 0) {
        rangeTime = rangeTime.map((item) => {
          if (item.id === selectedButton.id) item.isSelected = !item.isSelected;
          return item;
        });
        this.setState({
          rangeTime: rangeTime,
        });
      }
    }
  };
  handleClickBtnTime = (time) => {
    let { rangeTime, isSelectedSchedule, currentDate } = this.state;
    if (currentDate === "") {
      toast.warning("You have to choose a date");
    } else {
      if (time.isSelected === true) {
        this.setState({
          isOpenModalCanceSchedule: true,
          selectedButton: time,
        });
        isSelectedSchedule?.nobooking.forEach((schedule) => {
          if (schedule.timetype === time.keyMap) {
            this.setState({
              selectedItem: schedule,
            });
          }
        });
      } else {
        if (rangeTime && rangeTime.length > 0) {
          rangeTime = rangeTime.map((item) => {
            if (item.id === time.id) item.isSelected = !item.isSelected;
            return item;
          });
          this.setState({
            rangeTime: rangeTime,
          });
        }
      }
    }
  };
  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Invalid date!");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected doctor!");
      return;
    }
    let formatedDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatedDate;
          object.timetype = schedule.keyMap;
          object.picked_date = formatedDate;
          result.push(object);
        });
      } else {
        toast.error("Bạn chưa chọn khung giờ");
        return;
      }
    }
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      date: formatedDate,
    });
    console.log("result: ", res);
    if (res && res.errCode === 0) {
      toast.success("Đăng ký lịch hẹn thành công");
      await this.props.fetchAllScheduleForWeek(
        this.props.user.id,
        new Date().getTime()
      );
    } else {
      toast.error("Lỗi đăng ký lịch hẹn");
    }
    this.getSelectedScheduleforDoctor();
  };
  toggleFromParent = () => {
    this.setState({
      isOpenModalCanceSchedule: !this.state.isOpenModalCanceSchedule,
    });
  };
  handleChangeWeeklySchedule = async (sign) => {
    let {checker}=this.state
    let result=checker+sign
    console.log(result,checker,sign)
    if(result<=1 && result >=-1)
    {
      this.setState({
        checker:result
      })
      let nextMonday = new Date();
      if(result===1)
      {
        nextMonday.setDate(nextMonday.getDate() + (((1 + 7 - nextMonday.getDay()) % 7) || 7));
        console.log(nextMonday)
        await this.props.fetchAllScheduleForWeek(
          this.props.user.id,
          nextMonday
        );
        let temp=[]
        for (var i = 1; i <= 7; i++) {
          let currentDate = moment(nextMonday).isoWeekday(i);
          temp.push(new Date(currentDate).toLocaleDateString());
        }
        this.setState({
          arrDayofWeek:temp
        })
      }
      if(result===0)
      {
        await this.props.fetchAllScheduleForWeek(
          this.props.user.id,
          nextMonday
        );
        let temp=[]
        for (var i = 1; i <= 7; i++) {
          let currentDate = moment().isoWeekday(i);
          temp.push(new Date(currentDate).toLocaleDateString());
        }
        this.setState({
          arrDayofWeek:temp
        })
      }
      if(result===-1)
      {
        nextMonday.setDate(nextMonday.getDate() - (nextMonday.getDay()+5%7+1));
        console.log(nextMonday)
        await this.props.fetchAllScheduleForWeek(
          this.props.user.id,
          nextMonday
        );
        let temp=[]
        for (var i = 1; i <= 7; i++) {
          let currentDate = moment(nextMonday).isoWeekday(i);
          temp.push(new Date(currentDate).toLocaleDateString());
        }
        this.setState({
          arrDayofWeek:temp
        })
      }
    }
    
  };
  render() {
    let { permission } = this.props;
    if (permission === "R3") {
      return <Redirect to="/home" />;
    }
    let { rangeTime,arrDayofWeek,isOpenModalCanceSchedule, selectedItem, eventState } =
      this.state;
    let { language, doctorWeekSchedules } = this.props;
    // let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    let mon = [];
    let tue = [];
    let wed = [];
    let thu = [];
    let fri = [];
    let sat = [];
    let sun = [];
    if (eventState && eventState.length > 0) {
      eventState.forEach((element) => {
        if (element.start && element.start === 6) {
          sat.push(element);
        }
        if (element.start && element.start === 1) {
          mon.push(element);
        }
        if (element.start && element.start === 2) {
          tue.push(element);
        }
        if (element.start && element.start === 3) {
          wed.push(element);
        }
        if (element.start && element.start === 4) {
          thu.push(element);
        }
        if (element.start && element.start === 5) {
          fri.push(element);
        }
        if (element.start === 0) {
          sun.push(element);
        }
      });
    }
    return (
      <div className="manage-schedule-container">
        <ModalCancelSchedule
          isOpen={isOpenModalCanceSchedule}
          toggleFromParent={this.toggleFromParent}
          selectedItem={selectedItem}
          CheckCanceled={this.CheckCanceled}
        />
        <div className="container-doctor-schedule">
          <div className="register-schedule">
            <div className="information">
              <div className="top-content">
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="manage-schedule.doctor-name" />
                  </label>

                  <input onClick={false} className="doctor-name"  value={this.state.selectedDoctor?.label}/>
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="manage-schedule.choose-date" />
                  </label>
                  <DatePicker
                    className="form-control picker-date"
                    onChange={this.handleOnChangeDataPicker}
                    value={this.state.currentDate}
                    minDate={new Date()}
                  />
                </div>
              </div>
              <div className="color-description">
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
              <div
                className="col-12"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => this.handleSaveSchedule()}
                  className="btn btn-primary btn-save-schedule"
                >
                  <FormattedMessage id="manage-schedule.save" />
                </button>
              </div>
            </div>
            <div className="schedule-information">
              <div className="col-12 pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        key={index}
                        className={
                          item.isSelected === true
                            ? "btn btn-schedule active"
                            : item.isBooked === true
                            ? "btn btn-schedule booked"
                            : item.isFullAppointment === true
                            ? "btn btn-schedule full"
                            : "btn btn-schedule"
                        }
                        disabled={
                          item.isBooked === true
                            ? true
                            : item.isFullAppointment === true
                            ? true
                            : false
                        }
                        onClick={() => this.handleClickBtnTime(item)}
                      >
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="time-table-container">
          <div className="btn-container">
              <button className="btn"
                onClick={() => this.handleChangeWeeklySchedule(-1)}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            </div>
            <div className="ExtraCalendar">
              <table
                cellspacing="0"
                cellpadding="0"
                className="extra-calendar-schedule"
                id="TableManageSchedule"
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
            <div className="btn-container">
              <button
                className="btn"
                onClick={() => this.handleChangeWeeklySchedule(+1)}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
    permission: state.user.permission,
    user: state.user.userInfo,
    doctorWeekSchedules: state.doctor.doctorWeekSchedules,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    fetchAllScheduleForWeek: (doctorId, date) =>
      dispatch(actions.fetchAllScheduleForWeek(doctorId, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
