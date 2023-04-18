import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import ManagePatient from "../containers/System/Doctor/ManagePatient";
import ManageMedicine from "../containers/System/Doctor/ManageMedicine";
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

class HospitalDoctor extends Component {
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
  }
  render() {
    let menuApp = this.state.menuApp;
    let menu = menuApp[0];
    const { isLoggedIn } = this.props;
    if (this.props.permission === "R4") {
      return <Redirect to={"/accountant/manage-clinic"} />;
    }
    if (this.props.permission === "R3") {
      return <Redirect to={"/home"} />;
    }
    if (this.props.permission === "R1") {
      return <Redirect to={"/system/user-redux"} />;
    }
    if (this.props.permission === "R2") {
      return <Redirect to={"/doctor/manage-schedule"} />;
    }
    if (this.props.permission === "R6") {
      return <Redirect to={"/accountantHospital/manage-hospital"} />;
    }
    const test = this.props.location.pathname;

    return (
      <React.Fragment>
        {this.props.permission === "R5" ? (
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
                          {item.stt === 1 && (
                            <i class="fas fa-calendar-alt"></i>
                          )}
                          {item.stt === 2 && (
                            <i class="fas fa-calendar-alt"></i>
                          )}
                          {item.stt === 3 && <i class="fas fa-capsules"></i>}
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
                    path="/doctorHospital/manage-schedule"
                    component={ManageSchedule}
                  />
                  <Route
                    path="/doctorHospital/manage-patient"
                    component={ManagePatient}
                  />
                  <Route
                    path="/doctorHospital/manage-medicine"
                    component={ManageMedicine}
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

export default connect(mapStateToProps, mapDispatchToProps)(HospitalDoctor);
