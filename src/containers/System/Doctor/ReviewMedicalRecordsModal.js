import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ConfirmtoPatientModal.scss";
import Lightbox from "react-image-lightbox";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "../../Patient/Doctor/ProfileDoctor";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { getMedicalRecordByBookingId } from "../../../services/userServices";
import { toast } from "react-toastify";
import ProfileUser from "./ProfileUser";

class ConfirmtoPatientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Record: {}
        };
    }
    async componentDidMount() {
        let { bookingId } = this.props
        let res = await getMedicalRecordByBookingId(bookingId)
        if (res && res.errCode === 0) {
            this.setState({
                Record: res.historyInfo
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.bookingId !== prevProps.bookingId) {
            let { bookingId } = this.props
            let res = await getMedicalRecordByBookingId(bookingId)
            if (res && res.errCode === 0) {
                this.setState({
                    Record: res.historyInfo
                })
            }
        }
    }
    render() {
        let { Record } = this.state;
        let { isOpenModalReview, closeReviewModal, dataTime, bookingId } = this.props;
        let patientId = dataTime && !_.isEmpty(dataTime) ? dataTime.patientId : "";
        console.log('records', Record)
        return (
            <Modal
                isOpen={isOpenModalReview}
                size="lg"
                centered={true}
                backdrop={true}
                toggle={closeReviewModal}
                className="review-medical-record-modal-container"
            >
                <div className="review-modal-content">
                    <div className="review-modal-body">
                        <div className="doctor-infor">
                            <ProfileUser patientId={patientId} />
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
                                    value={Record.medicineRange}
                                    className="form-control"
                                    type="number"
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGendersStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmtoPatientModal);
