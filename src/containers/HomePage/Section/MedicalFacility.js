import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './MedicalFacility.scss';
import Slider from 'react-slick';
import * as actions from "../../../store/actions";
import { withRouter } from 'react-router';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrMedicalFacilities: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapShot) {
        console.log(this.state.allClinics)
        if (prevProps.allClinics !== this.props.allClinics) {
            this.setState({
                arrMedicalFacilities: this.props.allClinics,
            })
        }
    }
    componentDidMount() {
        this.props.loadAllClinics();
    }
    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }
    render() {
        let arrMedicalFacilities = this.state.arrMedicalFacilities;

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='tittle-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrMedicalFacilities && arrMedicalFacilities.length > 0
                                &&
                                arrMedicalFacilities.map((item, index) => {
                                    return (
                                        // <div className='section-customize'>
                                        <div className='section-customize clinic-child' key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}
                                        >
                                            <div className='bg-image section-clinic'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='clinic-name'> {item.name}</div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allClinics: state.admin.allClinics,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllClinics: () => dispatch(actions.fetchAllClinics())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
