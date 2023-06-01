import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
import Login from './Auth/Login';
import System from '../routes/System';
import Register from './Auth/Register';
import VerifyRegister from './Auth/VerifyRegister';
import ConfirmModal from '../components/ConfirmModal';
import HomePage from './HomePage/HomePage.js'
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import Doctor from '../routes/Doctor';
import Accountant from '../routes/Accountant';
import HospitalAccountant from '../routes/HospitalAccountant';
import HospitalDoctor from '../routes/HospitalDoctor';
import CustomScrollbars from '../components/CustomScrollbars';
import VerifyEmail from './Patient/VerifyEmail';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';
import { fetchPermission } from '../store/actions';
import DetailClinic from './Patient/Clinics/DetailClinic';
// import UserProfile from './Patient/Profile/UserProfile';
import ForgetPassword from './Auth/ForgetPassword';
import ResetPassword from './Auth/ResetPassword';
import DetailClinicSpecialties from './Patient/Clinics/DetailClinicSpecialties';
import HospitalSpecialtySchedules from './Patient/Clinics/HospitalSpecialtySchedules';
import Patient from '../routes/Patient';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        let { isLoggedIn, loadPermission } = this.props;
        if (isLoggedIn && !loadPermission) {
            this.props.getPermission()
        }
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />
                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.REGISTER} component={userIsNotAuthenticated(Register)} />
                                    <Route path={'/doctor/'} component={userIsAuthenticated(Doctor)} />
                                    <Route path={'/doctorHospital/'} component={userIsAuthenticated(HospitalDoctor)} />
                                    <Route path={'/accountant/'} component={userIsAuthenticated(Accountant)} />
                                    <Route path={'/accountantHospital/'} component={userIsAuthenticated(HospitalAccountant)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                    <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
                                    <Route path={path.VERIFY_REGISTER} component={VerifyRegister} />
                                    <Route path={path.USER_PROFILE} component={userIsAuthenticated(Patient)} />
                                    <Route path={path.FORGOT_PASSWORD} component={userIsNotAuthenticated(ForgetPassword)} />
                                    <Route path={path.RESET_PASSWORD} component={userIsNotAuthenticated(ResetPassword)} />
                                    <Route path={path.DETAIL_CLINIC_SPECIALTY} component={DetailClinicSpecialties} />
                                    <Route path={path.HOSPITAL_SPECIALTY_SCHEDULE} component={HospitalSpecialtySchedules} />
                                </Switch>
                            </CustomScrollbars>
                        </div>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        refreshToken: state.user.refreshToken,
        loadPermission: state.user.loadPermission,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPermission: () => dispatch(fetchPermission())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);