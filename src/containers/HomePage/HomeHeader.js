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
import _, { upperCase } from 'lodash'
import { getListSearch } from '../../services/userServices'

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorFilter: [],
            doctorData: [],
            specialtyFilter: [],
            specialtyData: [],
            clinicFilter: [],
            clinicData: [],
        }
    }
    changeLanguage = (language) => {
        //fire redux event:action
        this.props.changeLanguageAppRedux(language)

    }
    async componentDidMount() {
        let res = await getListSearch();
        if (res && res.errCode === 0) {
            this.setState({
                doctorData: res.dataDoctor,
                specialtyData: res.dataSpecialty,
                clinicData: res.dataClinic
            })
        }
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
    searchData = (event) => {
        let keyword = event.target.value;
        let doctorFilter, specialtyFilter, clinicFilter;
        if (!_.isEmpty(keyword)) {
            keyword = upperCase(keyword)
            //get dataUser
            doctorFilter = this.state.doctorData.filter((item) => {
                return upperCase(item.lastName).includes(keyword) || upperCase(item.firstName).includes(keyword)
            })
            doctorFilter = doctorFilter.slice(0, 5).map(obj => ({ ...obj, link: `/detail-doctor/${obj.id}` }))


            specialtyFilter = this.state.specialtyData.filter((item) => {
                return upperCase(item.name).includes(keyword)
            })
            specialtyFilter = specialtyFilter.slice(0, 5).map(obj => ({ ...obj, link: `/detail-specialty/${obj.id}` }))


            clinicFilter = this.state.clinicData.filter((item) => {
                return upperCase(item.name).includes(keyword)
            })
            clinicFilter = clinicFilter.slice(0, 5).map(obj => ({ ...obj, link: `/detail-clinic/${obj.id}` }))

            this.setState({
                doctorFilter: doctorFilter,
                specialtyFilter: specialtyFilter,
                clinicFilter: clinicFilter
            })
        } else {
            this.setState({
                doctorFilter: [],
                specialtyFilter: [],
                clinicFilter: []
            })
        }

    }
    render() {
        let language = this.props.language;
        let userInfo = this.props.userInfo
        let isLoggedIn = this.props.isLoggedIn
        let processLogout = this.props.processLogout
        let { doctorFilter, specialtyFilter, clinicFilter } = this.state;

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
                                <div className='search-input'>
                                    <i className="fas fa-search"></i>
                                    <input type="text" placeholder='Tìm chuyên khoa khám bệnh' onChange={(event) => this.searchData(event)} />

                                </div>
                                <div className={(doctorFilter && doctorFilter.length > 0)
                                    || (specialtyFilter && specialtyFilter.length > 0)
                                    ? 'search-result' : ''}>
                                    {doctorFilter && doctorFilter.length > 0 &&
                                        <div className='header-search'>
                                            Thông tin bác sĩ
                                        </div>
                                    }
                                    {doctorFilter && doctorFilter.length > 0 &&
                                        doctorFilter.map((item, index) => {
                                            console.log('check image: ', item)
                                            return (
                                                <div className='result-search'>
                                                    <div className='image' style={{ backgroundImage: `url(${item && item.image ? item.image : ''})` }}>
                                                    </div>
                                                    <div className='name-link'>
                                                        <Link className='link' to={item.link} >
                                                            {item.lastName} {item.firstName}
                                                        </Link>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                    {specialtyFilter && specialtyFilter.length > 0 &&
                                        <div className='header-search'>
                                            Thông tin chuyên khoa
                                        </div>
                                    }
                                    {specialtyFilter && specialtyFilter.length > 0 &&
                                        specialtyFilter.map((item, index) => {
                                            return (
                                                <div className='result-search'>
                                                    <div className='image' style={{ backgroundImage: `url(${item && item.image ? item.image : ''})` }}>
                                                    </div>
                                                    <div className='name-link'>
                                                        <Link className='link' to={item.link} >
                                                            {item.name}
                                                        </Link>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                    {clinicFilter && clinicFilter.length > 0 &&
                                        <div className='header-search'>
                                            Thông tin phòng khám
                                        </div>
                                    }
                                    {clinicFilter && clinicFilter.length > 0 &&
                                        clinicFilter.map((item, index) => {
                                            return (
                                                <div className='result-search'>
                                                    <div className='image' style={{ backgroundImage: `url(${item && item.image ? item.image : ''})` }}>
                                                    </div>
                                                    <div className='name-link'>
                                                        <Link className='link' to={item.link} >
                                                            {item.name}
                                                        </Link>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
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
