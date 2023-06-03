import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import ReactApexChart from "react-apexcharts";
import DatePicker from "../../../components/Input/DatePicker";
import "./StatisticalPage.scss";
import * as actions from "../../../store/actions";
import moment from "moment/moment";
import Select from "react-select";

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: moment().endOf("month").valueOf(),
      startDate: moment().startOf("month").valueOf(),
      options_specialty: {
        // Define your chart options here
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [],
          axisBorder: {
            show: true,
            color: "#999",
            height: 1,
            width: "100%",
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            color: "#999",
            height: 6,
            width: "100%",
            offsetX: 0,
            offsetY: 0,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: '30%', // Adjust the column width as desired
          }
        },
        yaxis: {
          labels: {
            show: true,
            formatter: function(value) {
              return parseInt(value, 10).toString();
            },
            minWidth: 0,
            maxWidth: 80,
            style: {
              fontSize: "12px",
              fontFamily: "Arial, sans-serif",
              fontWeight: 400,
              cssClass: "y-axis-labels",
            },
          },
        },
      },
      listSpecialty: [],
      series_doctor: [],
      selectedSpecialty: {},

      options_doctor: {
        // Define your chart options here
        chart: {
          id: "doctor-bar",
        },
        xaxis: {
          categories: [],
          axisBorder: {
            show: true,
            color: "#999",
            height: 1,
            width: "100%",
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            color: "#999",
            height: 6,
            width: "100%",
            offsetX: 0,
            offsetY: 0,
          },
        },

        yaxis: {
          
          labels: {
            formatter: function(value) {
              return parseInt(value, 10).toString();
            },
            show: true,
            minWidth: 0,
            maxWidth: 80,
            style: {
              fontSize: "12px",
              fontFamily: "Arial, sans-serif",
              fontWeight: 400,
              cssClass: "y-axis-labels",
            },
          },
        },

      },
      series_specialty: [],
      totalAppointment: 0,
    };
  }
  async componentDidMount() {
    let { startDate, endDate } = this.state;
    await this.props.fetchAllSpecialtiesOfClinic(this.props.userInfo?.clinicId);
    await this.props.fetchStatisticalForHospitalSpecialty({
      hospitalId: this.props.userInfo.clinicId,
      startDate: startDate,
      endDate: endDate,
    });
    // fetchStatisticalForDoctorHospitalSpecialty({
    //   hospitalId: this.props.userInfo.clinicId,
    //   startDate: startDate,
    //   endDate: endDate,
    // })
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (prevProps.clinicSpecialties !== this.props.clinicSpecialties) {
      let listSpecialty = this.buildDataInputSelect(
        this.props.clinicSpecialties,
        ""
      );
      console.log(listSpecialty);
      this.setState({
        listSpecialty: listSpecialty,
        selectedSpecialty: listSpecialty[0],
      });
      let { startDate, endDate } = this.state;

      await this.props.fetchStatisticalForDoctorHospitalSpecialty({
        hospitalId: this.props.userInfo.clinicId,
        specialtyId: listSpecialty[0].value,
        startDate: startDate,
        endDate: endDate,
      });
    }
    if (
      prevProps.statisticalForHospitalSpecialty !==
      this.props.statisticalForHospitalSpecialty
    ) {
      console.log(
        "statisticalForHospitalSpecialty",
        this.props.statisticalForHospitalSpecialty
      );
      let { statisticalForHospitalSpecialty } = this.props;
      let categories = [];

      const myArray = Object.keys(statisticalForHospitalSpecialty).map(
        (key) => ({
          key: key,
          value: statisticalForHospitalSpecialty[key],
        })
      );
      let series = [];
      let object = {
        name: "Số lịch hẹn đã khám",
        data: [],
      };
      let totalAppointment = 0;
      myArray.map((item) => {
        categories.push(item.value[0].nameSpecialty);
        object.data.push(item.value.length);
        console.log("totalAppointment", totalAppointment, item.value.length);
        totalAppointment = totalAppointment + item.value.length;
      });

      series.push(object);
      this.setState((prevState) => ({
        options_specialty: {
          ...prevState.options_specialty,
          xaxis: {
            ...prevState.options_specialty.xaxis,
            categories: categories,
          },
        },
        series_specialty: series,
        totalAppointment: totalAppointment,
      }));
      console.log("statisticalForHospitalSpecialty", series);
    }
    if (
      prevProps.statisticalForDoctorHospitalSpecialty !==
      this.props.statisticalForDoctorHospitalSpecialty
    ) {
      console.log(
        "statisticalForHospitalSpecialty",
        this.props.statisticalForDoctorHospitalSpecialty
      );
      let { statisticalForDoctorHospitalSpecialty } = this.props;
      let categories = [];

      const myArray = Object.keys(statisticalForDoctorHospitalSpecialty).map(
        (key) => ({
          key: key,
          value: statisticalForDoctorHospitalSpecialty[key],
        })
      );
      let series = [];
      let object = {
        name: "Số lịch hẹn đã khám",
        data: [],
      };
      myArray.map((item) => {
        let fullName = `${item.value[0].lastName}  ${item.value[0].firstName}`;
        categories.push(fullName);
        object.data.push(item.value.length);
      });

      series.push(object);
      this.setState((prevState) => ({
        options_doctor: {
          ...prevState.options_specialty,
          xaxis: {
            ...prevState.options_specialty.xaxis,
            categories: categories,
          },
        },
        series_doctor: series,
      }));
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
  handleOnChangeDatePickerStart = async (date) => {
    this.setState({
      startDate: date[0],
    });
  };
  handleChangeSelectInfor = async (selectedInfor, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedInfor;
    this.setState({
      ...stateCopy,
    });
    let { startDate, endDate } = this.state;

    await this.props.fetchStatisticalForDoctorHospitalSpecialty({
      hospitalId: this.props.userInfo.clinicId,
      specialtyId: selectedInfor.value,
      startDate: startDate,
      endDate: endDate,
    });
  };
  handleOnChangeDatePickerEnd = async (date) => {
    this.setState({
      endDate: date[0],
    });
    let { startDate } = this.state;
    let formatedDate = new Date(date[0]).getTime();
    await this.props.fetchStatisticalForHospitalSpecialty({
      hospitalId: this.props.userInfo.clinicId,
      startDate: startDate,
      endDate: formatedDate,
    });
  };
  render() {
    let { startDate, endDate, totalAppointment } = this.state;
    return (
      <div className="StatisticalPage">
        <div className="StatisticalPage-container">
          <div className="left-container">
            <div className="date-container">
              <div className="date-picker">
                <label>Chọn ngày bắt đầu</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePickerStart}
                  className=" form-control"
                  value={startDate}
                />
              </div>
              <div className="date-picker">
                <label>Chọn ngày kết thúc</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePickerEnd}
                  className="form-control"
                  value={endDate}
                />
              </div>
              <div className="statistical-container">
                <div className="total total-pill ">
                  <label>Tổng lịch hẹn</label>
                  <span>{totalAppointment}</span>
                </div>
              </div>
            </div>
            <div className="filter-container"></div>
          </div>
          <div className="right-container">
            <ReactApexChart
              options={this.state.options_specialty}
              series={this.state.series_specialty}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="StatisticalPage-container">
          <div className="left-container">
            <div className="date-container">
              <div className="type-search">
                <label>Chuyên khoa</label>
                <Select
                  className="type-select"
                  name="selectedSpecialty"
                  value={this.state.selectedSpecialty}
                  onChange={this.handleChangeSelectInfor}
                  options={this.state.listSpecialty}
                />
              </div>
              <div className="date-picker">
                <label>Chọn ngày bắt đầu</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePickerStart}
                  className=" form-control"
                  value={startDate}
                />
              </div>
              <div className="date-picker">
                <label>Chọn ngày kết thúc</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePickerEnd}
                  className="form-control"
                  value={endDate}
                />
              </div>
            </div>
            <div className="filter-container"></div>
          </div>
          <div className="right-container">
            <ReactApexChart
              options={this.state.options_doctor}
              series={this.state.series_doctor}
              type="bar"
              height={350}
            />
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
    clinicSpecialties: state.clinicAccountant.clinicSpecialties,
    statisticalForHospitalSpecialty:
      state.hospitalAccountant.statisticalForHospitalSpecialty,
    statisticalForDoctorHospitalSpecialty:
      state.hospitalAccountant.statisticalForDoctorHospitalSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStatisticalForHospitalSpecialty: (data) =>
      dispatch(actions.fetchStatisticalForHospitalSpecialty(data)),
    fetchAllSpecialtiesOfClinic: (data) =>
      dispatch(actions.fetchAllSpecialtiesOfClinic(data)),
    fetchStatisticalForDoctorHospitalSpecialty: (data) =>
      dispatch(actions.fetchStatisticalForDoctorHospitalSpecialty(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
