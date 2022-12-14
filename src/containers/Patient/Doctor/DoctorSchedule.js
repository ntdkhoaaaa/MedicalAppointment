import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userServices'
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
import { Redirect, withRouter } from 'react-router-dom';


class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        let arrDays = this.getArrDays(language);
        if (arrDays && arrDays.length > 0) {
            this.setState({
                allDays: arrDays,
            })
        }
        let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, arrDays[0].value)
        this.setState({
            allAvailableTime: res.data ? res.data : []
        })
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrDays = (language) => {
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let labelVi = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${labelVi}`
                    object.label = today;

                }
                else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            }
            else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${ddMM}`
                    object.label = today;
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }

            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(object);
        }
        return arrDate;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        let { language } = this.props;

        if (this.props.language !== prevProps.language) {
            let arrDays = this.getArrDays(language)
            this.setState({ allDays: arrDays })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let arrDays = this.getArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, arrDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    }
    handleClickScheduleTime = (time) => {

        if (this.props.isLoggedIn) {
            console.log('time', time)
            this.setState({
                isOpenModalBooking: true,
                dataScheduleTimeModal: time
            })
        }
        else {
            this.props.history.push('/login')
        }


    }
    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }
    render() {
        // 
        let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
        let { language } = this.props
        // console.log('check state', this.state)
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {
                                allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.label}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <span><i className='fas fa-calendar-alt'> </i><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                        </div>
                        <div className='time-contain'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <React.Fragment>
                                    <div className='time-contain-button'>
                                        {allAvailableTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.VI ?
                                                item.timetypeData.valueVi : item.timetypeData.valueEn
                                            return (
                                                <button
                                                    className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                    key={index}
                                                    onClick={() => this.handleClickScheduleTime(item)}>
                                                    {timeDisplay}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <div className='book-free'>
                                        <span><FormattedMessage id="patient.detail-doctor.choose" /> <i className='far fa-hand-point-up'></i> <FormattedMessage id="patient.detail-doctor.book" /></span>
                                    </div>
                                </React.Fragment>
                                : <div className='unavailable'><FormattedMessage id="patient.detail-doctor.unavailable" /> </div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleTimeModal}
                />
            </>


        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule));
