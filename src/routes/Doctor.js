import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
import ManageMedicine from '../containers/System/Doctor/ManageMedicine';
import Header from '../containers/Header/Header';
class Doctor extends Component {
    render() {
        const { isLoggedIn } = this.props;
        
        return (
            <React.Fragment>
                {this.props.permission ?
                    <>
                        <Header />
                        <div className="system-container">
                            <div className="system-list">
                                <Switch>
                                    <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                                    <Route path="/doctor/manage-patient" component={ManagePatient} />
                                    <Route path="/doctor/manage-medicine" component={ManageMedicine} />
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
        permission: state.user.permission
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
