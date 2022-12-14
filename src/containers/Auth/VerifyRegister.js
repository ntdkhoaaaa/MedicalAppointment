import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import HomeHeader from '../HomePage/HomeHeader';
import { postVerifyRegister } from '../../services/userServices'
import './VerifyRegister.scss'
class VerifyRegister extends Component {
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
            let res = await postVerifyRegister({
                token: token,
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
                                        <p>Tài khoản của bạn đã được đăng ký thành công!! </p>
                                        <p>Vui lòng đăng nhập để sử dụng dịch vụ </p>
                                        <p>Cảm ơn đã sử dụng dịch vụ đặt lịch khám bệnh trực tuyến KMP</p>

                                    </div>
                                    :
                                    <div className='verify-confirm-fail'>
                                        <p>Tài khoản không hợp lệ vui lòng thử lại!</p>
                                        <p>Cảm ơn đã sử dụng dịch vụ đặt lịch khám bệnh trực tuyến KMP</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyRegister);
