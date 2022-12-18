import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import _, { result, times } from 'lodash';
import { toast } from "react-toastify";
import { saveBulkScheduleDoctor, getSelectedScheduleFromDoctor } from '../../../services/userServices'
import ModalCancelSchedule from './ModalCancelSchedule'
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctocs: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
            isSelectedSchedule: [],
            isOpenModalCanceSchedule: false,
            selectedItem: '',
            selectedButton: '',
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctocs: dataSelect,
                selectedDoctor: dataSelect[1]
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false, isFullAppointment: false, isBooked: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        console.log('data ', inputData)
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                console.log('vao dayyy')
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        console.log('dataa', result)
        return result;
    }
    handleChange = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
        let { currentDate, rangeTime, isSelectedSchedule } = this.state;
        if (currentDate) {
            rangeTime.map(item => {
                item.isSelected = false;
                return item;
            })
            let formatedDate = new Date(currentDate).getTime()
            if (selectedOption) {
                let res = await getSelectedScheduleFromDoctor(
                    selectedOption.value,
                    formatedDate.toString(),
                )
                if (res && res.errCode === 0) {
                    this.setState({
                        isSelectedSchedule: res.data ? res.data : []
                    })
                }
                console.log('check isSelectedSchedule', isSelectedSchedule)

                rangeTime.map(item => {
                    this.checkIsSelected(item)
                    return item;
                })
                this.setState({
                    rangeTime: rangeTime
                })
            }
        }
    };
    checkIsSelected = (item) => {
        let { isSelectedSchedule } = this.state;
        console.log('isSelectedSchedule', isSelectedSchedule)
        if (isSelectedSchedule && isSelectedSchedule.length !== 0) {
            isSelectedSchedule?.nobooking.forEach((element) => {
                if (element.timetype === item.keyMap) {
                    item.isSelected = true;
                }
            })
            isSelectedSchedule?.booked.forEach((element) => {
                if (element.timetype === item.keyMap) {
                    item.isFullAppointment = true;
                }
            })
            isSelectedSchedule?.full.forEach((element) => {
                if (element.timetype === item.keyMap) {
                    item.isBooked = true;
                }
            })
        }

    }
    getSelectedScheduleforDoctor = async () => {
        let { selectedDoctor, currentDate, rangeTime } = this.state;

        rangeTime.map(item => {
            item.isSelected = false;
            item.isFullAppointment = false;
            item.isBooked = false;
            return item;
        })
        let formatedDate = new Date(currentDate).getTime()
        if (selectedDoctor) {
            let res = await getSelectedScheduleFromDoctor(
                selectedDoctor.value,
                formatedDate.toString(),
            )

            if (res && res.errCode === 0) {
                this.setState({
                    isSelectedSchedule: res.data ? res.data : []
                })
            }
            rangeTime.map(item => {
                this.checkIsSelected(item)
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })

        }
    }
    handleOnChangeDataPicker = async (date) => {
        this.setState({
            currentDate: date[0]
        })
        this.getSelectedScheduleforDoctor();
    }
    CheckCanceled = (data) => {
        if (data === true) {
            let { selectedButton, rangeTime } = this.state;
            if (rangeTime && rangeTime.length > 0) {
                rangeTime = rangeTime.map(item => {
                    if (item.id === selectedButton.id)
                        item.isSelected = !item.isSelected;
                    return item;
                })
                this.setState({
                    rangeTime: rangeTime
                })
            }
        }
    }
    handleClickBtnTime = (time) => {
        let { rangeTime, isSelectedSchedule } = this.state;
        if (time.isSelected === true) {
            this.setState({
                isOpenModalCanceSchedule: true,
                selectedButton: time
            })
            isSelectedSchedule?.nobooking.forEach(schedule => {
                if (schedule.timetype === time.keyMap) {
                    this.setState({
                        selectedItem: schedule,
                    })
                }
            })
        }
        else {
            if (rangeTime && rangeTime.length > 0) {
                rangeTime = rangeTime.map(item => {
                    if (item.id === time.id)
                        item.isSelected = !item.isSelected;
                    return item;
                })
                this.setState({
                    rangeTime: rangeTime
                })
            }
        }

    }
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error('Invalid date!');
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid selected doctor!')
            return;
        }
        let formatedDate = new Date(currentDate).getTime()
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timetype = schedule.keyMap;
                    object.picked_date = formatedDate;
                    result.push(object);
                })
            } else {
                toast.error('Invalid selected item!');
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatedDate
        });
        if (res && res.errCode === 0) {
            toast.success('save Bulk Schedule Doctor success');
        }
        else {
            toast.error('error save Bulk Schedule Doctor');
        }
        this.getSelectedScheduleforDoctor();

    }
    toggleFromParent = () => {
        this.setState({
            isOpenModalCanceSchedule: !this.state.isOpenModalCanceSchedule,
        })
    }
    render() {
        let { permission } = this.props;
        if (permission === 'R3') {
            return (
                <Redirect to='/home' />
            )
        }
        let { rangeTime, isOpenModalCanceSchedule, selectedItem } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        console.log('range time', rangeTime)
        return (
            <div className='manage-schedule-container'>
                <ModalCancelSchedule
                    isOpen={isOpenModalCanceSchedule}
                    toggleFromParent={this.toggleFromParent}
                    selectedItem={selectedItem}
                    CheckCanceled={this.CheckCanceled} />
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctocs} />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                className='form-control'
                                onChange={this.handleOnChangeDataPicker}
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            key={index}
                                            className={item.isSelected === true ? 'btn btn-schedule active' : item.isBooked === true ?
                                                'btn btn-schedule booked' : item.isFullAppointment === true ? 'btn btn-schedule full' : 'btn btn-schedule'}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='color-description'>
                            <div className='color-active'>
                                <span className='summary-status-active'><i className='fas fa-circle'></i> Lịch trống</span>
                            </div>
                            <div className='color-booked'>
                                <span className='summary-status-booked'><i className='fas fa-circle'></i> Đã đặt</span>
                            </div>
                            <div className='color-full'>
                                <span className='summary-status-full'><i className='fas fa-circle'></i> Đã kín</span>
                            </div>

                        </div>
                        <div className='col-12'>
                            <button
                                onClick={() => this.handleSaveSchedule()}
                                className='btn btn-primary btn-save-schedule'>
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>

                    </div>
                </div>
            </div >
        );
    }
}



const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
        permission: state.user.permission,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
