import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/logo.svg'
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";

import { LANGUAGES } from "../../utils"
import { UserProfile } from "../Patient/Profile/UserProfile"
import { changeLanguageApp } from '../../store/actions/';
class HomeHeader extends Component {

    changeLanguage = (language) => {
        //fire redux event:action
        this.props.changeLanguageAppRedux(language)
    }
    componentDidMount() {
        // let userInfo = this.props.userInfo;
    }
    MoveToProfile = () => {
        if (this.props.history) {
            this.props.history.push(`/profile`)
        }
    }
    MoveToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    render() {
        let language = this.props.language;
        let userInfo = this.props.userInfo
        let isLoggedIn = this.props.isLoggedIn
        let processLogout = this.props.processLogout
        
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo} onClick={() => this.MoveToHome()} />
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><FormattedMessage id="homeheader.speciality" /></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><FormattedMessage id={"homeheader.health-facility"} /></div>
                                <div className='sub-title'><FormattedMessage id={"homeheader.select-facility"} /></div>
                            </div>
                            <div className='child-content'>
                                <div><FormattedMessage id={"homeheader.doctor"} /></div>
                                <div className='sub-title'><FormattedMessage id={"homeheader.Choose-a-good-doctor"} /></div>
                            </div>
                            <div className='child-content'>
                                <div><FormattedMessage id={"homeheader.Medical-package"} /></div>
                                <div className='sub-title'><FormattedMessage id={"homeheader.General-health-check"} /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="far fa-question-circle"></i><FormattedMessage id={"homeheader.Support"} /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                            <div hidden={!isLoggedIn} className='profile-user'>
                                <FormattedMessage id={"homeheader.hello"} /><span className='name-patient active' onClick={() => this.MoveToProfile()}>{userInfo?.firstName}</span>
                            </div>
                            <div hidden={!isLoggedIn} className="btn btn-logout" onClick={processLogout} title="Log out">
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                            <Link to='/login'>
                                <div hidden={isLoggedIn} className="btn btn-logout" title="Log out">
                                    <FormattedMessage id={"homeheader.login"} />
                                    <i class="fas fa-sign-in-alt"></i>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id={"banner.medical-platform"} /></div>
                            <div className='title2'><FormattedMessage id={"banner.comprehensive-health-care"} /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder='Tìm chuyên khoa khám bệnh' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="far fa-hospital"></i></div>
                                    <div className='text-child'><FormattedMessage id={"banner.speacialist-examination"} /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                    <div className='text-child'><FormattedMessage id={"banner.remote-examination"} /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-hospital-alt"></i></div>
                                    <div className='text-child'><FormattedMessage id={"banner.general-examination"} /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-flask"></i></div>
                                    <div className='text-child'><FormattedMessage id={"banner.medical-test"} /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fa fa-user-md"></i></div>
                                    <div className='text-child'><FormattedMessage id={"banner.spirit-health"} /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                                    <div className='text-child'><FormattedMessage id={"banner.dentis-examination"} /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
        permission: state.user.permission,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
