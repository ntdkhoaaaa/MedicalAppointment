import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { Modal } from "reactstrap";
import { getMedicalRecordByBookingId } from "../../../services/userServices";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorInformation from "./DoctorInformation";
import "./ModalViewMedicalRecord.scss";
import axios from "axios";
class ModalViewMedicalRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Record: {},
    };
  }
  async componentDidMount() {
    let { viewingBookingId } = this.props;
    console.log("viewingBookingId", viewingBookingId);
    let res = await getMedicalRecordByBookingId(viewingBookingId);
    console.log("historyInfo", res);

    if (res && res.errCode === 0) {
      this.setState({
        Record: res.historyInfo,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.viewingBookingId !== prevProps.viewingBookingId) {
      let { viewingBookingId } = this.props;
      console.log("viewingBookingId", viewingBookingId);

      let res = await getMedicalRecordByBookingId(viewingBookingId);
      if (res && res.errCode === 0) {
        this.setState({
          Record: res.historyInfo,
        });
      }
    }
  }
  ResearchTime = async (index) => {
    let prompt = `${index} là gì`;
    // e.preventDefault();

    let res =await axios.post(`http://localhost:8081/chat`,{ prompt })
    console.log(res);
    // .then((res)=>{
    //   console.log(res.data)
    // })
    // .catch((err)=>{
    //   console.error(err)
    // })

    console.log("response", res);
  };
  render() {
    let { isOpenViewMedicalRecord, closeViewMedicalRecordModal, bookingDate } =
      this.props;
    let { Record } = this.state;
    return (
      <Modal
        toggle={closeViewMedicalRecordModal}
        isOpen={isOpenViewMedicalRecord}
        backdrop={true}
        className="modal-view-medical-record"
      >
        <div className="modal-view-medical-record">
          <div className="doctor-infor">
            <DoctorInformation
              showDescription={true}
              doctorId={bookingDate.doctorId}
            />
          </div>
          <div className="medical-information">
            <div className="medical-note">
              <div className="medicalRecord">
                <label>
                  <i class="fas fa-notes-medical"></i>Bệnh án
                </label>
                <textarea
                  className="form-control medicalRecord"
                  value={Record.medicalRecords}
                ></textarea>
              </div>
              <div className="rangeTime">
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
                  value={Record.medicineRange}
                ></input>
              </div>
            </div>

            <div className="bottom-container">
              <table className="table" id="tableMedicine">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên thuốc</th>
                    <th scope="col">Đơn vị tính</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">So sánh</th>
                  </tr>
                </thead>
                <tbody>
                  {Record &&
                    Record.receiptData &&
                    Record?.receiptData.map((item, idx) => {
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
                          <td>
                            <div className="btn-research">
                              <button
                                onClick={() =>
                                  this.ResearchTime(item.medicineName)
                                }
                                className="mp-btn-remedy"
                              >
                                <i class="fas fa-eye"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalViewMedicalRecord);
