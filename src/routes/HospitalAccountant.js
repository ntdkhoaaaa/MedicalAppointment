import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManageHospitalByAccountant from "../containers/System/HospitalAccountant/ManageHospitalByAccountant";
import ManageClinicSpecialties from "../containers/System/HospitalAccountant/ManageClinicSpecialties";
import ManageClinicByAccountant from "../containers/System/Accountant/ManageClinicByAccountant";
import ManageDoctorsAccount from "../containers/System/HospitalAccountant/ManageDoctorsAccount";
import ManageDoctorSchedule from "../containers/System/HospitalAccountant/ManageDoctorSchedule";
import Header from "../containers/Header/Header";
import { Link, withRouter } from "react-router-dom";
import { LANGUAGES, USER_ROLE } from "../utils";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ManagePatient from "../containers/System/HospitalAccountant/ManagePatient";
import {
  adminMenu,
  doctorMenu,
  accountantMenu,
  doctorHospitalMenu,
  accountantHospitalMenu,
} from "../containers/Header/menuApp";
import "./System.scss";
class HospitalAccountant extends Component {
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
    console.log("systemMenuPath", path);
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
      console.log(menu);
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

    console.log(this.props.permission);
    if (this.props.permission === "R2") {
      return <Redirect to={"/doctor/manage-schedule"} />;
    }
    if (this.props.permission === "R3") {
      return <Redirect to={"/home"} />;
    }
    if (this.props.permission === "R1") {
      return <Redirect to={"/system/user-redux"} />;
    }
    if (this.props.permission === "R4") {
      return <Redirect to={"/accountant/manage-clinic"} />;
    }
    if (this.props.permission === "R5") {
      return <Redirect to={"/doctorHospital/manage-schedule"} />;
    }
    const test = this.props.location.pathname;

    return (
      <React.Fragment>
        {this.props.permission === "R6" ? (
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
                          {item.stt === 1 && <i class="fas fa-hospital"></i>}
                          {item.stt === 2 && (
                            <i class="fas fa-notes-medical"></i>
                          )}
                          {item.stt === 3 && <i class="fas fa-user-md"></i>}
                          {item.stt === 4 && (
                            <i class="fas fa-calendar-alt"></i>
                          )}
                          {item.stt === 5 && <i class="fas fa-procedures"></i>}
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
                    path="/accountantHospital/manage-hospital"
                    component={ManageClinicByAccountant}
                  />
                  <Route
                    path="/accountantHospital/manage-hospital-specialties"
                    component={ManageClinicSpecialties}
                  />
                  <Route
                    path="/accountantHospital/manage-hospital-doctors-schedule"
                    component={ManageDoctorSchedule}
                  />
                  <Route
                    path="/accountantHospital/manage-hospital-doctors-account"
                    component={ManageDoctorsAccount}
                  />
                  <Route
                    path="/accountantHospital/manage-hospital-patients"
                    component={ManagePatient}
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

export default connect(mapStateToProps, mapDispatchToProps)(HospitalAccountant);
