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
                    Dịch vụ khám bệnh từ xa 
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                    <iframe width="640" height="360" src="https://www.youtube.com/embed/QkRkFof25bQ" title="Dịch vụ khám bệnh từ xa giúp người bệnh tiết kiệm những gì?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <div>
                           Nguyễn Trần Đăng Khoa <span>19154035</span> 
                           <br/>
                           Đoàn Phan Bảo Phúc <span>19110265</span> 
                           <br/>
                           Đặng Thái Minh 19110241
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
