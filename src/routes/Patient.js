import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import { Link, withRouter } from "react-router-dom";
import { LANGUAGES, USER_ROLE } from "../utils";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserBasicInfor from "../containers/Patient/Profile/UserBasicInfor";
import UserAppointment from "../containers/Patient/Profile/UserAppointment";
import {
  adminMenu,
  doctorMenu,
  accountantMenu,
  doctorHospitalMenu,
  accountantHospitalMenu,
  patientMenu
} from "../containers/Header/menuApp";
import "./System.scss";
import HomeHeader from "../containers/HomePage/HomeHeader";
class Patient extends Component {
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
      if (permission === USER_ROLE.PATIENT) {
        menu = patientMenu;
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
        if (permission === USER_ROLE.PATIENT) {
            menu = patientMenu;
          }
      }
      console.log(menu);
      this.setState({
        menuApp: menu,
      });
    }
  }
  render() {
    const { isLoggedIn } = this.props;
    let menuApp = this.state.menuApp;

    let menu = menuApp[0];
    if (this.props.permission === "R2") {
      return <Redirect to={"/doctor/manage-schedule"} />;
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
    if (this.props.permission === "R6") {
        return <Redirect to={"/accountantHospital/manage-hospital"} />;
      }
    const test = this.props.location.pathname;
    console.log('test', this.props.permission);
    return (
      <React.Fragment>
        {this.props.permission === "R3" ? (
          <>
            <HomeHeader isShowBanner={false}/>
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
                          {item.stt === 1 && <i className="fas fa-info-circle"></i>}
                          {item.stt === 2 && (
                         <i className="fas fa-clipboard-list"></i>
                          )}
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
                    path="/patient/patient-basic-information"
                    component={UserBasicInfor}
                  />
                  <Route
                    path="/patient/patient-booking-history"
                    component={UserAppointment}
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

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
