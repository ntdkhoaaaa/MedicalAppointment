import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import { withRouter } from 'react-router';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicById } from '../../../services/userServices'
import _ from 'lodash';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
            dataDetailClinic: {},
        }
    }
    async componentDidMount() {
        let { arrDoctors } = this.state
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailClinicById({
                id: id,
            })
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoc = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.clinicData
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoc.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctors: arrDoc
                })
            }
            console.log('check res', res)

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    // handleOnChangeProvince = async (event) => {
    //     if (this.props.match && this.props.match.params && this.props.match.params.id) {
    //         let id = this.props.match.params.id;
    //         let location = event.target.value;
    //         let res = await getDetailClinicById({
    //             id: id,
    //             location: location
    //         })
    //         console.log('res selection', res)
    //         if (res && res.errCode === 0) {
    //             let data = res.data;
    //             let arrDoc = [];
    //             if (data && !_.isEmpty(res.data)) {
    //                 let arr = data.specialtyData
    //                 if (arr && arr.length > 0) {
    //                     arr.map(item => {
    //                         arrDoc.push(item.doctorId)
    //                     })
    //                 }
    //             }
    //             this.setState({
    //                 arrDoctors: arrDoc
    //             })
    //         }
    //         else {
    //             this.setState({
    //                 arrDoctors: []
    //             })
    //         }
    //     }
    // }
    render() {
        let { arrDoctors, dataDetailClinic } = this.state;
        console.log('render', dataDetailClinic)
        let { language } = this.props
        console.log('render', this.state)
        return (
            <div className='detail-clinic-container'>
                <HomeHeader />
                <div className='detail-clinic-body'>
                    <div className='header-description'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                            &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>

                            </div>
                        }
                    </div>
                    <div className='province-selection'>
                        {/* <select onChange={(event) => this.handleOnChangeProvince(event)}>
                            {provinceList && provinceList.length > 0 &&
                                provinceList.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })}
                        </select> */}
                    </div>
                    <div>
                        {arrDoctors && arrDoctors.length > 0 ?
                            arrDoctors.map((item, index) => {
                                return (<div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescription={true}
                                            isShowDetail={true}
                                            isShowPrice={false}
                                        />
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item} />
                                        </div>

                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item} />
                                        </div>
                                    </div>
                                </div>)
                            })
                            :
                            <div>
                                Hiện chưa có bác sĩ của hệ thống đăng ký khu vực này
                            </div>
                        }
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailClinic));
