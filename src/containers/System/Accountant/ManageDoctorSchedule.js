import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./ManageDoctorSchedule.scss";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, applyDragForBackend } from "../../../utils/DragUtil";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
class ManageDoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MondayMorning: [],
      TuesdayMorning: [],
      WednesdayMorning: [],
      ThursdayMorning: [],
      FridayMorning: [],
      SaturdayMorning: [],
      SundayMorning: [],
      MondayAfternoon: [],
      TuesdayAfternoon: [],
      WednesdayAfternoon: [],
      ThursdayAfternoon: [],
      FridayAfternoon: [],
      SaturdayAfternoon: [],
      SundayAfternoon: [],
      doctorArr: [],
      arrSchedules: [],
      arrDayofWeekTimeStamp: [],
      arrDayofWeek: [],
      maxDate: "",
      minDate: "",
      currentDate: new Date(),
    };
  }
  async componentDidMount() {
    // let {arrDayofWeekTimeStamp,currentDate}=this.state
    this.props.fetchAllDoctorsOfClinic(
      this.props.userInfo.clinicId,
      "All",
      "All"
    );
    let crr = new Date();
    crr.setHours(0);
    crr.setMinutes(0);
    crr.setMilliseconds(0);
    this.props.fetchClinicWeekSchedules(
      this.props.userInfo.clinicId,
      crr.getTime() / 1000
    );
    // console.log(new Date());
    let { currentDate, minDate, maxDate, arrDayofWeekTimeStamp, arrDayofWeek } =
      this.state;
    // currentDate.setHours(0)
    // currentDate.setMinutes(0)
    // currentDate.setMilliseconds(0)
    this.setState({
      minDate: new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay())
      ),
      maxDate: new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)
      ),
    });
    currentDate.setDate(currentDate.getDate() - currentDate.getDay());
    for (var i = 0; i < 7; i++) {
      arrDayofWeekTimeStamp.push(new Date(currentDate).getTime() / 1000);
      arrDayofWeek.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    // console.log(arrDayofWeekTimeStamp,arrDayofWeek);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (prevProps.clinicWeekSchedules !== this.props.clinicWeekSchedules) {
      // let {
      //   MondayMorning,
      //   TuesdayMorning,
      //   WednesdayMorning,
      //   ThursdayMorning,
      //   FridayMorning,
      //   SaturdayMorning,
      //   SundayMorning,
      // } = this.state;
      let { clinicWeekSchedules } = this.props;
      let MondayArr = [];
      let TuesdayArr = [];
      let WednesdayArr = [];
      let ThursdayArr = [];
      let FridayArr = [];
      let SaturdayArr = [];
      let SundayArr = [];
      clinicWeekSchedules.forEach((element) => {
        let date = new Date(element.picked_date).getDay();
        // console.log(date);
        if (date === 1) {
          MondayArr.push(element);
        }
        if (date === 2) {
          TuesdayArr.push(element);
        }
        if (date ===3) {
          WednesdayArr.push(element);
        }
        if (date === 4) {
          ThursdayArr.push(element);
        }
        if (date === 5) {
          FridayArr.push(element);
        }
        if (date === 6) {
          SaturdayArr.push(element);
        }
        if (date === 0) {
          SundayArr.push(element);
        }
      });
      // console.log(MondayArr);
      this.setState({
        MondayMorning: MondayArr,
        TuesdayMorning: TuesdayArr,
        WednesdayMorning: WednesdayArr,
        ThursdayMorning: ThursdayArr,
        FridayMorning: FridayArr,
        SaturdayMorning: SaturdayArr,
        SundayMorning: SundayArr,
      });
    }
    if (prevProps.clinicDoctors !== this.props.clinicDoctors) {
      let { clinicDoctors } = this.props;
      this.setState({
        doctorArr: clinicDoctors,
      });
    }
  }
  onColumnDrop(dropResult) {
    const scene = Object.assign({}, this.state.scene);
    scene.children = applyDrag(scene.children, dropResult);
    this.setState({
      scene,
    });
  }
  handleSaveBulkSchedules = async () => {
    console.log('before',this.state.arrSchedules);
    let { arrSchedules } = this.state;
    let result = [];
    arrSchedules.map((item) => {
      let object = {};
      object.currentNumber = "";
      object.maxNumber = item.count;
      object.date = item.date;
      object.timetype = item.timetype;
      object.doctorId = item.doctorId;
      object.picked_date = item.picked_date;
      object.specialtyId = item.specialtyId;
      object.clinicId = item.clinicId;
      result.push(object);
    });
    let data = {
      clinicId: this.props.userInfo.clinicId,
      arrSchedule: result,
    };
    await this.props.SaveBulkScheduleForClinic(data);
  };
  render() {
    let { minDate, maxDate, arrDayofWeekTimeStamp, arrDayofWeek } = this.state;
    const selectionRange = {
      startDate: minDate,
      endDate: maxDate,
      key: "selection",
    };
    return (
      <div className="schedule-container">
        <div className="list-doctor-title">DANH SACH BAC SI</div>
        <DateRange
          showSelectionPreview={false}
          showMonthAndYearPickers={false}
          ranges={[selectionRange]}
        />
        <div className="doctors-container">
          <Container
            behaviour="copy"
            orientation="horizontal"
            groupName="1"
            getChildPayload={(i) => this.state.doctorArr[i]}
            onDrop={(e) =>
              this.setState({ doctorArr: applyDrag(this.state.doctorArr, e) })
            }
          >
            {this.state.doctorArr.map((item, i) => {
              return (
                <Draggable key={i}>
                  <div className="grid-item">
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
                    </div>
                  </div>
                </Draggable>
              );
            })}
          </Container>
        </div>
        <div className="table-title">THỜI GIAN BIỂU</div>
        <div className="table-time-morning">
          <div className="table-time-left">Sáng</div>
          <div className="table-time-right">
            <div className="day-container">
              <div className="day-title">Thứ 2</div>
              <div className="schedule-day">
                <Container
                  // style={groupStyle}
                  groupName="1"
                  getChildPayload={(i) => this.state.MondayMorning[i]}
                  onDrop={(e) =>
                    this.setState({
                      MondayMorning: applyDrag(this.state.MondayMorning, e),
                      arrSchedules: applyDragForBackend(
                        this.state.arrSchedules,
                        e,
                        "TM",
                        arrDayofWeek,
                        1,
                        arrDayofWeekTimeStamp
                      ),
                    })
                  }
                >
                  {this.state.MondayMorning.map((item, i) => {
                    return (
                      <Draggable key={i}>
                        <div className="grid-item">
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
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </div>
            <div className="day-container">
              <div className="day-title">Thứ 3</div>
              <div className="schedule-day">
                <Container
                  // style={groupStyle}
                  groupName="1"
                  getChildPayload={(i) => this.state.TuesdayMorning[i]}
                  onDrop={(e) =>
                    this.setState({
                      TuesdayMorning: applyDrag(this.state.TuesdayMorning, e),
                      arrSchedules: applyDragForBackend(
                        this.state.arrSchedules,
                        e,
                        "TM",
                        arrDayofWeek,
                        2,
                        arrDayofWeekTimeStamp
                      ),
                    })
                  }
                >
                  {this.state.TuesdayMorning.map((item, i) => {
                    return (
                      <Draggable key={i}>
                        <div className="grid-item">
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
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </div>
            <div className="day-container">
              <div className="day-title">Thứ 4</div>
              <div className="schedule-day">
                <Container
                  // style={groupStyle}
                  groupName="1"
                  getChildPayload={(i) => this.state.WednesdayMorning[i]}
                  onDrop={(e) =>
                    this.setState({
                      WednesdayMorning: applyDrag(
                        this.state.WednesdayMorning,
                        e
                      ),
                      arrSchedules: applyDragForBackend(
                        this.state.arrSchedules,
                        e,
                        "TM",
                        arrDayofWeek,
                        3,
                        arrDayofWeekTimeStamp
                      ),
                    })
                  }
                >
                  {this.state.WednesdayMorning.map((item, i) => {
                    return (
                      <Draggable key={i}>
                        <div className="grid-item">
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
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </div>
            <div className="day-container">
              <div className="day-title">Thứ 5</div>
              <div className="schedule-day">
                <Container
                  // style={groupStyle}
                  groupName="1"
                  getChildPayload={(i) => this.state.ThursdayMorning[i]}
                  onDrop={(e) =>
                    this.setState({
                      ThursdayMorning: applyDrag(this.state.ThursdayMorning, e),
                      arrSchedules: applyDragForBackend(
                        this.state.arrSchedules,
                        e,
                        "TM",
                        arrDayofWeek,
                        4,
                        arrDayofWeekTimeStamp
                      ),
                    })
                  }
                >
                  {this.state.ThursdayMorning.map((item, i) => {
                    return (
                      <Draggable key={i}>
                        <div className="grid-item">
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
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </div>
            <div className="day-container">
              <div className="day-title">Thứ 6</div>
              <div className="schedule-day">
                <Container
                  // style={groupStyle}
                  groupName="1"
                  getChildPayload={(i) => this.state.FridayMorning[i]}
                  onDrop={(e) =>
                    this.setState({
                      FridayMorning: applyDrag(this.state.FridayMorning, e),
                      arrSchedules: applyDragForBackend(
                        this.state.arrSchedules,
                        e,
                        "TM",
                        arrDayofWeek,
                        5,
                        arrDayofWeekTimeStamp
                      ),
                    })
                  }
                >
                  {this.state.FridayMorning.map((item, i) => {
                    return (
                      <Draggable key={i}>
                        <div className="grid-item">
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
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </div>
            <div className="day-container">
              <div className="day-title">Thứ 7</div>
              <div className="schedule-day">
                <Container
                  // style={groupStyle}
                  groupName="1"
                  getChildPayload={(i) => this.state.SaturdayMorning[i]}
                  onDrop={(e) =>
                    this.setState({
                      SaturdayMorning: applyDrag(this.state.SaturdayMorning, e),
                      arrSchedules: applyDragForBackend(
                        this.state.arrSchedules,
                        e,
                        "TM",
                        arrDayofWeek,
                        6,
                        arrDayofWeekTimeStamp
                      ),
                    })
                  }
                >
                  {this.state.SaturdayMorning.map((item, i) => {
                    return (
                      <Draggable key={i}>
                        <div className="grid-item">
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
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </div>
            <div className="day-container">
              <div className="day-title">Chủ nhật</div>
              <div className="schedule-day">
                <Container
                  // style={groupStyle}
                  groupName="1"
                  getChildPayload={(i) => this.state.SundayMorning[i]}
                  onDrop={(e) =>
                    this.setState({
                      SundayMorning: applyDrag(this.state.SundayMorning, e),
                      arrSchedules: applyDragForBackend(
                        this.state.arrSchedules,
                        e,
                        "TM",
                        arrDayofWeek,
                        0,
                        arrDayofWeekTimeStamp
                      ),
                    })
                  }
                >
                  {this.state.SundayMorning.map((item, i) => {
                    return (
                      <Draggable key={i}>
                        <div className="grid-item">
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
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </div>
          </div>
        </div>
        <div className="table-time-afternoon">
          <div className="table-time-left">Chiều</div>
          <div className="table-time-right">
            <div className="day-container">
              <div className="day-title">Thứ 2</div>
              <div className="schedule-day">
                <Container
                  // style={groupStyle}
                  groupName="1"
                  getChildPayload={(i) => this.state.MondayAfternoon[i]}
                  onDrop={(e) =>
                    this.setState({
                      MondayAfternoon: applyDrag(this.state.MondayAfternoon, e),
                    })
                  }
                >
                  {this.state.MondayAfternoon.map((item, i) => {
                    return (
                      <Draggable key={i}>
                        <div className="grid-item">
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
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </div>
            <div className="day-container">
              <div className="day-title">Thứ 3</div>
              <div className="schedule-day">
                <Container
                  // style={groupStyle}
                  groupName="1"
                  getChildPayload={(i) => this.state.TuesdayAfternoon[i]}
                  onDrop={(e) =>
                    this.setState({
                      TuesdayAfternoon: applyDrag(
                        this.state.TuesdayAfternoon,
                        e
                      ),
                    })
                  }
                >
                  {this.state.TuesdayAfternoon.map((item, i) => {
                    return (
                      <Draggable key={i}>
                        <div className="grid-item">
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
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </div>
            <div className="day-container">
              <div className="day-title">Thứ 4</div>
              <div className="schedule-day">
                <Container
                  // style={groupStyle}
                  groupName="1"
                  getChildPayload={(i) => this.state.WednesdayAfternoon[i]}
                  onDrop={(e) =>
                    this.setState({
                      WednesdayAfternoon: applyDrag(
                        this.state.WednesdayAfternoon,
                        e
                      ),
                    })
                  }
                >
                  {this.state.WednesdayAfternoon.map((item, i) => {
                    return (
                      <Draggable key={i}>
                        <div className="grid-item">
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
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </div>
            <div className="day-container">
              <div className="day-title">Thứ 5</div>
              <div className="schedule-day">
                <Container
                  // style={groupStyle}
                  groupName="1"
                  getChildPayload={(i) => this.state.ThursdayAfternoon[i]}
                  onDrop={(e) =>
                    this.setState({
                      ThursdayAfternoon: applyDrag(
                        this.state.ThursdayAfternoon,
                        e
                      ),
                    })
                  }
                >
                  {this.state.ThursdayAfternoon.map((item, i) => {
                    return (
                      <Draggable key={i}>
                        <div className="grid-item">
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
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </div>
            <div className="day-container">
              <div className="day-title">Thứ 6</div>
              <div className="schedule-day">
                <Container
                  // style={groupStyle}
                  groupName="1"
                  getChildPayload={(i) => this.state.FridayAfternoon[i]}
                  onDrop={(e) =>
                    this.setState({
                      FridayAfternoon: applyDrag(this.state.FridayAfternoon, e),
                    })
                  }
                >
                  {this.state.FridayAfternoon.map((item, i) => {
                    return (
                      <Draggable key={i}>
                        <div className="grid-item">
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
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </div>
            <div className="day-container">
              <div className="day-title">Thứ 7</div>
              <div className="schedule-day">
                <Container
                  // style={groupStyle}
                  groupName="1"
                  getChildPayload={(i) => this.state.SaturdayAfternoon[i]}
                  onDrop={(e) =>
                    this.setState({
                      SaturdayAfternoon: applyDrag(
                        this.state.SaturdayAfternoon,
                        e
                      ),
                    })
                  }
                >
                  {this.state.SaturdayAfternoon.map((item, i) => {
                    return (
                      <Draggable key={i}>
                        <div className="grid-item">
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
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </div>
            <div className="day-container">
              <div className="day-title">Chủ nhật</div>
              <div className="schedule-day">
                <Container
                  // style={groupStyle}
                  groupName="1"
                  getChildPayload={(i) => this.state.SundayAfternoon[i]}
                  onDrop={(e) =>
                    this.setState({
                      SundayAfternoon: applyDrag(this.state.SundayAfternoon, e),
                    })
                  }
                >
                  {this.state.SundayAfternoon.map((item, i) => {
                    return (
                      <Draggable key={i}>
                        <div className="grid-item">
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
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn-save-schedules"
          onClick={() => this.handleSaveBulkSchedules()}
        >
          Lưu
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
    clinicDoctors: state.clinicAccountant.clinicDoctors,
    clinicWeekSchedules: state.clinicAccountant.clinicWeekSchedules,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsOfClinic: (clinicId, specialtyId, positionId) =>
      dispatch(
        actions.fetchAllDoctorsOfClinic(clinicId, specialtyId, positionId)
      ),
    SaveBulkScheduleForClinic: (data) =>
      dispatch(actions.SaveBulkScheduleForClinic(data)),
    fetchClinicWeekSchedules: (clinicId, date) =>
      dispatch(actions.fetchClinicWeekSchedules(clinicId, date)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageDoctorSchedule);
