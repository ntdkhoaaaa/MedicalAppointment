import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import HomeHeader from '../HomePage/HomeHeader';
import { postVerifyBooking } from '../../services/userServices'
import './VerifyEmail.scss'
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isThatTrue: false,
            errCode: 0
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBooking({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    isThatTrue: true,
                    errCode: res.errCode
                })
            }
            else {
                this.setState({
                    isThatTrue: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    render() {
        let { isThatTrue, errCode } = this.state
        return (
            <>
                <HomeHeader></HomeHeader>
                <div className='verify'>
                    {
                        isThatTrue === false ?
                            <div className='verify-fail'>
                                
                            </div>
                            :
                            <div className='verify-succeed'>
                                {+errCode === 0 ?
                                    <div className='verify-confirm-succeed'>
                                        <p>L???ch h???n ???? ???????c x??c nh???n. </p>
                                        <p>C???m ??n ???? s??? d???ng d???ch v??? ?????t l???ch kh??m b???nh tr???c tuy???n KMP</p>

                                    </div>
                                    :
                                    <div className='verify-confirm-fail'>
                                        <p>L???ch h???n kh??ng t???n t???i ho???c ???? ???????c x??c nh???n tr?????c ????. </p>
                                        <p>C???m ??n ???? s??? d???ng d???ch v??? ?????t l???ch kh??m b???nh tr???c tuy???n KMP</p>
                                    </div>
                                }
                            </div>
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
