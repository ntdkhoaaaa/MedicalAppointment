import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import Slider from 'react-slick';
import { LANGUAGES } from "../../../utils"
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='tittle-section'><FormattedMessage id="homepage.outstanding-doctor" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.for-more" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let nameVi = `${item.positionData.valueVi},${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn},${item.firstName} ${item.lastName}`;
                                    return (<div className='section-customize' key={index}
                                        onClick={() => this.handleViewDetailDoctor(item)}>
                                        <div className='customize-border'>
                                            <div className='outer-bg'>
                                                <div className='bg-image section-outstanding-doctor '
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                />
                                            </div>
                                            <div className='position text-center'>
                                                <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div> Gan mật tụy</div>
                                            </div>
                                        </div>
                                    </div>)
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
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));