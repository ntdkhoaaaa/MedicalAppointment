import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
// import ManageSchedule from '../containers/System/Accountant/ManageSchedule';
// import ManagePatient from '../containers/System/Accountant/ManagePatient';
// import ManageMedicine from '../containers/System/Accountant/ManageMedicine';
import ManageClinicByAccountant from "../containers/System/Accountant/ManageClinicByAccountant";
// import ManageClinicSpecialties from "../containers/System/Accountant/ManageClinicSpecialties";
import ManageDoctorInfor from "../containers/System/Accountant/ManageDoctorInfor";
import DoctorExtraInfor from "../containers/System/Accountant/DoctorExtraInfor";
import ManageClinicDoctorSchedules from "../containers/System/Accountant/ManageClinicDoctorSchedules";
import ManageAndRegisterDoctorForHospital from "../containers/System/Accountant/ManageAndRegisterDoctorForHospital";
import Header from "../containers/Header/Header";
import { Link, withRouter } from "react-router-dom";
import { LANGUAGES, USER_ROLE } from "../utils";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  adminMenu,
  doctorMenu,
  accountantMenu,
  doctorHospitalMenu,
  accountantHospitalMenu,
} from "../containers/Header/menuApp";
import "./System.scss";
class Accountant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
      path: "",
    };
  }
  componentDidMount() {
    let { permission, systemMenuPath } = this.props;
    let { path } = this.state;
    path = this.props.location.pathname;
    let menu = [];
    if (permission && !_.isEmpty(permission)) {
      if (permission === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (permission === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
      if (permission === USER_ROLE.ACCOUNTANT) {
        menu = accountantMenu;
      }
      if (permission === USER_ROLE.HOSPITAL_DOCTOR) {
        menu = doctorHospitalMenu;
      }
      if (permission === USER_ROLE.HOSPITAL_ACCOUNTANT) {
        menu = accountantHospitalMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.permission !== this.props.permission) {
      let { permission, systemMenuPath } = this.props;
      let menu = [];
      if (permission && !_.isEmpty(permission)) {
        if (permission === USER_ROLE.ADMIN) {
          menu = adminMenu;
        }
        if (permission === USER_ROLE.DOCTOR) {
          menu = doctorMenu;
        }
        if (permission === USER_ROLE.ACCOUNTANT) {
          menu = accountantMenu;
        }
        if (permission === USER_ROLE.HOSPITAL_DOCTOR) {
          menu = doctorHospitalMenu;
        }
        if (permission === USER_ROLE.HOSPITAL_ACCOUNTANT) {
          menu = accountantHospitalMenu;
        }
      }
      this.setState({
        menuApp: menu,
      });
    }
    // if(prevProps.location.pathname !== this.props.location.pathname){
    //   let {path} = this.state
    //   path= this.props.location.pathname
    // }
  }
  render() {
    const { isLoggedIn } = this.props;
    let menuApp = this.state.menuApp;

    let menu = menuApp[0];

    if (this.props.permission === "R2") {
      return <Redirect to={"/doctor/manage-schedule"} />;
    }
    if (this.props.permission === "R3") {
      return <Redirect to={"/home"} />;
    }
    if (this.props.permission === "R1") {
      return <Redirect to={"/system/user-redux"} />;
    }
    if (this.props.permission === "R5") {
      return <Redirect to={"/doctorHospital/manage-schedule"} />;
    }
    if (this.props.permission === "R6") {
      return <Redirect to={"/accountantHospital/manage-hospital"} />;
    }
    const test = this.props.location.pathname;

    return (
      <React.Fragment>
        {this.props.permission === "R4" ? (
          <>
            <Header />
            <div className="system-container">
              <div className="navigate-bar">
                {menu?.menus.map((item) => {
                  return (
                    <div className="navigate-item">
                      <Link className="link" to={item.link}>
                        <div
                          className={
                            test === item.link
                              ? "icon-container users-selected"
                              : "icon-container"
                          }
                        >
                          {item.stt === 1 && <i className="fas fa-hospital"></i>}
                          {item.stt === 2 && <i className="fas fa-user"></i>}
                          {item.stt === 3 && 
                            <i className="fas fa-calendar-alt"></i>
                          }
                          {item.stt === 4 && <i className="fas fa-user-md"></i>}
                        </div>
                        <span className="navigate-name">
                          <FormattedMessage id={item.name}></FormattedMessage>
                        </span>
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="system-list">
                <Switch>
                  <Route
                    path="/accountant/manage-clinic"
                    component={ManageClinicByAccountant}
                  />
                  <Route
                    path="/accountant/manage-clinic-doctors"
                    component={ManageDoctorInfor}
                  />
                  <Route
                    path="/accountant/edit-clinic-doctor-extra-infor"
                    component={DoctorExtraInfor}
                  />
                  <Route
                    path="/accountant/manage-clinic-doctors-schedule"
                    component={ManageClinicDoctorSchedules}
                  />
                  <Route
                    path="/accountant/manage-clinic-doctors-account"
                    component={ManageAndRegisterDoctorForHospital}
                  />
                </Switch>
              </div>
            </div>
          </>
        ) : (
          <div>Loading....</div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    permission: state.user.permission,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Accountant);
