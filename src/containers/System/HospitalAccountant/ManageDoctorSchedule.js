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
import Select from "react-select";
import { toast } from "react-toastify";
import moment from "moment";
import e from "cors";

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
      doctorForShow: [],
      arrSchedules: [],
      arrSchedulesForAfternoon: [],
      arrSchedulesForShow: [],
      arrSchedulesForAfternoonForShow: [],
      arrDayofWeekTimeStamp: [],
      arrDayofWeek: [],
      currentDate: new Date(),
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
    };
  }
  async componentDidMount() {
    await this.props.getPositionStart();
    await this.props.fetchAllSpecialtiesOfClinic(this.props.userInfo.clinicId);
    await this.props.fetchAllDoctorsOfHospital({
      clinicId: this.props.userInfo.clinicId,
    });
    let crr = new Date();
    crr.setHours(0);
    crr.setMinutes(0);
    crr.setSeconds(0);
    const dateCopy = new Date(crr.getTime());
    console.log("crr", crr);
    const nextMonday = new Date(
      dateCopy.setDate(
        dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7)
      )
    );
    await this.props.fetchClinicWeekSchedules(
      this.props.userInfo.clinicId,
      new Date()
    );
    await this.props.fetchClinicWeekSchedulesAfternoon(
      this.props.userInfo.clinicId,
      new Date()
    );
    let { arrDayofWeekTimeStamp, arrDayofWeek } = this.state;
    nextMonday.setDate(nextMonday.getDate() - nextMonday.getDay() + 1);
    for (var i = 1; i <= 7; i++) {
      nextMonday.setHours(0);
      nextMonday.setMinutes(0);
      nextMonday.setSeconds(0);
      let value = moment()
        .startOf("days")
        .isoWeekday(i + 7)
        .valueOf("day");
      console.log(
        moment()
          .startOf("days")
          .isoWeekday(i + 7)
          .valueOf()
      );
      arrDayofWeekTimeStamp.push(value);
      arrDayofWeek.push(new Date(nextMonday));
      nextMonday.setDate(nextMonday.getDate() + 1);
    }
    console.log(arrDayofWeekTimeStamp, arrDayofWeek);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (prevProps.clinicWeekSchedules !== this.props.clinicWeekSchedules) {
      let { clinicWeekSchedules } = this.props;
      console.log("clinicWeekSchedules", clinicWeekSchedules);
      let MondayArr = [];
      let TuesdayArr = [];
      let WednesdayArr = [];
      let ThursdayArr = [];
      let FridayArr = [];
      let SaturdayArr = [];
      let SundayArr = [];
      clinicWeekSchedules.forEach((element) => {
        let date = new Date(element.picked_date).getDay();
        console.log(date, element.picked_date);
        if (date === 1) {
          MondayArr.push(element);
        }
        if (date === 2) {
          TuesdayArr.push(element);
        }
        if (date === 3) {
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
      if (clinicWeekSchedules && clinicWeekSchedules.length > 0) {
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
    }
    if (
      prevProps.clinicWeekSchedulesAfternoon !==
      this.props.clinicWeekSchedulesAfternoon
    ) {
      let { clinicWeekSchedulesAfternoon } = this.props;
      console.log("clinicWeekSchedules", clinicWeekSchedulesAfternoon);
      let MondayArr = [];
      let TuesdayArr = [];
      let WednesdayArr = [];
      let ThursdayArr = [];
      let FridayArr = [];
      let SaturdayArr = [];
      let SundayArr = [];
      clinicWeekSchedulesAfternoon.forEach((element) => {
        let date = new Date(element.picked_date).getDay();
        console.log(date, element.picked_date);
        if (date === 1) {
          MondayArr.push(element);
        }
        if (date === 2) {
          TuesdayArr.push(element);
        }
        if (date === 3) {
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
      if (
        clinicWeekSchedulesAfternoon &&
        clinicWeekSchedulesAfternoon.length > 0
      ) {
        this.setState({
          MondayAfternoon: MondayArr,
          TuesdayAfternoon: TuesdayArr,
          WednesdayAfternoon: WednesdayArr,
          ThursdayAfternoon: ThursdayArr,
          FridayAfternoon: FridayArr,
          SaturdayAfternoon: SaturdayArr,
          SundayAfternoon: SundayArr,
        });
      }
    }
    if (prevProps.hospitalDoctors !== this.props.hospitalDoctors) {
      let { hospitalDoctors } = this.props;
      this.setState({
        doctorArr: hospitalDoctors,
        doctorForShow: hospitalDoctors,
      });
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
      this.setState({
        listSpecialty: listSpecialty,
        selectedSpecialty: listSpecialty[0],
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      console.log("Position", this.props.positionRedux);

      let arrPositions = this.buildDataInputSelect(
        this.props.positionRedux,
        "allcode"
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
  buildDataInputSelect = (inputData, text) => {
    let { language } = this.props;
    let result = [];
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
    } else {
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
  onColumnDrop(dropResult) {
    const scene = Object.assign({}, this.state.scene);
    scene.children = applyDrag(scene.children, dropResult);
    this.setState({
      scene,
    });
  }
  handleSaveBulkSchedules = async () => {
    let { arrSchedules } = this.state;
    let result = [];
    arrSchedules.map((item) => {
      let object = {};
      object.currentNumber = 0;
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
    this.setState({
      arrSchedules: [],
    });
  };
  handleSaveBulkSchedulesForAfternoon = async () => {
    let { arrSchedulesForAfternoon } = this.state;
    let result = [];
    arrSchedulesForAfternoon.map((item) => {
      let object = {};
      object.currentNumber = 0;
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
    this.setState({
      arrSchedulesForAfternoon: [],
    });
  };
  handleChange = async (selectedInfor, name) => {
    let { doctorArr } = this.state;
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedInfor;
    console.log(selectedInfor, name);
    this.setState({
      ...stateCopy,
    });
    if (name.name === "filterSpecialty") {
      if (selectedInfor.value !== "All") {
        let temp = doctorArr.filter(
          (e) => e.specialtyId === selectedInfor.value
        );

        let scheduleTemp = this.props.clinicWeekSchedules.filter(
          (e) => e.specialtyId === selectedInfor.value
        );
        let MondayArr = [];
        let TuesdayArr = [];
        let WednesdayArr = [];
        let ThursdayArr = [];
        let FridayArr = [];
        let SaturdayArr = [];
        let SundayArr = [];
        scheduleTemp.forEach((element) => {
          let date = new Date(element.picked_date).getDay();
          console.log(date, element.picked_date);
          if (date === 1) {
            MondayArr.push(element);
          }
          if (date === 2) {
            TuesdayArr.push(element);
          }
          if (date === 3) {
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
        this.setState({
          MondayMorning: MondayArr,
          TuesdayMorning: TuesdayArr,
          WednesdayMorning: WednesdayArr,
          ThursdayMorning: ThursdayArr,
          FridayMorning: FridayArr,
          SaturdayMorning: SaturdayArr,
          SundayMorning: SundayArr,
        });

        let scheduleTempForAfternoon =
          this.props.clinicWeekSchedulesAfternoon.filter(
            (e) => e.specialtyId === selectedInfor.value
          );
        let MondayArrAfternoon = [];
        let TuesdayArrAfternoon = [];
        let WednesdayArrAfternoon = [];
        let ThursdayArrAfternoon = [];
        let FridayArrAfternoon = [];
        let SaturdayArrAfternoon = [];
        let SundayArrAfternoon = [];
        scheduleTempForAfternoon.forEach((element) => {
          let date = new Date(element.picked_date).getDay();
          console.log(date, element.picked_date);
          if (date === 1) {
            MondayArrAfternoon.push(element);
          }
          if (date === 2) {
            TuesdayArrAfternoon.push(element);
          }
          if (date === 3) {
            WednesdayArrAfternoon.push(element);
          }
          if (date === 4) {
            ThursdayArrAfternoon.push(element);
          }
          if (date === 5) {
            FridayArrAfternoon.push(element);
          }
          if (date === 6) {
            SaturdayArrAfternoon.push(element);
          }
          if (date === 0) {
            SundayArrAfternoon.push(element);
          }
        });
        this.setState({
          MondayAfternoon: MondayArrAfternoon,
          TuesdayAfternoon: TuesdayArrAfternoon,
          WednesdayAfternoon: WednesdayArrAfternoon,
          ThursdayAfternoon: ThursdayArrAfternoon,
          FridayAfternoon: FridayArrAfternoon,
          SaturdayAfternoon: SaturdayArrAfternoon,
          SundayAfternoon: SundayArrAfternoon,
        });
        this.setState({
          doctorForShow: temp,
        });
      } else {
        this.setState({
          doctorForShow: doctorArr,
        });
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
          console.log(date, element.picked_date);
          if (date === 1) {
            MondayArr.push(element);
          }
          if (date === 2) {
            TuesdayArr.push(element);
          }
          if (date === 3) {
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
        this.setState({
          MondayMorning: MondayArr,
          TuesdayMorning: TuesdayArr,
          WednesdayMorning: WednesdayArr,
          ThursdayMorning: ThursdayArr,
          FridayMorning: FridayArr,
          SaturdayMorning: SaturdayArr,
          SundayMorning: SundayArr,
        });
        let { clinicWeekSchedulesAfternoon } = this.props;

        let MondayArrAfternoon = [];
        let TuesdayArrAfternoon = [];
        let WednesdayArrAfternoon = [];
        let ThursdayArrAfternoon = [];
        let FridayArrAfternoon = [];
        let SaturdayArrAfternoon = [];
        let SundayArrAfternoon = [];
        clinicWeekSchedulesAfternoon.forEach((element) => {
          let date = new Date(element.picked_date).getDay();
          console.log(date, element.picked_date);
          if (date === 1) {
            MondayArrAfternoon.push(element);
          }
          if (date === 2) {
            TuesdayArrAfternoon.push(element);
          }
          if (date === 3) {
            WednesdayArrAfternoon.push(element);
          }
          if (date === 4) {
            ThursdayArrAfternoon.push(element);
          }
          if (date === 5) {
            FridayArrAfternoon.push(element);
          }
          if (date === 6) {
            SaturdayArrAfternoon.push(element);
          }
          if (date === 0) {
            SundayArrAfternoon.push(element);
          }
        });
        this.setState({
          MondayAfternoon: MondayArrAfternoon,
          TuesdayAfternoon: TuesdayArrAfternoon,
          WednesdayAfternoon: WednesdayArrAfternoon,
          ThursdayAfternoon: ThursdayArrAfternoon,
          FridayAfternoon: FridayArrAfternoon,
          SaturdayAfternoon: SaturdayArrAfternoon,
          SundayAfternoon: SundayArrAfternoon,
        });
      }
    }
    if (name.name === "filterDegree") {
      let temp = doctorArr.filter((e) => e.positionId === selectedInfor.value);
      this.setState({
        doctorForShow: temp,
      });
    }
    // if(name.name==='All')
    // {
    //   this.setState({
    //     doctorForShow: doctorArr,
    //   });
    // }
  };
  render() {
    let { arrDayofWeekTimeStamp, arrDayofWeek, doctorForShow } = this.state;
    let dayofWeek = [];
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setMilliseconds(0);
    const dateCopy = new Date(today.getTime());

    const nextMonday = new Date(
      dateCopy.setDate(
        dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7)
      )
    );
    nextMonday.setDate(nextMonday.getDate() - nextMonday.getDay() + 1);
    for (var i = 0; i < 7; i++) {
      dayofWeek.push(new Date(nextMonday).toLocaleDateString());
      nextMonday.setDate(nextMonday.getDate() + 1);
    }
    return (
      <div className="schedule-container">
        <div className="morning">
          <div className="morning-schedule-with-filter">
            <div className="filter">
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
            <div className="doctors-container">
              <Container
                behaviour="copy"
                orientation="horizontal"
                groupName="1"
                autoScrollEnabled="true"
                getChildPayload={(i) => this.state.doctorForShow[i]}
                onDrop={(e) =>
                  this.setState({
                    doctorForShow: applyDrag(this.state.doctorForShow, e),
                  })
                }
              >
                {this.state.doctorForShow.map((item, i) => {
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

          <div className="table-time-morning">
            <span>Lịch hẹn buổi sáng</span>
            <div className="table-time-right">
              <div className="schedule">
                <div className="day-container">
                  <div className="day-title">
                    Thứ 2
                    <div>
                      {dayofWeek && dayofWeek.length > 0 && dayofWeek[0]}
                    </div>
                  </div>
                  <div className="schedule-day">
                    <Container
                      groupName="1"
                      getChildPayload={(i) => this.state.MondayMorning[i]}
                      removeOnDropOut={true}
                      onDrop={(e) => {
                        this.setState({
                          MondayMorning: applyDrag(
                            this.state.MondayMorning,
                            e,
                            0
                          ),
                          arrSchedules: applyDragForBackend(
                            this.state.arrSchedules,
                            e,
                            "TM",
                            arrDayofWeek,
                            0,
                            arrDayofWeekTimeStamp
                          ),
                        });
                      }}
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
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </div>
                <div className="day-container">
                  <div className="day-title">
                    Thứ 3
                    <div>
                      {dayofWeek && dayofWeek.length > 0 && dayofWeek[1]}
                    </div>
                  </div>
                  <div className="schedule-day">
                    <Container
                      groupName="1"
                      behaviour="contain"
                      removeOnDropOut={true}
                      getChildPayload={(i) => this.state.TuesdayMorning[i]}
                      onDrop={(e) => {
                        this.setState({
                          TuesdayMorning: applyDrag(
                            this.state.TuesdayMorning,
                            e,
                            1
                          ),
                          arrSchedules: applyDragForBackend(
                            this.state.arrSchedules,
                            e,
                            "TM",
                            arrDayofWeek,
                            1,
                            arrDayofWeekTimeStamp
                          ),
                        });
                      }}
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
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </div>
                <div className="day-container">
                  <div className="day-title">
                    Thứ 4
                    <div>
                      {dayofWeek && dayofWeek.length > 0 && dayofWeek[2]}
                    </div>
                  </div>
                  <div className="schedule-day">
                    <Container
                      groupName="1"
                      removeOnDropOut={true}
                      getChildPayload={(i) => this.state.WednesdayMorning[i]}
                      onDrop={(e) => {
                        if (e.payload?.checkedWedMor === true) {
                          toast.error("This user is already registered wed");
                        } else {
                          e.payload.checkedWedMor = false;
                          this.setState({
                            WednesdayMorning: applyDrag(
                              this.state.WednesdayMorning,
                              e,
                              2
                            ),
                            arrSchedules: applyDragForBackend(
                              this.state.arrSchedules,
                              e,
                              "TM",
                              arrDayofWeek,
                              2,
                              arrDayofWeekTimeStamp
                            ),
                          });
                        }
                      }}
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
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>
                              {/* <div className="extra-infor">
                                <div className="doctor-name">
                                  {" "}
                                  {item.lastName} {item.firstName}
                                </div>
                                <div className="doctor-specialty">
                                  {item.nameSpecialty}
                                </div>
                              </div> */}
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </div>
                <div className="day-container">
                  <div className="day-title">
                    Thứ 5
                    <div>
                      {dayofWeek && dayofWeek.length > 0 && dayofWeek[3]}
                    </div>
                  </div>
                  <div className="schedule-day">
                    <Container
                      // style={groupStyle}
                      groupName="1"
                      removeOnDropOut={true}
                      getChildPayload={(i) => this.state.ThursdayMorning[i]}
                      onDrop={(e) =>
                        this.setState({
                          ThursdayMorning: applyDrag(
                            this.state.ThursdayMorning,
                            e,
                            3
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
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </div>
                <div className="day-container">
                  <div className="day-title">
                    Thứ 6
                    <div>
                      {dayofWeek && dayofWeek.length > 0 && dayofWeek[4]}
                    </div>
                  </div>
                  <div className="schedule-day">
                    <Container
                      groupName="1"
                      removeOnDropOut={true}
                      getChildPayload={(i) => this.state.FridayMorning[i]}
                      onDrop={(e) =>
                        this.setState({
                          FridayMorning: applyDrag(
                            this.state.FridayMorning,
                            e,
                            4
                          ),
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
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </div>
                <div className="day-container">
                  <div className="day-title">
                    Thứ 7
                    <div>
                      {dayofWeek && dayofWeek.length > 0 && dayofWeek[5]}
                    </div>
                  </div>
                  <div className="schedule-day">
                    <Container
                      groupName="1"
                      removeOnDropOut={true}
                      getChildPayload={(i) => this.state.SaturdayMorning[i]}
                      onDrop={(e) => {
                        e.day = 6;
                        this.setState({
                          SaturdayMorning: applyDrag(
                            this.state.SaturdayMorning,
                            e,
                            5
                          ),
                          arrSchedules: applyDragForBackend(
                            this.state.arrSchedules,
                            e,
                            "TM",
                            arrDayofWeek,
                            5,
                            arrDayofWeekTimeStamp
                          ),
                        });
                      }}
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
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </div>
                <div className="day-container">
                  <div className="day-title">
                    Chủ nhật
                    <div>
                      {dayofWeek && dayofWeek.length > 0 && dayofWeek[6]}
                    </div>
                  </div>
                  <div className="schedule-day">
                    <Container
                      groupName="1"
                      removeOnDropOut={true}
                      getChildPayload={(i) => this.state.SundayMorning[i]}
                      onDrop={(e) =>
                        this.setState({
                          SundayMorning: applyDrag(
                            this.state.SundayMorning,
                            e,
                            6
                          ),
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
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </div>
              </div>

              <div className="button-container">
                <button
                  className="btn-save-schedules"
                  onClick={() => this.handleSaveBulkSchedules()}
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="afternoon">
          <div className="afternoon-schedule-with-filter">
            <div className="filter">
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
            <div className="doctors-container">
              <Container
                behaviour="copy"
                orientation="horizontal"
                groupName="2"
                autoScrollEnabled="true"
                getChildPayload={(i) => this.state.doctorForShow[i]}
                onDrop={(e) =>
                  this.setState({
                    doctorForShow: applyDrag(this.state.doctorForShow, e),
                  })
                }
              >
                {this.state.doctorForShow.map((item, i) => {
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
          <div className="table-time-afternoon">
            <span>Lịch hẹn buổi chiều</span>

            <div className="table-time-right">
              <div className="schedule">
                <div className="day-container">
                  <div className="day-title">
                    Thứ 2
                    <div>
                      {dayofWeek && dayofWeek.length > 0 && dayofWeek[0]}
                    </div>
                  </div>
                  <div className="schedule-day">
                    <Container
                      groupName="2"
                      removeOnDropOut={true}
                      getChildPayload={(i) => this.state.MondayAfternoon[i]}
                      onDrop={(e) =>
                        this.setState({
                          MondayAfternoon: applyDrag(
                            this.state.MondayAfternoon,
                            e
                          ),
                          arrSchedulesForAfternoon: applyDragForBackend(
                            this.state.arrSchedulesForAfternoon,
                            e,
                            "TA",
                            arrDayofWeek,
                            0,
                            arrDayofWeekTimeStamp
                          ),
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
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </div>
                <div className="day-container">
                  <div className="day-title">
                    Thứ 3
                    <div>
                      {dayofWeek && dayofWeek.length > 0 && dayofWeek[1]}
                    </div>
                  </div>

                  <div className="schedule-day">
                    <Container
                      groupName="2"
                      removeOnDropOut={true}
                      getChildPayload={(i) => this.state.TuesdayAfternoon[i]}
                      onDrop={(e) =>
                        this.setState({
                          TuesdayAfternoon: applyDrag(
                            this.state.TuesdayAfternoon,
                            e
                          ),
                          arrSchedulesForAfternoon: applyDragForBackend(
                            this.state.arrSchedulesForAfternoon,
                            e,
                            "TA",
                            arrDayofWeek,
                            1,
                            arrDayofWeekTimeStamp
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
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </div>
                <div className="day-container">
                  <div className="day-title">
                    Thứ 4
                    <div>
                      {dayofWeek && dayofWeek.length > 0 && dayofWeek[2]}
                    </div>
                  </div>
                  <div className="schedule-day">
                    <Container
                      // style={groupStyle}
                      groupName="2"
                      removeOnDropOut={true}
                      getChildPayload={(i) => this.state.WednesdayAfternoon[i]}
                      onDrop={(e) =>
                        this.setState({
                          WednesdayAfternoon: applyDrag(
                            this.state.WednesdayAfternoon,
                            e
                          ),
                          arrSchedulesForAfternoon: applyDragForBackend(
                            this.state.arrSchedulesForAfternoon,
                            e,
                            "TA",
                            arrDayofWeek,
                            2,
                            arrDayofWeekTimeStamp
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
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </div>
                <div className="day-container">
                  <div className="day-title">
                    Thứ 5
                    <div>
                      {dayofWeek && dayofWeek.length > 0 && dayofWeek[3]}
                    </div>
                  </div>
                  <div className="schedule-day">
                    <Container
                      // style={groupStyle}
                      groupName="2"
                      removeOnDropOut={true}
                      getChildPayload={(i) => this.state.ThursdayAfternoon[i]}
                      onDrop={(e) =>
                        this.setState({
                          ThursdayAfternoon: applyDrag(
                            this.state.ThursdayAfternoon,
                            e
                          ),
                          arrSchedulesForAfternoon: applyDragForBackend(
                            this.state.arrSchedulesForAfternoon,
                            e,
                            "TA",
                            arrDayofWeek,
                            3,
                            arrDayofWeekTimeStamp
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
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </div>
                <div className="day-container">
                  <div className="day-title">
                    Thứ 6
                    <div>
                      {dayofWeek && dayofWeek.length > 0 && dayofWeek[4]}
                    </div>
                  </div>
                  <div className="schedule-day">
                    <Container
                      // style={groupStyle}
                      groupName="2"
                      removeOnDropOut={true}
                      getChildPayload={(i) => this.state.FridayAfternoon[i]}
                      onDrop={(e) =>
                        this.setState({
                          FridayAfternoon: applyDrag(
                            this.state.FridayAfternoon,
                            e
                          ),
                          arrSchedulesForAfternoon: applyDragForBackend(
                            this.state.arrSchedulesForAfternoon,
                            e,
                            "TA",
                            arrDayofWeek,
                            4,
                            arrDayofWeekTimeStamp
                          ),
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
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </div>
                <div className="day-container">
                  <div className="day-title">
                    Thứ 7
                    <div>
                      {dayofWeek && dayofWeek.length > 0 && dayofWeek[5]}
                    </div>
                  </div>
                  <div className="schedule-day">
                    <Container
                      // style={groupStyle}
                      groupName="2"
                      removeOnDropOut={true}
                      getChildPayload={(i) => this.state.SaturdayAfternoon[i]}
                      onDrop={(e) =>
                        this.setState({
                          SaturdayAfternoon: applyDrag(
                            this.state.SaturdayAfternoon,
                            e
                          ),
                          arrSchedulesForAfternoon: applyDragForBackend(
                            this.state.arrSchedulesForAfternoon,
                            e,
                            "TA",
                            arrDayofWeek,
                            5,
                            arrDayofWeekTimeStamp
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
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </div>
                <div className="day-container">
                  <div className="day-title">
                    Chủ nhật
                    <div>
                      {dayofWeek && dayofWeek.length > 0 && dayofWeek[6]}
                    </div>
                  </div>
                  <div className="schedule-day">
                    <Container
                      groupName="2"
                      removeOnDropOut={true}
                      getChildPayload={(i) => this.state.SundayAfternoon[i]}
                      onDrop={(e) =>
                        this.setState({
                          SundayAfternoon: applyDrag(
                            this.state.SundayAfternoon,
                            e
                          ),
                          arrSchedulesForAfternoon: applyDragForBackend(
                            this.state.arrSchedulesForAfternoon,
                            e,
                            "TA",
                            arrDayofWeek,
                            6,
                            arrDayofWeekTimeStamp
                          ),
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
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              ></div>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <button
                  className="btn-save-schedules"
                  onClick={() => this.handleSaveBulkSchedulesForAfternoon()}
                >
                  Lưu
                </button>
              </div>
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
    userInfo: state.user.userInfo,
    positionRedux: state.admin.position,
    clinicSpecialties: state.clinicAccountant.clinicSpecialties,
    clinicWeekSchedules: state.clinicAccountant.clinicWeekSchedules,
    clinicWeekSchedulesAfternoon:
      state.clinicAccountant.clinicWeekSchedulesAfternoon,
    hospitalDoctors: state.clinicAccountant.hospitalDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchAllDoctorsOfClinic: (clinicId, specialtyId, positionId) =>
    //   dispatch(
    //     actions.fetchAllDoctorsOfClinic(clinicId, specialtyId, positionId)
    //   ),
    fetchAllSpecialtiesOfClinic: (data) =>
      dispatch(actions.fetchAllSpecialtiesOfClinic(data)),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    SaveBulkScheduleForClinic: (data) =>
      dispatch(actions.SaveBulkScheduleForClinic(data)),
    fetchClinicWeekSchedules: (clinicId, date, type) =>
      dispatch(actions.fetchClinicWeekSchedules(clinicId, date, type)),
    fetchClinicWeekSchedulesAfternoon: (clinicId, date) =>
      dispatch(actions.fetchClinicWeekSchedulesAfternoon(clinicId, date)),
    fetchAllDoctorsOfHospital: (data) =>
      dispatch(actions.fetchAllDoctorsOfHospital(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageDoctorSchedule);
