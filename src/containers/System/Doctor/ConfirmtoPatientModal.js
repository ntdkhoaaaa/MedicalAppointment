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
import {
  postPatientAppointment,
  postMedicalRecords,
} from "../../../services/userServices";
import { toast } from "react-toastify";
import moment from "moment/moment";
// import UserProfile from "../../Patient/Profile/UserProfile";
import ProfileUser from "./ProfileUser";

class ConfirmtoPatientModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      medicalRecord: "",
      kedonthuoc: "",
      medicalRange: "",
      bookingId: "",
      receipts: [
        {
          medicineName: "",
          unit: "",
          quantity: "",
          medicineCode: "",
        },
      ],
      listMedicineByClinicId: [],
      selectedMedicine: "",
    };
  }
  componentDidMount() {
    console.log(this.props);
    let dataSelectMedicine = this.buildDataInputSelect(
      this.props.dataMedicineByClinicId,
      "MEDICINE"
    );
    this.setState({
      listMedicineByClinicId: dataSelectMedicine,
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleChange = (idx) => (e) => {
    const { name, value } = e.target;
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
  async handleConfirmBooking(bookingId, closeBookingModal, date) {
    let data = {
      bookingId: bookingId,
      medicalRecords: this.state.medicalRecord,
      medicineRange: this.state.medicalRange,
      receipts: this.state.receipts,
      date: date,
    };
    let res = await postMedicalRecords(data);
    if (res && res.errCode === 0) {
      closeBookingModal();
      toast.success("Thêm đơn thuốc cho bệnh nhân thành công");
    }
  }
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      if (type === "MEDICINE") {
        inputData.map((item, index) => {
          let object = {};
          let medicineName = item.nameMedicine;
          object.label = medicineName;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };
  onChangeMedicine = (idx, selectedMedicine) => (e) => {
    let { dataMedicineByClinicId } = this.props;
    console.log(dataMedicineByClinicId);
    let selected = {};
    dataMedicineByClinicId.forEach((item) => {
      if (item.nameMedicine === e.label) {
        selected = item;
      }
    });
    let temp=[...this.state.listMedicineByClinicId]
    console.log('before',temp);

    temp=temp.filter(item => item.label!==e.label)
    console.log('after',temp);
    const receipts = [...this.state.receipts];
    receipts[idx] = {
      medicineName: selected.nameMedicine,
      unit: selected.unit,
      medicineCode: selected.medicineCode,
    };
    this.setState({
      receipts,
      selectedMedicine: selectedMedicine,
      listMedicineByClinicId:temp
    });
  };
  render() {
    let { receipts, listMedicineByClinicId, selectedMedicine } = this.state;
    let {
      isOpenModal,
      closeBookingModal,
      dataTime,
      bookingId,
      patientInformation,
    } = this.props;
    let patientId = dataTime && !_.isEmpty(dataTime) ? dataTime.patientId : "";
    console.log("listMedicineByClinicId", listMedicineByClinicId);
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
            <div className="patient-infor">
              <ProfileUser
                patientId={patientId}
                patientInformation={patientInformation}
              />
            </div>
            <div className="medical-note">
            <div className="bottom-container">
                  <table className="table" id="tableMedicine">
                    <thead>
                      <tr>
                        <th className="col-4">Tên thuốc</th>
                        <th className="col-2">Mã thuốc</th>
                        <th className="col-2">Đơn vị tính</th>
                        <th className="col-2">Số lượng</th>
                        <th className="col-2">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receipts.map((item, idx) => {
                        return (
                          <tr>
                            <td>
                              <Select
                                value={selectedMedicine}
                                onChange={this.onChangeMedicine(idx)}
                                name="selectedMedicine"
                                options={listMedicineByClinicId}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="medicineName"
                                value={receipts[idx].medicineCode}
                                //  onChange={this.handleChange(idx)}
                                className="form-control"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="unit"
                                value={receipts[idx].unit}
                                //  onChange={this.handleChange(idx)}
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
                                <i class="fas fa-trash-alt"></i>
                              </button>
                              <button
                                className="btn btn-outline-success btn-sm"
                                onClick={this.handleAddRow}
                              >
                                <i class="fas fa-plus"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                
              </div>
              <div className="top-container">
                <div className="top-left">
                  <div className="form-group">
                    <label className="sub-title">
                      <span>
                        <i class="fas fa-clock"></i>Thời gian khám{" "}
                      </span>{" "}
                    </label>
                    :
                    <input
                      readOnly
                      className="input-content"
                      defaultValue={dataTime.bookingDate}
                    />
                    {/* <span className="input-content">{dataTime.bookingDate}</span> */}
                  </div>
                  <div className="form-group">
                    <label>
                      <span>
                        <i class="fas fa-sun"></i>
                      </span>
                      Số ngày cấp
                    </label>
                    <input
                      className="input-content"
                      type="number"
                      min="1"
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "medicalRange")
                      }
                    ></input>
                  </div>
                </div>
                <div className="top-right">
                  <div className="medicalRecord-content">
                    <label>
                    <i class="fas fa-notes-medical"></i>Bệnh án</label>
                    <textarea
                      className="form-control medicalRecord"
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "medicalRecord")
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
   
            </div>
          </div>

          <div className="booking-modal-footer">
            <button
              className="btn-booking-comfirm"
              onClick={() =>
                this.handleConfirmBooking(
                  bookingId,
                  closeBookingModal,
                  dataTime.date
                )
              }
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
