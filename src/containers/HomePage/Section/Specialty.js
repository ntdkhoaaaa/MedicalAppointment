import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions'

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css"
import { LANGUAGES } from "../../../utils"
import { withRouter } from 'react-router';
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSpecialties: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.allSpecialties !== this.props.allSpecialties) {
            this.setState({
                arrSpecialties: this.props.allSpecialties,
            })
        }
    }
    componentDidMount() {
        this.props.loadAllSpecialties();
    }
    handleViewDetailSpecialty(specialty) {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`)
        }

    }
    render() {
        let arrSpecialties = this.state.arrSpecialties;
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='tittle-section'><FormattedMessage id="homepage.popular-specialties" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.for-more" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrSpecialties && arrSpecialties.length > 0
                                &&
                                arrSpecialties.map((item, index) => {
                                    return (
                                        // <div className='section-customize'>
                                        <div className='section-customize specialty-child'
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                            key={index}>
                                            <div className='bg-image section-specialty'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='specialty-name'> {item.name}</div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>

                </div >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allSpecialties: state.admin.allSpecialties
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllSpecialties: () => dispatch(actions.fetchAllSpecialties())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
