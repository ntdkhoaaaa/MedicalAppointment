import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ConfirmtoPatientModal.scss";
import Lightbox from "react-image-lightbox";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "../../Patient/Doctor/ProfileDoctor";
import _ from "lodash";
import Select from "react-select";
// import DatePicker from '../../../components/Input/DatePicker';
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import { LANGUAGES } from "../../../utils";
import { postPatientAppointment, postMedicalRecords } from "../../../services/userServices";
import { toast } from "react-toastify";
import moment from "moment/moment";
import UserProfile from "../../Patient/Profile/UserProfile";
import ProfileUser from "./ProfileUser";


class ConfirmtoPatientModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      medicalRecord: "",
      kedonthuoc: "",
      medicalRange: "",
      bookingId: '',
      receipts: [
        {
          medicineName: "",
          unit: "",
          quantity: "",
        },
      ],
    };
  }
  componentDidMount() {
  }
  handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const receipts = [...this.state.receipts];
    receipts[idx] = {
      ...receipts[idx],
      [name]: value,
    };
    this.setState({
      receipts,
    });
  };
  handleAddRow = () => {
    const item = {
      medicineName: "",
      unit: "",
      quantity: "",
    };
    this.setState({
      receipts: [...this.state.receipts, item],
    });
  };
  handleRemoveRow = () => {
    this.setState({
      receipts: this.state.receipts.slice(0, -1),
    });
  };
  handleRemoveSprcificRow = (idx) => () => {
    const receipts = [...this.state.receipts];
    receipts.splice(idx, 1);
    this.setState({ receipts });
  };
  handleOnChangeInput = (event, id) => {
    let inputValue = event.target.value;
    let copyState = { ...this.state };
    copyState[id] = inputValue;
    this.setState({
      ...copyState,
    });
  };
  async handleConfirmBooking(bookingId, closeBookingModal) {
    console.log('Medical Records', this.state, bookingId)
    let data = {
      bookingId: bookingId,
      medicalRecords: this.state.medicalRecord,
      medicineRange: this.state.medicalRange,
      receipts: this.state.receipts
    }
    let res = await postMedicalRecords(data)
    if (res && res.errCode === 0) {
      closeBookingModal()
      toast.success('Thêm đơn thuốc cho bệnh nhân thành công');
      // getDataPatient()
    }
  }
  render() {
    let { gender, receipts } = this.state;
    let { isOpenModal, closeBookingModal, dataTime, bookingId } = this.props;
    console.log('booking id', bookingId)
    let patientId = dataTime && !_.isEmpty(dataTime) ? dataTime.patientId : "";
    return (
      <Modal
        isOpen={isOpenModal}
        size="lg"
        centered={true}
        backdrop={true}
        toggle={closeBookingModal}
        className="medical-record-modal-container"
      >
        <div className="medical-record-modal-content">
          <div className="medical-record-modal-header">
            <span className="left">Nhập đơn thuốc khám bệnh</span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>

          <div className="medical-record-modal-body">
            {/* {JSON.stringify(dataTime)} */}
            <div className="doctor-infor">
              <ProfileUser patientId={patientId} />
            </div>
            <div className="row">
              <div className="col-12 form-group">
                <label>Thời gian khám</label>
                <span
                  className="form-control"
                >{dataTime.bookingDate}</span>
              </div>
              <div className="col-12 form-group">
                <label>Bệnh án</label>
                <textarea
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "medicalRecord")
                  }
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
                    {receipts.map((item, idx) => {
                      return (
                        <tr>
                          <td>{idx}</td>
                          <td>
                            <input
                              type="text"
                              name="medicineName"
                              value={receipts[idx].medicineName}
                              onChange={this.handleChange(idx)}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="unit"
                              value={receipts[idx].unit}
                              onChange={this.handleChange(idx)}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="quantity"
                              min="1"
                              value={receipts[idx].quantity}
                              onChange={this.handleChange(idx)}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={this.handleRemoveSprcificRow(idx)}
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>


                <button className="btn btn-success" onClick={this.handleAddRow}>Thêm dòng</button>
              </div>
              <div className="col-6 form-group">
                <label>Số ngày cấp</label>
                <input
                  className="form-control"
                  type="number"
                  min="1"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "medicalRange")
                  }
                ></input>
              </div>
            </div>
          </div>

          <div className="booking-modal-footer">
            <button
              className="btn-booking-comfirm"
              onClick={() => this.handleConfirmBooking(bookingId, closeBookingModal)}
            >
              Gửi
            </button>
            <button className="btn-booking-cancel" onClick={closeBookingModal}>
              Hủy
            </button>
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
