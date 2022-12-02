import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói gì về Taylor Swift

                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="350px"
                            src="https://www.youtube.com/embed/3CBhrZf2AKM"
                            title="Taylor Swift -  I Did Something Bad (Live at #reputation Stadium Tour 2018)"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>

                        </iframe>
                    </div>
                    <div className='content-right'>
                        <div>
                            wefbwifebiuk
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
