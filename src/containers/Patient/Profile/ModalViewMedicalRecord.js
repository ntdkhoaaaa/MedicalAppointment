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
      modalIsOpen: false,
      researchResult: "",
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
    this.setState({
      modalIsOpen: true,
    });
    let prompt = ` Cách hỗ trợ và phương pháp điều trị bệnh ${index}`;
    let res = await axios.post(
      `http://localhost:8081/chat`,
      { prompt }
    );
    console.log(res);

    console.log("response", res);
    this.setState({
      researchResult: res.data,
    });
  };
  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };
  render() {
    let { isOpenViewMedicalRecord, closeViewMedicalRecordModal, bookingDate } =
      this.props;
    let { Record, researchResult } = this.state;
    const modalStyles = {
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      },
      content: {
        maxWidth: "400px",
        margin: "auto",
        backgroundColor: "#fff",
        borderRadius: "4px",
        padding: "20px",
      },
    };
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
                  <i className="fas fa-notes-medical"></i>Bệnh án
                </label>
                <div className="btn-research">
                <button
                  onClick={() => this.ResearchTime(Record.medicalRecords)}
                  className="mp-btn-remedy"
                >
                 <i className="fas fa-question-circle"></i>
                </button>
              </div>
              <Modal
                isOpen={this.state.modalIsOpen}
                toggle={this.closeModal}
                style={modalStyles}
                contentLabel="Chat Modal"
                className="research-modal"
              >
                <div className="chat-history">
                  <div className="question">
                    {`Cách hỗ trợ và phương pháp điều trị bệnh ${Record.medicalRecords} `}
                  </div>
                  <div className="answer">
                    {researchResult && <pre>{researchResult}</pre>}
                  </div>
                </div>
              </Modal>
                <textarea
                  className="form-control medicalRecord"
                  value={Record.medicalRecords}
                ></textarea>
              </div>
              <div className="rangeTime">
                <label>
                  <span>
                    <i className="fas fa-sun"></i>
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
