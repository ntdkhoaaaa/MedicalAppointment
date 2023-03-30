import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
// import ManageSchedule from '../containers/System/Accountant/ManageSchedule';
// import ManagePatient from '../containers/System/Accountant/ManagePatient';
// import ManageMedicine from '../containers/System/Accountant/ManageMedicine';
import ManageClinicByAccountant from '../containers/System/Accountant/ManageClinicByAccountant';
import ManageClinicSpecialties from '../containers/System/Accountant/ManageClinicSpecialties';
import ManageDoctorInfor from '../containers/System/Accountant/ManageDoctorInfor';
import DoctorExtraInfor from '../containers/System/Accountant/DoctorExtraInfor';
import ManageDoctorSchedule from '../containers/System/Accountant/ManageDoctorSchedule';
import ManageAndRegisterDoctorForHospital from '../containers/System/Accountant/ManageAndRegisterDoctorForHospital';
import Header from '../containers/Header/Header';
class Accountant extends Component {
    render() {
        const { isLoggedIn } = this.props;
        console.log(this.props.permission);
        if (this.props.permission === 'R2') {
            return (
                <Redirect to={'/doctor/manage-schedule'} />
            );
        }
        if (this.props.permission === 'R3') {
            return (
                < Redirect to={'/home'} />
            );
        }
        if (this.props.permission === 'R1') {
            return (
                <Redirect to={'/system/user-redux'} />
            );
        }
        return (
            <React.Fragment>
                {this.props.permission==='R4' ?
                    <>
                        <Header />
                        <div className="system-container">
                            <div className="system-list">
                                <Switch>
                                    <Route path="/accountant/manage-clinic" component={ManageClinicByAccountant} />
                                    <Route path="/accountant/manage-clinic-specialties" component={ManageClinicSpecialties} />
                                    <Route path="/accountant/manage-clinic-doctors" component={ManageDoctorInfor} />
                                    <Route path="/accountant/edit-doctor-extra-infor" component={DoctorExtraInfor} />
                                    <Route path="/accountant/manage-doctors-schedule" component={ManageDoctorSchedule} />
                                    <Route path="/accountant/manage-doctors-account" component={ManageAndRegisterDoctorForHospital} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Accountant);
