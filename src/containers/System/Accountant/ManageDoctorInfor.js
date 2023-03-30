import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import Select from "react-select";
import "./ManageDoctorInfor.scss";
import * as actions from "../../../store/actions";
import _, { upperCase } from "lodash";

class ManageDoctorInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialty: [],
      selectedSpecialty: {},
      DegreeArr: [],
      selectedDegree: {},
      search: "",
      doctorArr: [],
      tableFilter: [],
    };
  }
  async componentDidMount() {
    // this.props.fetchAllSpecialtiesOfClinic(this.props.userInfo.clinicId);
    this.props.loadAllSpecialties();
    this.props.getPositionStart();
    this.props.fetchAllDoctorsOfClinic(
      this.props.userInfo.clinicId,
      "All",
      "All"
    );
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (prevProps.allSpecialties !== this.props.allSpecialties) {
      let listSpecialty = this.buildDataInputSelect(
        this.props.allSpecialties,
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
      let arrPositions = this.buildDataInputSelect(
        this.props.positionRedux,
        "allcode"
      );
      console.log(arrPositions);
      arrPositions.unshift({
        value: "All",
        label: this.props.language === LANGUAGES.VI ? "Tất cả" : "All",
      });
      this.setState({
        DegreeArr: arrPositions,
        selectedDegree: arrPositions[0],
      });
    }
    if (prevProps.clinicDoctors !== this.props.clinicDoctors) {
      console.log("fqfbqubqs");
      let { clinicDoctors } = this.props;
      console.log(clinicDoctors);
      this.setState({
        doctorArr: clinicDoctors,
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
  searchDoctorInClinic = (event) => {
    let keyword = event.target.value;
    let { doctorArr } = this.state;
    if (!_.isEmpty(keyword)) {
      this.setState({ search: keyword });
      let filterTable = doctorArr.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(keyword.toLowerCase())
        )
      );
      this.setState({ tableFilter: filterTable });
      console.log("search in 1 ", this.state.tableFilter);
    } else {
      console.log("search in 2", this.state.search);
      this.setState({
        search: keyword,
        doctorArr: this.state.doctorArr,
      });
    }
  };
  handleChange = async (selectedInfor, name) => {
    console.log("handleChange", selectedInfor, name);
    let {selectedDegree,selectedSpecialty}=this.state
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedInfor;
    this.setState({
      ...stateCopy,
    });
    if (name.name === "selectedSpecialty") {
      console.log("ewwe",selectedDegree);
      await this.props.fetchAllDoctorsOfClinic(
        this.props.userInfo.clinicId,
        selectedInfor.value,
        selectedDegree.value
      );
    }
    if (name.name === "selectedDegree") {
      console.log("ewwe");
      await this.props.fetchAllDoctorsOfClinic(
        this.props.userInfo.clinicId,
        selectedSpecialty.value,
        selectedInfor.value,
        
      );
    }
  };
  render() {
    let { doctorArr, search, tableFilter } = this.state;
    return (
      <div>
        {doctorArr && doctorArr.length > 0 ? (
          <div className="manage-doctor-infor-byaccountant-container">
            <div className="left">
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
              <div className="specialty-search">
                <label>Chuyên khoa</label>
                <Select
                  className="specialty-select"
                  name="selectedSpecialty"
                  value={this.state.selectedSpecialty}
                  onChange={this.handleChange}
                  options={this.state.listSpecialty}
                />
              </div>
              <div className="degree-search">
                <label>Học vị</label>
                <Select
                  className="degree-select"
                  value={this.state.selectedDegree}
                  onChange={this.handleChange}
                  name="selectedDegree"
                  options={this.state.DegreeArr}
                />
              </div>
            </div>
            <div className="right">
              <div className="grid-container">
                {doctorArr && search.length > 0 && tableFilter.length >= 1
                  ? tableFilter.map((item, index) => {
                      return (
                        <div className="grid-item">
                          <div>
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
                        </div>
                      );
                    })
                  : doctorArr.map((item, index) => {
                      return (
                        <div className="grid-item">
                          <div>
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
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        ) : (
          <div className="manage-doctor-infor-byaccountant-container">
            <div className="left">
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
              <div className="specialty-search">
                <label>Chuyên khoa</label>
                <Select
                  className="specialty-select"
                  name="selectedSpecialty"
                  value={this.state.selectedSpecialty}
                  onChange={this.handleChange}
                  options={this.state.listSpecialty}
                />
              </div>
              <div className="degree-search">
                <label>Học vị</label>
                <Select
                  className="degree-select"
                  value={this.state.selectedDegree}
                  onChange={this.handleChange}
                  name="selectedDegree"
                  options={this.state.DegreeArr}
                />
              </div>
            </div>
            <div className="right">
                Hiện không có thông tin bác sĩ
              </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
    clinicSpecialties: state.clinicAccountant.clinicSpecialties,
    positionRedux: state.admin.position,
    clinicDoctors: state.clinicAccountant.clinicDoctors,
    allSpecialties: state.admin.allSpecialties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialtiesOfClinic: (data) =>
      dispatch(actions.fetchAllSpecialtiesOfClinic(data)),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    fetchAllDoctorsOfClinic: (clinicId, specialtyId, positionId) =>
      dispatch(
        actions.fetchAllDoctorsOfClinic(clinicId, specialtyId, positionId)
      ),
    loadAllSpecialties: () => dispatch(actions.fetchAllSpecialties()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctorInfor);
