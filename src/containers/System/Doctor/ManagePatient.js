import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getPatientScheduleForDoctor } from '../../../services/userServices'

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: '',
            currentDate: new Date()
        }
    }
    async componentDidMount() {

    }
    getSelectedScheduleforDoctor = async () => {
        let { selectedDoctor, currentDate } = this.state;

        // rangeTime.map(item => {
        //     item.isSelected = false;
        //     return item;
        // })
        let formatedDate = new Date(currentDate).getTime()
        if (this.props.userInfo.id) {
            let res = await getPatientScheduleForDoctor(
                this.props.userInfo.id,
                formatedDate.toString(),
            )
            console.log('log: res', res)
            // if (res && res.errCode === 0) {
            //     this.setState({
            //         isSelectedSchedule: res.data ? res.data : []
            //     })
            // }
            // rangeTime.map(item => {
            //     this.checkIsSelected(item)
            //     return item;
            // })
            // this.setState({
            //     rangeTime: rangeTime
            // })
        }
    }
    handleOnChangeDataPicker = async (date) => {
        this.setState({
            currentDate: date[0]
        })
        this.getSelectedScheduleforDoctor();
        // let { selectedDoctor, currentDate, rangeTime } = this.state;


        // rangeTime.map(item => {
        //     item.isSelected = false;
        //     return item;
        // })
        // let formatedDate = new Date(currentDate).getTime()
        // if (selectedDoctor) {
        //     let res = await getSelectedSchedule(
        //         selectedDoctor.value,
        //         formatedDate.toString(),
        //     )

        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             isSelectedSchedule: res.data ? res.data : []
        //         })
        //     }
        //     rangeTime.map(item => {
        //         this.checkIsSelected(item)
        //         return item;
        //     })
        //     this.setState({
        //         rangeTime: rangeTime
        //     })
        // }

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        console.log('props', this.props)
        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            className='form-control'
                            onChange={this.handleOnChangeDataPicker}
                            value={this.state.currentDate}
                            minDate={yesterday}
                        />
                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
