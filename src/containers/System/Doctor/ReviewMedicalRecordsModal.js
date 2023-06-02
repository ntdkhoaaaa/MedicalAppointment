import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ReviewMedicalRecordsModal.scss";
import Lightbox from "react-image-lightbox";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "../../Patient/Doctor/ProfileDoctor";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { getMedicalRecordByBookingId } from "../../../services/userServices";
import { toast } from "react-toastify";
import ProfileUser from "./ProfileUser";
// import './Review'
class ReviewMedicalRecordsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    let { bookingId } = this.props;
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  render() {
    let {
      isOpenModalReview,
      closeReviewModal,
      dataTime,
      reviewMedicalRecord,
      patientInformation,
    } = this.props;
    console.log(dataTime);
    let patientId = dataTime && !_.isEmpty(dataTime) ? dataTime.patientId : "";
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
              <ProfileUser
                patientId={patientId}
                patientInformation={patientInformation}
              />
            </div>
            <div className="medical-info">
              <div className="medical-note">
                <div className="rangeTime">
                  <label>
                    <span>
                      <i className="fas fa-sun"></i>
                    </span>
                    Số ngày cấp
                  </label>
                  <input
                    value={reviewMedicalRecord?.medicineRange}
                    className="input-content"
                    type="number"
                  ></input>
                </div>
                <div className="medicalRecord">
                  <label>
                    <i className="fas fa-notes-medical"></i>Bệnh án
                  </label>
                  <textarea
                    className="form-control medicalRecord"
                    value={reviewMedicalRecord?.medicalRecords}
                  ></textarea>
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
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviewMedicalRecord &&
                      reviewMedicalRecord?.receiptData &&
                      reviewMedicalRecord?.receiptData.map((item, idx) => {
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
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row"></div>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewMedicalRecordsModal);
