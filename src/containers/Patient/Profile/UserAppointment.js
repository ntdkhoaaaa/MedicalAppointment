import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import './UserAppointment.scss'
import { data } from './data'
import { getAllAppointmentOfPatient, cancelBookingFromPatient, getMedicalRecordByBookingId } from '../../../services/userServices';
import * as actions from '../../../store/actions'
import ModalRatingAppointment from './ModalRatingAppointment';
import TempModal from './TempModal';
import ModalViewMedicalRecord from './ModalViewMedicalRecord';
import ModalAnnounceCancel from './ModalAnnounceCancel';
import ModalWaiting from './ModalWaiting';
import { toast } from 'react-toastify';
class UserAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalRating: false,
            isOpenViewMedicalRecord: false,
            PatientAppointment: [],
            deleteSuccessLoadAgain: false,
            ratingBookingId: '',
            viewingBookingId: '',
            doctorId: '',
            bookingDate: '',
            isOpenModalAnnounce: false,
            CancelSuccess: false,
            isOpenModalWaiting: false
        }
    }
    async componentDidMount() {
        let { userInfo } = this.props
        let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id)
        if (UserAppointment && UserAppointment.length > 0) {
            this.setState({
                PatientAppointment: UserAppointment
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userInfo !== this.props.userInfo) {
            let { userInfo } = this.props
            let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id)
            if (UserAppointment && UserAppointment.length > 0) {
                this.setState({
                    PatientAppointment: UserAppointment
                })
            }
        }
        if (prevState.deleteSuccessLoadAgain !== this.state.deleteSuccessLoadAgain) {
            let { userInfo } = this.props
            let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id)
            if (UserAppointment && UserAppointment.length > 0) {
                this.setState({
                    PatientAppointment: UserAppointment
                })
            }
        }
        if (prevState.isOpenModalRating !== this.state.isOpenModalRating) {
            let { userInfo } = this.props
            let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id)
            if (UserAppointment && UserAppointment.length > 0) {
                this.setState({
                    PatientAppointment: UserAppointment
                })
            }
        }
        if (prevState.isOpenViewMedicalRecord !== this.state.isOpenViewMedicalRecord) {
            let { userInfo } = this.props
            let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id)
            if (UserAppointment && UserAppointment.length > 0) {
                this.setState({
                    PatientAppointment: UserAppointment
                })
            }
        }

    }
    RatingTime(index, doctorId) {
        this.setState({
            ratingBookingId: index,
            doctorId: doctorId,
            isOpenModalRating: true,
        })
    }
    ViewingTime(index, bookingDate) {
        this.setState({
            bookingDate: bookingDate,
            viewingBookingId: index,
            isOpenViewMedicalRecord: true,
        })
    }
    closeRatingModal = () => {
        this.setState({
            isOpenModalRating: false
        })
    }
    closeViewMedicalRecordModal = () => {
        this.setState({
            isOpenViewMedicalRecord: false
        })
    }
    closeAnnouncementModal = () => {
        this.setState({
            isOpenModalAnnounce: false
        })
    }
    async CancelBooking(bookingId, PatientAppointment) {
        this.setState({
            isOpenModalWaiting: true
        })
        let res = await cancelBookingFromPatient({ id: bookingId })
        console.log('check cancelled', res)
        if (res && res.errCode === 1) {
            this.setState({
                isOpenModalAnnounce: true,
                isOpenModalWaiting: false,
            })
        }
        if (res && res.errCode === 0) {
            let { userInfo } = this.props
            let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id)
            if (UserAppointment && UserAppointment.length > 0) {
                this.setState({
                    PatientAppointment: UserAppointment,
                    isOpenModalAnnounce: false,
                    isOpenModalWaiting: false,
                })
            }
            toast.success('Bạn đã hủy hẹn thành công')
        }
        PatientAppointment = this.props.PatientAppointment
    }
    render() {
        let { isOpenModalRating, PatientAppointment, ratingBookingId, isOpenViewMedicalRecord, isOpenModalWaiting, viewingBookingId, doctorId, bookingDate, isOpenModalAnnounce, CancelSuccess } = this.state
        let { userInfo } = this.props

        return (
            <div className='patient-appointment'>
                <ModalWaiting
                    isOpenModalWaiting={isOpenModalWaiting} />
                <ModalAnnounceCancel
                    isOpenModalAnnounce={isOpenModalAnnounce}
                    closeAnnouncementModal={this.closeAnnouncementModal}
                />
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
                                    return (
                                        <tr key={index}>
                                            <td>{item?.bookingDate}</td>
                                            <td>{item?.forWho}</td>
                                            <td>{item?.prognostic}</td>
                                            <td>{item?.doctorInfoData?.firstName} {item.doctorInfoData?.lastName} <span> ({item?.doctorInfoData?.Doctor_Infor?.nameSpecialty}) </span></td>
                                            <td>
                                                <div>
                                                    {item?.doctorInfoData?.Doctor_Infor?.addressClinic}
                                                </div>
                                                <div>
                                                    {item?.doctorInfoData?.Doctor_Infor?.nameClinic}
                                                </div>
                                            </td>
                                            <td>
                                                {item.statusId === 'S1' ? 'Bạn hãy xác nhận thông tin lịch hẹn ở email đã đăng ký nhé' : item.statusId === 'S4' ? 'Bạn đã hủy hẹn' :
                                                    item.statusId === 'S2' ?
                                                        <button onClick={() => this.CancelBooking(item.id, PatientAppointment)} className='mp-btn-cancel'>
                                                            Hủy hẹn
                                                        </button>
                                                        :
                                                        item.statusId === 'S3' ?
                                                            <>
                                                                <div>
                                                                    <button
                                                                        onClick={() => this.RatingTime(item.id, item.doctorId)}
                                                                        hidden={item.statusId === 'S5' ? true : false}
                                                                        className='mp-btn-rate'>
                                                                        Đánh giá
                                                                        <ModalRatingAppointment
                                                                            doctorId={doctorId}
                                                                            RatingInfor={item}
                                                                            id={userInfo.id}
                                                                            bookingId={ratingBookingId}
                                                                            closeRatingModal={this.closeRatingModal}
                                                                            isOpenModalRating={isOpenModalRating} />
                                                                    </button>
                                                                </div>
                                                                < div >
                                                                    <button
                                                                        onClick={() => this.ViewingTime(item.id, item.bookingDate)}
                                                                        className='mp-btn-remedy'>
                                                                        <ModalViewMedicalRecord
                                                                            bookingDate={bookingDate}
                                                                            closeViewMedicalRecordModal={this.closeViewMedicalRecordModal}
                                                                            viewingBookingId={viewingBookingId}
                                                                            isOpenViewMedicalRecord={isOpenViewMedicalRecord}
                                                                        />
                                                                        Xem bệnh án
                                                                    </button>
                                                                </div>
                                                            </>
                                                            :
                                                            item.statusId === 'S5' ?
                                                                < div >
                                                                    <button
                                                                        onClick={() => this.ViewingTime(item.id)}
                                                                        className='mp-btn-remedy'>
                                                                        <ModalViewMedicalRecord
                                                                            closeViewMedicalRecordModal={this.closeViewMedicalRecordModal}
                                                                            viewingBookingId={viewingBookingId}
                                                                            isOpenViewMedicalRecord={isOpenViewMedicalRecord}
                                                                        />
                                                                        Xem bệnh án
                                                                    </button>
                                                                </div> : ''
                                                }

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

            </div >
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
        fetchUsersRedux: () => { dispatch(actions.fetchAllUsersStart()) },


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAppointment);
