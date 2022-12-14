import React, { Component, useState } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, CommonUtils } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import { getAllUsers, editUserInforByOwnService } from '../../../services/userServices';
import './ProfileUser.scss'
import * as actions from "../../../store/actions"
import { EditUserInforByOwn } from '../../../store/actions';
import { Redirect, withRouter } from 'react-router';
class ProfileUser extends Component {
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
            previewImgURL: ''
        }
    }
    async componentDidMount() {
        // console.log(this.props.userInfo)
        let { patientId } = this.props
        console.log('chheck redux user', patientId)

        let response = await getAllUsers(patientId);

        if (response && response.errCode === 0) {
            this.setState({
                email: response.users?.email,
                firstName: response.users?.firstName,
                lastName: response.users?.lastName,
                phoneNumber: response.users?.phoneNumber,
                address: response.users?.address,
                gender: response.users?.gender,
                previewImgURL: response.users?.image,
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.patientId !== prevProps.patientId) {
            let { patientId } = this.props
            let response = await getAllUsers(patientId);
            if (response && response.errCode === 0) {
                this.setState({
                    email: response.users?.email,
                    firstName: response.users?.firstName,
                    lastName: response.users?.lastName,
                    phoneNumber: response.users?.phoneNumber,
                    address: response.users?.address,
                    gender: response.users?.gender,
                    previewImgURL: response.users?.image,
                })
            }
        }
    }
    setGenderCheck = (gender) => {
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
        let { email, firstName, lastName, phoneNumber, address, previewImgURL } = this.state
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
        return (
            <>
                <div className='patient-detail-container'>
                    <div class="row">
                        <div class="col-12">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-3 avatar ">
                                        <input className='preview-img' disabled
                                            style={{ backgroundImage: `url(${previewImgURL})` }}
                                            read />
                                    </div>
                                    <div class="col-8 content-right">
                                        <h3>
                                            {lastName} {firstName}
                                        </h3>
                                        <div className='title'>
                                            <label className='sub-title'><span><i class="fas fa-map-marker-alt"></i> ?????a ch??? </span> </label>
                                            :<input
                                                readOnly
                                                className='each-input'
                                                defaultValue={address} />
                                        </div>
                                        <div className='title'>
                                            <label className='sub-title'><span><i class="far fa-envelope"></i> Email </span> </label>
                                            :<input
                                                readOnly
                                                className='each-input'
                                                defaultValue={email} />
                                        </div>
                                        <div className='title'>
                                            <label className='sub-title'><span><i class="fas fa-phone"></i> ??i???n tho???i </span> </label>
                                            :<input
                                                readOnly
                                                className='each-input'
                                                defaultValue={phoneNumber} />
                                        </div>

                                        <div className="gender mg">
                                            <label>Gi???i t??nh </label>
                                            <div className="radio-group"
                                            >
                                                {genderArr.map(gender => (
                                                    <div key={gender.id} className='male'
                                                    >
                                                        <input type="radio" disabled
                                                            checked={genderCheck === gender.gender}
                                                        />
                                                        <label >{gender.gender === 'male' ? 'Nam' :
                                                            gender.gender === 'female' ? 'N???' : 'Kh??c'
                                                        }</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileUser));
