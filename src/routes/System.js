import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, NavLink } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import ManageSpecialty from "../containers/System/Specialty/ManageSpecialty";
import ManageClinic from "../containers/System/Clinic/ManageClinic";
import ManageMedicine from "../containers/System/Doctor/ManageMedicine";
import { LANGUAGES, USER_ROLE } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  adminMenu,
  doctorMenu,
  accountantMenu,
  doctorHospitalMenu,
  accountantHospitalMenu
} from "../containers/Header/menuApp";
import "./System.scss";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import { push } from "connected-react-router";
import Navigator from "../components/Navigator";
import { Link, withRouter } from "react-router-dom";


class System extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
      path:''
    };
  }
  componentDidMount() {
    let { permission,systemMenuPath } = this.props;
    let {path} = this.state
    path= this.props.location.pathname
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
      let { permission,systemMenuPath } = this.props;
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
    console.log(this.props.permission);
    let menuApp = this.state.menuApp;
    if (this.props.permission === "R2") {
      return <Redirect to={"/doctor/manage-schedule"} />;
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
    if (this.props.permission === "R3") {
      return <Redirect to={"/home"} />;
    }
    const { systemMenuPath, isLoggedIn } = this.props;
    const { navigate } = this.props;
    const test=this.props.location.pathname
    console.log(test)
    let menu = menuApp[0];
    return (
      <React.Fragment>
        {this.props.permission ? (
          <>
            {isLoggedIn && <Header />}
            <div className="system-container">
              <div className="navigate-bar">
                {menu?.menus.map((item) => {
                  return (
                    <div
                      className={
                        (test === item.link)
                          ? 
                           "navigate-item  users-selected" 
                          :  "navigate-item"
                      }
                    >
                      <Link className="link" to={item.link}>
                        <div className="icon-container">
                          {item.stt === 1 && <i class="fas fa-users"></i>}
                          {item.stt === 2 && <i class="fas fa-user-md"></i>}
                        </div>
                        <div className="navigate-name">
                          <FormattedMessage id={item.name}></FormattedMessage>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="system-list">
                <Switch>
                  <Route path="/system/user-redux" component={UserRedux} />
                  <Route
                    path="/system/manage-doctor"
                    component={ManageDoctor}
                  />
                  <Route
                    path="/system/manage-specialty"
                    component={ManageSpecialty}
                  />
                  <Route
                    path="/system/manage-clinic"
                    component={ManageClinic}
                  />
                  <Route
                    component={() => {
                      return <Redirect to={systemMenuPath} />;
                    }}
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
  return {
    navigate: (path) => dispatch(push(path)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(System));
