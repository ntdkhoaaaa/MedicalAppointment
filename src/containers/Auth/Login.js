import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userServices';
import { Link, Redirect } from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }
    handleOnChangeUserName = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                console.log('from login ',data.user);
                this.props.userLoginSuccess(data.user, data.accessToken, data.refreshToken)
                console.log('success')
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
        }
    }
    handleRegister = ()=> {
        const { navigate } = this.props;
        const redirectPath = "/register";
        navigate(`${redirectPath}`);
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }
    handleKeyDown = (event) => {
        // console.log('keydown', event)
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 text-center text-login'>
                            Login
                        </div>
                        <div className='col-12 from-group login-input'>
                            <label>Username</label>
                            <input type='text'
                                className='form-control'
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUserName(event)}
                                onKeyDown={(event) => this.handleKeyDown(event)} />
                        </div>
                        <div className='col-12 from-group login-input'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                    // value={this.state.password}
                                    onChange={(event) => { this.handleOnChangePassword(event) }}
                                    onKeyDown={(event) => this.handleKeyDown(event)} />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye' : "fas fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 '>
                            <button 
                            className='btn-login' 
                            onClick={() => { this.handleLogin() }}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                  this.handleLogin()
                                }
                              }}
                            >
                                Login
                            </button>
                        </div>

                        
                        <div className='col-12'>
                            <span className='forgetpassword'><Link to='/forgot-password'>Forget your password</Link></span>
                        </div>
                        {/* <div className='col-12 text-center mt-3'>
                            <span className='text-otherlogin'>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div> */}
                        <div className='col-12 social-login'>
                            <button className='btn-register' onClick={() => { this.handleRegister() }}>
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        permission: state.user.permission
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor, accessToken, refreshToken) => dispatch(actions.userLoginSuccess(userInfor, accessToken, refreshToken)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
