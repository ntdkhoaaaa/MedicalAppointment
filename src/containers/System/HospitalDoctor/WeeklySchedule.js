import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import "./WeeklySchedule.scss";
import moment from "moment";
import * as actions from "../../../store/actions";
class WeeklySchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorWeekSchedules: [],
      rangeTime: [],
      eventState: [],
      arrDayofWeek:[],
      checker:0
    };
  }
  async componentDidMount() {
    let nextMonday = new Date();
    nextMonday.setDate(nextMonday.getDate() - nextMonday.getDay() + 1);
    await this.props.fetchSpecialtyDoctorScheduleForWeek(
      this.props.user.id,
      new Date()
    );
    await this.props.fetchAllScheduleTime();
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
    if (this.props.language !== prevProps.language) {
    }
    if (prevProps.doctorWeeklySchedule !== this.props.doctorWeeklySchedule) {
      this.setState({
        eventState: [],
      });
      let { language } = this.props;
      let temp = [];
      let doctorWeekSchedules = await this.props.doctorWeeklySchedule;
      doctorWeekSchedules.map((item) => {
        let object = {};
        let pick = new Date(Date.parse(item.picked_date));
        let tempDay = new Date(item.picked_date).getDay();
        console.log(tempDay,item.picked_date);
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
  }
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
        await this.props.fetchSpecialtyDoctorScheduleForWeek(
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
        await this.props.fetchSpecialtyDoctorScheduleForWeek(
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
        await this.props.fetchSpecialtyDoctorScheduleForWeek(
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
    let { rangeTime, eventState ,arrDayofWeek} = this.state;
    let mon = [];
    let tue = [];
    let wed = [];
    let thu = [];
    let fri = [];
    let sat = [];
    let sun = [];
    if (eventState && eventState.length > 0) {
      eventState.forEach((element) => {
        if (element.start === 6) {
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
        <div className="container">
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
          <div className="time-table-container">
            <div className="btn-container">
              <button className="btn"
                onClick={() => this.handleChangeWeeklySchedule(-1)}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            </div>
            <div className=" ExtraCalendar">
              <table
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
    language: state.app.language,
    doctorWeeklySchedule: state.hospitalDoctor.doctorWeeklySchedule,
    user: state.user.userInfo,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),

    fetchSpecialtyDoctorScheduleForWeek: (doctorId, date) =>
      dispatch(actions.fetchSpecialtyDoctorScheduleForWeek(doctorId, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeeklySchedule);
