import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import DatePicker from '../../../components/Input/DatePicker';

import "./ManagePatient.scss";
import { getListPatientForDoctor, getListExaminatedPatientForDoctor } from '../../../services/userServices';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import ConfirmtoPatientModal from './ConfirmtoPatientModal';
import ReviewMedicalRecordsModal from './ReviewMedicalRecordsModal';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('days').valueOf(),
            dataPatient: [],
            dataExaminatedPatients: [],
            isOpenModalReview: false,
            isOpenModalBooking: false,
            bookingId: '',
            dataScheduleTimeModal: {}
        }
    }

    componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        if (currentDate) {
            let formatedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formatedDate)
            this.getExaminatedDataPatient(user, formatedDate)
        }

    }
    getDataPatient = async (user, formatedDate) => {
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    getExaminatedDataPatient = async (user, formatedDate) => {
        let res = await getListExaminatedPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataExaminatedPatients: res.data
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listusers !== this.props.listusers) {
            this.setState({
                userRedux: this.props.listusers,
            })
        }
    }
    handleOnChangeDatePicker = async (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formatedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formatedDate)
            this.getExaminatedDataPatient(user, formatedDate)

        })
    }
    handleClickScheduleTime = (time) => {
        if (this.props.isLoggedIn) {
            console.log(time)
            this.setState({
                dataScheduleTimeModal: time,
                bookingId: time.id,
                isOpenModalBooking: true
            })
        }
        else {
            this.props.history.push('/login')
        }
    }
    handleClickReviewMedicalRecord = (time, bookingId) => {
        console.log('check review', time, bookingId)
        if (this.props.isLoggedIn) {
            this.setState({
                bookingId: bookingId,
                dataScheduleTimeModal: time,
                isOpenModalReview: true,
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
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate)
        this.getExaminatedDataPatient(user, formatedDate)
    }
    closeReviewModal = () => {
        this.setState({
            isOpenModalReview: false
        })
    }
    render() {
        let { dataPatient, isOpenModalBooking, dataScheduleTimeModal, currentDate, dataExaminatedPatients, isOpenModalReview, bookingId } = this.state;
        let { permission, user } = this.props;
        let formatedDate = new Date(currentDate).getTime();
        if (permission === 'R3') {
            return (
                <Redirect to='/home' />
            )
        }
        return (
            <React.Fragment>
                <div className='manage-patient-container'>
                    <div className='m-p-title'>
                        Quản lý bệnh nhân khám bệnh
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group'>
                            <label>Chọn ngày</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                            />
                        </div>

                        <div className='col-12 table-manage-patient'>
                            <div className='title-today-patient'>
                                Danh sách bệnh nhân của ngày hôm nay
                            </div>
                            <table className='table-striped' style={{ width: '100%' }} >
                                <tbody>
                                    <tr>

                                        <th>Thời gian</th>
                                        <th>Họ và Tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Tuổi</th>
                                        <th>Triệu chứng</th>
                                        <th>Action</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td width='18%'>{item.bookingDate}</td>
                                                    <td width='15%'>{item.forWho}</td>
                                                    <td width='25%'>{item.address}</td>
                                                    <td width='5%'>{item.gender}</td>
                                                    <td width='5%'>{item.patientAge}</td>
                                                    <td width='23%'>{item.prognostic}</td>
                                                    <td width='10%'>
                                                        <button className='mp-btn-remedy'
                                                            onClick={() => this.handleClickScheduleTime(item)}>
                                                            Gửi hóa đơn
                                                        </button>
                                                        <ConfirmtoPatientModal
                                                            isOpenModal={isOpenModalBooking}
                                                            closeBookingModal={this.closeBookingModal}
                                                            dataTime={dataScheduleTimeModal}
                                                            bookingId={bookingId}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr className='  no-patient'>
                                            <td className='no-no' colSpan={8}>No patient for today</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='col-12 table-manage-done-patient'>
                            <div className='title-today-patient'>
                                Danh sách bệnh nhân đã khám trong ngày hôm nay
                            </div>
                            <table className='table-striped' style={{ width: '100%' }} >
                                <tbody>
                                    <tr>

                                        <th>Thời gian</th>
                                        <th>Họ và Tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Tuổi</th>
                                        <th>Triệu chứng</th>
                                        <th>Action</th>
                                    </tr>
                                    {dataExaminatedPatients && dataExaminatedPatients.length > 0 ?
                                        dataExaminatedPatients.map((item, index) => {
                                            return (
                                                <tr key={index}>

                                                    <td width='18%'>{item.bookingDate}</td>
                                                    <td width='15%'>{item.forWho}</td>
                                                    <td width='25%'>{item.address}</td>
                                                    <td width='5%'>{item.gender}</td>
                                                    <td width='5%'>{item.patientAge}</td>
                                                    <td width='23%'>{item.prognostic}</td>
                                                    <td width='20%'>
                                                        <button className='mp-btn-remedy'
                                                            onClick={() => this.handleClickReviewMedicalRecord(item, item.id)}>
                                                            Xem bệnh án
                                                        </button>
                                                        <ReviewMedicalRecordsModal
                                                            isOpenModalReview={isOpenModalReview}
                                                            closeReviewModal={this.closeReviewModal}
                                                            dataTime={dataScheduleTimeModal}
                                                            bookingId={bookingId}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr className='  no-patient'>
                                            <td className='no-no' colSpan={8}>No patient for today</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </React.Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.userInfo,
        permission: state.user.permission,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersRedux: () => { dispatch(actions.fetchAllUsersStart()) },
        fetchDeleteUser: (id) => { dispatch(actions.deleteUser(id)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
