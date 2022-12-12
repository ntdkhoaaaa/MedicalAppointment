import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import './UserAppointment.scss'
import { data } from './data'
import { getAllAppointmentOfPatient, cancelBookingFromPatient } from '../../../services/userServices';

import ModalRatingAppointment from './ModalRatingAppointment';
import TempModal from './TempModal';
class UserAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalRating: false,
            PatientAppointment: []
        }
    }
    async componentDidMount() {
        let { userInfo } = this.props
        console.log('chheck redux user', userInfo)

        let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id)
        if (UserAppointment && UserAppointment.length > 0) {
            this.setState({
                PatientAppointment: UserAppointment
            })
        }
        console.log('done', this.state.PatientAppointment)
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        let { userInfo } = this.props

        let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id)
        if (UserAppointment && UserAppointment.length > 0) {
            this.setState({
                PatientAppointment: UserAppointment
            })
        }
        console.log('done', this.state.PatientAppointment)
    }
    RatingTime() {
        this.setState({
            isOpenModalRating: true
        })
    }
    closeRatingModal = () => {
        this.setState({
            isOpenModalRating: false
        })
    }
    async CancelBooking(bookingId, PatientAppointment) {
        console.log('Cancelling booking', bookingId)
        await cancelBookingFromPatient({ id: bookingId })
        PatientAppointment = this.props.PatientAppointment
    }
    render() {
        let { isOpenModalRating, PatientAppointment } = this.state
        let { userInfo } = this.props

        return (
            <div className='patient-appointment'>
                <div className='col-12 table-manage-patient table-striped'>
                    <table style={{ width: '100%' }} >
                        <tbody>
                            <tr>
                                <th>Thời gian</th>
                                <th>Đặt cho ai</th>
                                <th>Triệu chứng</th>
                                <th>Tên bác sĩ</th>
                                <th>Thông tin phòng khám</th>
                                <th>Actions</th>
                            </tr>
                            {PatientAppointment && PatientAppointment.length > 0 ?
                                PatientAppointment.map((item, index) => {
                                    console.log(item)
                                    return (
                                        <tr key={index}>

                                            <td>{item.bookingDate}</td>
                                            <td>{item.forWho}</td>
                                            <td>{item.prognostic}</td>
                                            <td>{item.doctorInfoData.firstName} {item.doctorInfoData.lastName} <span> ({item.doctorInfoData.Doctor_Infor.nameSpecialty}) </span></td>
                                            <td>
                                                <div>
                                                    {item.doctorInfoData.Doctor_Infor.addressClinic}
                                                </div>
                                                <div>
                                                    {item.doctorInfoData.Doctor_Infor.nameClinic}
                                                </div>
                                            </td>
                                            <td>
                                                <ModalRatingAppointment
                                                    RatingInfor={item}
                                                    closeRatingModal={this.closeRatingModal}
                                                    isOpenModalRating={isOpenModalRating} />
                                                {item.statusId === 'S1' ? 'Bạn hãy xác nhận thông tin lịch hẹn ở email đã đăng ký nhé' : item.statusId === 'S4' ? 'Bạn đã hủy hẹn' :
                                                    item.statusId === 'S2' ?
                                                        <button onClick={() => this.CancelBooking(item.id, PatientAppointment)} className='mp-btn-cancel'>
                                                            Hủy hẹn
                                                        </button>
                                                        :
                                                        <div>
                                                            <button onClick={() => this.RatingTime()} hidden={item.statusId === 'S5' ? true : false} className='mp-btn-rate'>
                                                                Đánh giá
                                                            </button>

                                                            <button className='mp-btn-remedy'>
                                                                Xem bệnh án
                                                            </button>
                                                        </div>}


                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr className='  no-patient'>
                                    <td className='no-no' colSpan={6}>No schedule yet</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAppointment);
