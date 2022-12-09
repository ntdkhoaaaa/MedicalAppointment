import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userServices'
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                })
            }

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        // 
        let { detailDoctor } = this.state;
        let { language } = this.props;
        let nameVi, nameEn;
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi},${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn},${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        // console.log('check markdown', detailDoctor.Markdown.description);
        return (
            <>
                {!this.props.isLoggedIn || (this.props.isLoggedIn && this.props.permission) ?
                    <>
                        <HomeHeader
                            isShowBanner={false} />
                        <div className='doctor-detail-container'>
                            <div className='intro-doctor'>
                                <div className='content-left'>
                                    <div className='image' style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}>

                                    </div>
                                </div>
                                <div className='content-right'>
                                    <div className='Up'>
                                        {language === LANGUAGES.VI ? nameVi : nameEn}
                                    </div>
                                    <div className='Down'>
                                        {detailDoctor.Markdown &&
                                            detailDoctor.Markdown.description &&
                                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.description }}>

                                            </div>}
                                    </div>
                                </div>
                            </div>
                            <div className='schedule-doctor'>
                                <div className='content-left'>
                                    <DoctorSchedule
                                        doctorIdFromParent={this.state.currentDoctorId} />
                                </div>
                                <div className='content-right'>
                                    <DoctorExtraInfor
                                        doctorIdFromParent={this.state.currentDoctorId} />
                                </div>
                            </div>
                            <div className='detail-infor-doctor'>
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                                    &&
                                    <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>

                                    </div>}
                            </div>
                            <div className='comment-doctor'>
                            </div>
                        </div>
                    </> : <div>loading...</div>

                }


            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        permission: state.user.permission,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
