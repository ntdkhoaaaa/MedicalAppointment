import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import DatePicker from '../../../components/Input/DatePicker';

import "./ManagePatient.scss";
import { getListPatientForDoctor } from '../../../services/userServices';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('days').valueOf(),
            dataPatient: []
        }
    }

    componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate)
    }
    getDataPatient = async (user, formatedDate) => {
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listusers !== this.props.listusers) {
            this.setState({
                userRedux: this.props.listusers,
            })
        }
    }
    handleOnChangeDatePicker = async (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formatedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formatedDate)
        })
    }
    render() {
        let { dataPatient } = this.state;
        return (
            <React.Fragment>
                <div className='manage-patient-container'>
                    <div className='m-p-title'>
                        Quản lý bệnh nhân khám bệnh
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group'>
                            <label>Chọn ngày</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                            />
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table style={{ width: '100%' }} >
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian</th>
                                        <th>Họ và Tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Action</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.timeTypeDataPatient.valueVi}</td>
                                                    <td>{`${item.patientData?.firstName} ${item.patientData?.lastName}`}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{item.patientData?.genderData?.valueVi}</td>
                                                    <td>
                                                        <button className='mp-btn-confirm'>
                                                            Xác nhận
                                                        </button>
                                                        <button className='mp-btn-remedy'>
                                                            Gửi hóa đơn
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            nodata
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersRedux: () => { dispatch(actions.fetchAllUsersStart()) },
        fetchDeleteUser: (id) => { dispatch(actions.deleteUser(id)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);