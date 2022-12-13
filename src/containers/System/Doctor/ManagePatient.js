import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import DatePicker from '../../../components/Input/DatePicker';

import "./ManagePatient.scss";
import { getListPatientForDoctor } from '../../../services/userServices';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import ConfirmtoPatientModal from './ConfirmtoPatientModal';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('days').valueOf(),
            dataPatient: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }

    componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate)
    }
    getDataPatient = async (user, formatedDate) => {
        console.log('wefbwue h bvbwebe')
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        console.log('check res', res)
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listusers !== this.props.listusers) {
            this.setState({
                userRedux: this.props.listusers,
            })
        }
        if (prevState.isOpenModalBooking = this.state.isOpenModalBooking) {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formatedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formatedDate)
        }
    }
    handleOnChangeDatePicker = async (date) => {
        console.log('wehbhffweifbiwb')
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formatedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formatedDate)
        })
    }
    handleClickScheduleTime = (time) => {
        if (this.props.isLoggedIn) {
            // console.log(time)
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
        let { dataPatient, isOpenModalBooking, dataScheduleTimeModal, currentDate } = this.state;
        let { permission, user } = this.props;
        let formatedDate = new Date(currentDate).getTime();
        console.log('permission: ', permission)
        if (permission === 'R3') {
            return (
                <Redirect to='/home' />
            )
        }
        console.log('co vo day k', dataPatient)
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
                                minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                            />
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table style={{ width: '100%' }} >
                                <tbody>
                                    <tr>
                                        <th>ID</th>
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
                                                    <td>{item.id}</td>
                                                    <td>{item.bookingDate}</td>
                                                    <td>{item.forWho}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.gender}</td>
                                                    <td>{item.patientAge}</td>
                                                    <td>{item.prognostic}</td>
                                                    <td>
                                                        <button className='mp-btn-remedy'
                                                            onClick={() => this.handleClickScheduleTime(item)}>
                                                            Gửi hóa đơn
                                                        </button>
                                                        <ConfirmtoPatientModal
                                                            isOpenModal={isOpenModalBooking}
                                                            closeBookingModal={this.closeBookingModal}
                                                            dataTime={dataScheduleTimeModal}
                                                            bookingId={item.id}
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

            </React.Fragment>
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
