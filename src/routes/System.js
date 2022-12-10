import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch, NavLink } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor'
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
class System extends Component {
    render() {
        if (this.props.permission === 'R2') {
            return (
                < Redirect to={'/doctor/manage-schedule'} />
            );
        }
        if (this.props.permission === 'R3') {
            return (
                < Redirect to={'/home'} />
            );
        }
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {this.props.permission ?
                    <>
                        {isLoggedIn && <Header />}
                        <div className="system-container">
                            <div className="system-list">
                                <Switch>
                                    <Route path="/system/user-manage" component={UserManage} />
                                    <Route path="/system/user-redux" component={UserRedux} />
                                    <Route path="/system/manage-doctor" component={ManageDoctor} />
                                    <Route path="/system/manage-specialty" component={ManageSpecialty} />
                                    <Route path="/system/manage-clinic" component={ManageClinic} />
                                    <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                                </Switch>
                            </div>
                        </div>
                    </> :
                    <div>
                        Loading....
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        permission: state.user.permission,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
