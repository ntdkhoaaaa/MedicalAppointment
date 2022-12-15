import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { Modal } from 'reactstrap';
import { getMedicalRecordByBookingId } from '../../../services/userServices';
import ProfileDoctor from '../Doctor/ProfileDoctor';
class ModalViewMedicalRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Record: {}
        }
    }
    async componentDidMount() {
        let { viewingBookingId } = this.props
        let res = await getMedicalRecordByBookingId(viewingBookingId)
        if (res && res.errCode === 0) {
            this.setState({
                Record: res.historyInfo
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.viewingBookingId !== prevProps.viewingBookingId) {
            let { viewingBookingId } = this.props
            let res = await getMedicalRecordByBookingId(viewingBookingId)
            if (res && res.errCode === 0) {
                this.setState({
                    Record: res.historyInfo
                })
            }
        }
    }
    render() {
        let { viewingBookingId, isOpenViewMedicalRecord, closeViewMedicalRecordModal, bookingDate } = this.props
        let { Record } = this.state

        return (
            <Modal
                toggle={closeViewMedicalRecordModal}
                isOpen={isOpenViewMedicalRecord}
                className='modal-view-medical-record'>
                <div>
                    <div className='doctor-infor'>
                        {Record &&
                            <ProfileDoctor
                                doctorId={Record.Booking?.doctorId}
                                isShowDescription={false}
                                // dataTime={RatingInfor.timeType}
                                isShowPrice={true}
                                isShowDetail={false}
                            />}

                    </div>
                    <div className="row">
                        <div className="col-12 form-group">
                            <label>Bệnh án</label>
                            <textarea
                                className="form-control"
                                value={Record.medicalRecords}
                            ></textarea>
                        </div>
                        <div className="col-12 form-group">
                            <label>Kê đơn thuốc</label>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tên thuốc</th>
                                        <th scope="col">Đơn vị tính</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Record && Record.receiptData && Record?.receiptData.map((item, idx) => {
                                        return (
                                            <tr>
                                                <td>{idx}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="medicineName"
                                                        value={item.medicineName}

                                                        className="form-control"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="unit"
                                                        value={item.unit}

                                                        className="form-control"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        name="quantity"
                                                        min="1"
                                                        value={item.quantity}

                                                        className="form-control"
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                        </div>
                        <div className="col-6 form-group">
                            <label>Số ngày cấp</label>
                            <input
                                className="form-control"
                                type="number"
                                min="1"
                                value={Record.medicineRange}
                            ></input>
                        </div>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalViewMedicalRecord);
