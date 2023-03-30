import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import './HomePage.scss';
import { USER_ROLE } from '../../utils'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
class HomePage extends Component {


    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        let { permission } = this.props;
        if (permission === USER_ROLE.ADMIN) {
            return (
                <Redirect to={'/system/user-redux'} />
            )
        }
        if (permission === USER_ROLE.DOCTOR) {
            return (
                <Redirect to={'/doctor/manage-schedule'} />
            )
        }
        if (permission === USER_ROLE.ACCOUNTANT) {
            return (
                <Redirect to={'/accountant/manage-clinic'} />
            )
        }
        return (
            <>

                {!this.props.isLoggedIn || (this.props.isLoggedIn && this.props.permission) ?
                    <div>
                        <HomeHeader isShowBanner={true} />
                        <Specialty settings={settings} />
                        <MedicalFacility settings={settings} />
                        <OutstandingDoctor settings={settings} />
                        <HandBook settings={settings} />
                        <About settings={settings} />
                        <HomeFooter />
                    </div> : <div>loading....</div>


                }

            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        permission: state.user.permission,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
