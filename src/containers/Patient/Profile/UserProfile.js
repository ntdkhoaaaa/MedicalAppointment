import React, { Component, useState } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, CommonUtils, USER_ROLE } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import { getAllUsers, editUserInforByOwnService, getAllAppointmentOfPatient } from '../../../services/userServices';
import './UserProfile.scss'
import * as actions from "../../../store/actions"
import { EditUserInforByOwn } from '../../../store/actions';
import { Redirect, withRouter } from 'react-router';
import UserAppointment from './UserAppointment';
import { toast } from "react-toastify";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: '',
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            avatar: '',
            previewImgURL: '',
            PatientAppointment: []
        }
    }
    async componentDidMount() {
        // console.log(this.props.userInfo)
        let { userInfo } = this.props

        let response = await getAllUsers(userInfo?.id);
        let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id)
        if (response && response.errCode === 0) {
            this.setState({
                email: response.users?.email,
                firstName: response.users?.firstName,
                lastName: response.users?.lastName,
                phoneNumber: response.users?.phoneNumber,
                address: response.users?.address,
                gender: response.users?.gender,
                avatar: response.users?.image,
                previewImgURL: response.users?.image
            })
        }
        if (UserAppointment && UserAppointment.length > 0) {
            this.setState({
                PatientAppointment: UserAppointment
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.userInfo !== prevProps.userInfo) {
            let { userInfo } = this.props

            let response = await getAllUsers(userInfo?.id);
            if (response && response.errCode === 0) {

                this.setState({
                    email: response.users?.email,
                    firstName: response.users?.firstName,
                    lastName: response.users?.lastName,
                    phoneNumber: response.users?.phoneNumber,
                    address: response.users?.address,
                    gender: response.users?.gender,
                    avatar: response.users?.image,
                    previewImgURL: response.users?.image
                })
            }
            let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id)
            if (UserAppointment && UserAppointment.length > 0) {
                this.setState({
                    PatientAppointment: UserAppointment
                })
            }
        }

    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }
    setGenderCheck =    (gender) => {
        this.setState({
            gender: gender.gender
        })
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }
    async SaveBasicInfor() {
        let gender = this.state.gender;
        if (gender === 'male') {
            gender = 'M'
        }
        if (gender === 'female') {
            gender = 'F'
        }
        if (gender === 'other') {
            gender = 'O'
        }
        let user = {
            id: this.props.userInfo.id,
            email: this.state.email,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: gender,
            avatar: this.state.avatar
        }
        let res = await editUserInforByOwnService(user)
        if (res && res.errCode === 0) {
            toast.success('Cập nhật thông tin thành công')
        }
        else {
            toast.error('Cập nhật thông tin không thành công.Xem lại thông tin và hình ảnh theo quy định')
        }
    }
    render() {
        let { language, permission, isLoggedIn } = this.props

        let genderCheck = this.state.gender
        if (genderCheck === 'M') {
            genderCheck = 'male'
        }
        if (genderCheck === 'F') {
            genderCheck = 'female'
        }
        if (genderCheck === 'O') {
            genderCheck = 'other'
        }
        let { email, firstName, lastName, phoneNumber, address, previewImgURL, PatientAppointment } = this.state
        const genderArr = [
            {
                id: 1,
                gender: 'male',
            },
            {
                id: 2,
                gender: 'female',
            },
            {
                id: 3,
                gender: 'other',
            }
        ]
        if (!isLoggedIn) {
            return (
                <Redirect to='/login' />
            )
        }
        if (permission === USER_ROLE.ADMIN) {
            return (
                <Redirect to='/system/user-redux' />
            )
        }
        if (permission === USER_ROLE.DOCTOR) {
            return (
                <Redirect to='/doctor/manage-schedule' />
            )
        }
        if (permission === USER_ROLE.ACCOUNTANT) {
            return (
                <Redirect to='/accountant/manage-clinic' />
            )
        }
        return (
            <>
                {
                    this.props.permission ?
                        <>
                            <HomeHeader
                                isShowBanner={false} />
                            <div className='user-detail-container'>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-4 ">
                                                    <input className='preview-img' type='file'
                                                        style={{ backgroundImage: `url(${previewImgURL})` }}
                                                        onChange={(event) => this.handleOnChangeImage(event)} />
                                                </div>
                                                <div class="col-8 content-right">
                                                    <h3>
                                                        {lastName} {firstName}
                                                    </h3>
                                                    <div>
                                                        <label className='sub-title'><span><i class="fas fa-map-marker-alt"></i> Địa chỉ </span> </label>
                                                        <input
                                                            onChange={(event) => { this.onChangeInput(event, 'address') }}
                                                            className='each-input'
                                                            defaultValue={address} />
                                                    </div>
                                                    <div>
                                                        <label className='sub-title'><span><i class="far fa-envelope"></i> Email </span> </label>
                                                        <input
                                                            onChange={(event) => { this.onChangeInput(event, 'email') }}
                                                            className='each-input'
                                                            defaultValue={email} />
                                                    </div>
                                                    <div>
                                                        <label className='sub-title'><span><i class="fas fa-phone"></i> Điện thoại </span> </label>
                                                        <input
                                                            onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                                            className='each-input'
                                                            defaultValue={phoneNumber} />
                                                    </div>

                                                    <div className="gender mg">
                                                        <label>Giới tính</label>
                                                        <div className="radio-group"
                                                        >
                                                            {genderArr.map(gender => (
                                                                <div key={gender.id} className='male'
                                                                >
                                                                    <input type="radio"
                                                                        onChange={() => this.setGenderCheck(gender)}
                                                                        checked={genderCheck === gender.gender}
                                                                    />
                                                                    <label >{gender.gender === 'male' ? 'Nam' :
                                                                        gender.gender === 'female' ? 'Nữ' : 'Khác'
                                                                    }</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button className='btn-confirm' onClick={() => this.SaveBasicInfor()}>Lưu</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='patient-appointment'>
                                <UserAppointment
                                />
                            </div>
                        </>
                        :
                        <div>
                            loading...
                        </div>
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
        permission: state.user.permission,
        isLoggedIn: state.user.isLoggedIn,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));
