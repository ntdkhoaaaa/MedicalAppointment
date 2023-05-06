import React, { Component } from "react";
import { connect } from "react-redux";
// import { FormattedMessage } from 'react-intl';
// import { LANGUAGES } from '../../../utils';
import "./UserAppointment.scss";
// import { data } from './data'
import {
  getAllAppointmentOfPatient,
  cancelBookingFromPatient,
  getProfileDoctorById,
  getAllDoctors,
  getAllUsers,
} from "../../../services/userServices";
import * as actions from "../../../store/actions";
import ModalRatingAppointment from "./ModalRatingAppointment";
import ModalViewMedicalRecord from "./ModalViewMedicalRecord";
import ModalAnnounceCancel from "./ModalAnnounceCancel";
import ModalWaiting from "./ModalWaiting";
import { toast } from "react-toastify";
import DatePicker from "../../../components/Input/DatePicker";
import Select from "react-select";
import LoadingOverlay from "react-loading-overlay";
class UserAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalRating: false,
      isOpenViewMedicalRecord: false,
      PatientAppointment: [],
      filteredAppointment: [],
      deleteSuccessLoadAgain: false,
      ratingBookingId: "",
      viewingBookingId: "",
      doctorId: "",
      bookingDate: "",
      isOpenModalAnnounce: false,
      CancelSuccess: false,
      isOpenModalWaiting: false,
      selectedStatus: {
        label: "Tất cả",
        value: "All",
      },
      chooseDate: "",
      totalRegisteredAppointment: "",
      totalCanceledAppointment: "",
      totalExaminatedAppointment: "",
      totalRatedAppointment: "",
      totalUnexaminatedAppointment: "",
      ratingDoctorInformation: {},
      RatingInfor: {},
    };
  }
  async componentDidMount() {
    let { userInfo } = this.props;
    let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id);
    if (UserAppointment && UserAppointment.length > 0) {
      this.setState({
        PatientAppointment: UserAppointment,
        filteredAppointment: UserAppointment,
        totalRegisteredAppointment: UserAppointment.length,
        totalCanceledAppointment: UserAppointment.filter(
          (item) => item.statusId === "S4"
        ).length,
        totalExaminatedAppointment: UserAppointment.filter(
          (item) => item.statusId === "S3"
        ).length,
        totalRatedAppointment: UserAppointment.filter(
          (item) => item.statusId === "S5"
        ).length,
        totalUnexaminatedAppointment: UserAppointment.filter(
          (item) => item.statusId === "S2"
        ).length,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userInfo !== this.props.userInfo) {
      let { userInfo } = this.props;
      let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id);
      if (UserAppointment && UserAppointment.length > 0) {
        this.setState({
          PatientAppointment: UserAppointment,
          filteredAppointment: UserAppointment,
          totalRegisteredAppointment: UserAppointment.length,

          totalCanceledAppointment: UserAppointment.filter(
            (item) => item.statusId === "S4"
          ).length,
          totalExaminatedAppointment: UserAppointment.filter(
            (item) => item.statusId === "S3"
          ).length,
          totalRatedAppointment: UserAppointment.filter(
            (item) => item.statusId === "S5"
          ).length,
          totalUnexaminatedAppointment: UserAppointment.filter(
            (item) => item.statusId === "S2"
          ).length,
        });
      }
    }
    if (
      prevState.deleteSuccessLoadAgain !== this.state.deleteSuccessLoadAgain
    ) {
      let { userInfo } = this.props;
      let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id);
      if (UserAppointment && UserAppointment.length > 0) {
        this.setState({
          PatientAppointment: UserAppointment,
          filteredAppointment: UserAppointment,
          totalRegisteredAppointment: UserAppointment.length,

          totalCanceledAppointment: UserAppointment.filter(
            (item) => item.statusId === "S4"
          ).length,
          totalExaminatedAppointment: UserAppointment.filter(
            (item) => item.statusId === "S3"
          ).length,
          totalRatedAppointment: UserAppointment.filter(
            (item) => item.statusId === "S5"
          ).length,
          totalUnexaminatedAppointment: UserAppointment.filter(
            (item) => item.statusId === "S2"
          ).length,
        });
      }
    }
    if (prevState.isOpenModalRating !== this.state.isOpenModalRating) {
      if (this.state.isOpenModalRating === false) {
        let { userInfo } = this.props;
        let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id);
        if (UserAppointment && UserAppointment.length > 0) {
          this.setState({
            PatientAppointment: UserAppointment,
            filteredAppointment: UserAppointment,
            totalRegisteredAppointment: UserAppointment.length,

            totalCanceledAppointment: UserAppointment.filter(
              (item) => item.statusId === "S4"
            ).length,
            totalExaminatedAppointment: UserAppointment.filter(
              (item) => item.statusId === "S3"
            ).length,
            totalRatedAppointment: UserAppointment.filter(
              (item) => item.statusId === "S5"
            ).length,
            totalUnexaminatedAppointment: UserAppointment.filter(
              (item) => item.statusId === "S2"
            ).length,
          });
        }
      }
    }
    if (
      prevState.isOpenViewMedicalRecord !== this.state.isOpenViewMedicalRecord
    ) {
      let { userInfo } = this.props;
      let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id);
      if (UserAppointment && UserAppointment.length > 0) {
        this.setState({
          PatientAppointment: UserAppointment,
          filteredAppointment: UserAppointment,
          totalRegisteredAppointment: UserAppointment.length,

          totalCanceledAppointment: UserAppointment.filter(
            (item) => item.statusId === "S4"
          ).length,
          totalExaminatedAppointment: UserAppointment.filter(
            (item) => item.statusId === "S3"
          ).length,
          totalRatedAppointment: UserAppointment.filter(
            (item) => item.statusId === "S5"
          ).length,
          totalUnexaminatedAppointment: UserAppointment.filter(
            (item) => item.statusId === "S2"
          ).length,
        });
      }
    }
  }
  RatingTime = (index) => {
    if (this.props.isLoggedIn) {
      console.log("Schedule", index);
      this.setState({
        ratingBookingId: index.id,
        isOpenModalRating: true,
        RatingInfor: index,
      });
    } else {
      this.props.history.push("/login");
    }
    // }
  };
  ViewingTime = (index) => {
    console.log("Schedule", index);
    this.setState({
      bookingDate: index,
      viewingBookingId: index.id,
      isOpenViewMedicalRecord: true,
    });
  };
  closeRatingModal = () => {
    this.setState({
      isOpenModalRating: false,
    });
  };
  closeViewMedicalRecordModal = () => {
    this.setState({
      isOpenViewMedicalRecord: false,
    });
  };
  closeAnnouncementModal = () => {
    this.setState({
      isOpenModalAnnounce: false,
    });
  };
  async CancelBooking(bookingId, PatientAppointment) {
    this.setState({
      isOpenModalWaiting: true,
    });
    let res = await cancelBookingFromPatient({ id: bookingId });
    if (res && res.errCode === 1) {
      this.setState({
        isOpenModalAnnounce: true,
        isOpenModalWaiting: false,
      });
    }
    if (res && res.errCode === 0) {
      let { userInfo } = this.props;
      let UserAppointment = await getAllAppointmentOfPatient(userInfo?.id);
      if (UserAppointment && UserAppointment.length > 0) {
        this.setState({
          PatientAppointment: UserAppointment,
          filteredAppointment: UserAppointment,
          isOpenModalAnnounce: false,
          isOpenModalWaiting: false,
          totalRegisteredAppointment: UserAppointment.length,

          totalCanceledAppointment: UserAppointment.filter(
            (item) => item.statusId === "S4"
          ).length,
          totalExaminatedAppointment: UserAppointment.filter(
            (item) => item.statusId === "S3"
          ).length,
          totalRatedAppointment: UserAppointment.filter(
            (item) => item.statusId === "S5"
          ).length,
          totalUnexaminatedAppointment: UserAppointment.filter(
            (item) => item.statusId === "S2"
          ).length,
        });
      }
      toast.success("Bạn đã hủy hẹn thành công");
    }
  }
  handleOnChangeDatePicker = async (date) => {
    let chooseDate = new Date(date[0]).getTime();

    if (chooseDate) {
      this.setState({ chooseDate: chooseDate });
      let filteredAppointment = this.state.PatientAppointment.filter(
        (item) => item.date === chooseDate.toString()
      );
      this.setState({
        filteredAppointment: filteredAppointment,
        selectedStatus: {
          label: "Tất cả",
          value: "All",
        },
        totalRegisteredAppointment: filteredAppointment.length,

        totalCanceledAppointment: filteredAppointment.filter(
          (item) => item.statusId === "S4"
        ).length,
        totalExaminatedAppointment: filteredAppointment.filter(
          (item) => item.statusId === "S3"
        ).length,
        totalRatedAppointment: filteredAppointment.filter(
          (item) => item.statusId === "S5"
        ).length,
        totalUnexaminatedAppointment: filteredAppointment.filter(
          (item) => item.statusId === "S2"
        ).length,
      });
    }
  };
  handleChangeSelectInfor = async (selectedInfor, name) => {
    let { chooseDate, PatientAppointment } = this.state;
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedInfor;
    this.setState({
      ...stateCopy,
    });
    if (selectedInfor.value !== "All") {
      if (chooseDate) {
        let filteredAppointment = this.state.PatientAppointment.filter(
          (item) => item.date === chooseDate.toString()
        );
        // let tempFileredAppointment = [...filteredAppointment];
        filteredAppointment = filteredAppointment.filter(
          (item) => item.statusId === selectedInfor.value
        );
        this.setState({
          filteredAppointment: filteredAppointment,
          totalRegisteredAppointment: filteredAppointment.length,

          totalCanceledAppointment: filteredAppointment.filter(
            (item) => item.statusId === "S4"
          ).length,
          totalExaminatedAppointment: filteredAppointment.filter(
            (item) => item.statusId === "S3"
          ).length,
          totalRatedAppointment: filteredAppointment.filter(
            (item) => item.statusId === "S5"
          ).length,
          totalUnexaminatedAppointment: filteredAppointment.filter(
            (item) => item.statusId === "S2"
          ).length,
        });
      } else {
        let tempFileredAppointment = [...PatientAppointment];
        tempFileredAppointment = tempFileredAppointment.filter(
          (item) => item.statusId === selectedInfor.value
        );
        this.setState({
          filteredAppointment: tempFileredAppointment,
          totalRegisteredAppointment: tempFileredAppointment.length,
          totalCanceledAppointment: tempFileredAppointment.filter(
            (item) => item.statusId === "S4"
          ).length,
          totalExaminatedAppointment: tempFileredAppointment.filter(
            (item) => item.statusId === "S3"
          ).length,
          totalRatedAppointment: tempFileredAppointment.filter(
            (item) => item.statusId === "S5"
          ).length,
          totalUnexaminatedAppointment: tempFileredAppointment.filter(
            (item) => item.statusId === "S2"
          ).length,
        });
      }
    } else {
      if (chooseDate) {
        let filteredAppointment = this.state.PatientAppointment.filter(
          (item) => item.date === chooseDate.toString()
        );
        this.setState({
          filteredAppointment: filteredAppointment,
          totalRegisteredAppointment: filteredAppointment.length,

          totalCanceledAppointment: filteredAppointment.filter(
            (item) => item.statusId === "S4"
          ).length,
          totalExaminatedAppointment: filteredAppointment.filter(
            (item) => item.statusId === "S3"
          ).length,
          totalRatedAppointment: filteredAppointment.filter(
            (item) => item.statusId === "S5"
          ).length,
          totalUnexaminatedAppointment: filteredAppointment.filter(
            (item) => item.statusId === "S2"
          ).length,
        });
      } else {
        this.setState({
          filteredAppointment: PatientAppointment,
          totalRegisteredAppointment: PatientAppointment.length,

          totalCanceledAppointment: PatientAppointment.filter(
            (item) => item.statusId === "S4"
          ).length,
          totalExaminatedAppointment: PatientAppointment.filter(
            (item) => item.statusId === "S3"
          ).length,
          totalRatedAppointment: PatientAppointment.filter(
            (item) => item.statusId === "S5"
          ).length,
          totalUnexaminatedAppointment: PatientAppointment.filter(
            (item) => item.statusId === "S2"
          ).length,
        });
      }
    }
  };
  render() {
    let {
      isOpenModalRating,
      PatientAppointment,
      ratingBookingId,
      isOpenViewMedicalRecord,
      isOpenModalWaiting,
      viewingBookingId,
      doctorId,
      bookingDate,
      filteredAppointment,
      isOpenModalAnnounce,
      totalRegisteredAppointment,
      totalCanceledAppointment,
      totalExaminatedAppointment,
      totalRatedAppointment,
      totalUnexaminatedAppointment,
      ratingDoctorInformation,
      RatingInfor,
    } = this.state;
    let { userInfo } = this.props;
    const appointmentStatusArr = [
      {
        label: "Tất cả",
        value: "All",
      },
      {
        label: "Chưa khám",
        value: "S2",
      },
      {
        label: "Đã hủy hẹn",
        value: "S4",
      },
      {
        label: "Đã khám xong",
        value: "S3",
      },
      {
        label: "Đã đánh giá",
        value: "S5",
      },
    ];
    console.log(this.state);
    // console.log('ratingBookingId',ratingBookingId,'userInfo.id',userInfo.id,'RatingInfor',RatingInfor,'isOpenModalRating',isOpenModalRating)
    return (
      <React.Fragment>
        <div className="patient-appointment">
          <div className="left-container">
            <div className="filter-container">
              <div className="col-12 form-group">
                <label>Chọn ngày</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="date-picker form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="type-search">
                <label>Bộ lọc lịch hẹn</label>
                <Select
                  className="type-select"
                  name="selectedStatus"
                  value={this.state.selectedStatus}
                  onChange={this.handleChangeSelectInfor}
                  options={appointmentStatusArr}
                />
              </div>
              <div className="search-container">
                <label>Bệnh nhân</label>
                <div className="search">
                  <input
                    className="search-medicine"
                    type="text"
                    id="myInput"
                    onChange={(event) => this.searchMedicine(event)}
                    title="Type in a name"
                  />
                  <div className="icon-container">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="statistical-container">
              <div className="total total-medicine ">
                {/* isOpenModalAnnounce,
      totalRegisteredAppointment,
      totalCanceledAppointment,
      totalExaminatedAppointment,
      totalRatedAppointment, */}
                <label>Đăng ký</label>
                <span>{totalRegisteredAppointment}</span>
              </div>
              <div className="total total-tupe ">
                <label>Đã khám</label>
                <span>{totalExaminatedAppointment}</span>
              </div>
              <div className="total total-pill ">
                <label>Chưa khám</label>
                <span>{totalUnexaminatedAppointment}</span>
              </div>
              <div className="total total-pill ">
                <label>Đã hủy</label>
                <span>{totalCanceledAppointment}</span>
              </div>
              <div className="total total-pill ">
                <label>Đã đánh giá</label>
                <span>{totalRatedAppointment}</span>
              </div>
            </div>
          </div>
          <div className="right-container">
            <table
              style={{ width: "100%" }}
              className="table-manage-appointment"
            >
              <tbody>
                <tr>
                  <th width={"15%"}>Thời gian</th>
                  <th width={"15%"}>Đặt cho ai</th>
                  <th width={"15%"}>Triệu chứng</th>
                  <th width={"20%"}>Tên bác sĩ</th>
                  <th width={"25%"}>Thông tin phòng khám</th>
                  <th width={"3%"}>Actions</th>
                </tr>
                {filteredAppointment && filteredAppointment.length > 0
                  ? filteredAppointment.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item?.bookingDate}</td>
                          <td>{item?.forWho}</td>
                          <td>{item?.prognostic}</td>
                          <td>
                            {item.doctorInfoData?.lastName}{" "}
                            {item?.doctorInfoData?.firstName}{" "}
                            <span>
                              {" "}
                              (
                              {
                                item?.doctorInfoData?.Doctor_Infor
                                  ?.nameSpecialty
                              }
                              {
                                item?.doctorInfoData?.Doctor_Clinic_Specialty
                                  ?.specialtyData?.name
                              }
                              ){" "}
                            </span>
                          </td>
                          <td>
                            <div>
                              {
                                item?.doctorInfoData?.Doctor_Infor
                                  ?.addressClinic
                              }
                              {
                                item?.doctorInfoData?.Doctor_Clinic_Specialty
                                  ?.specialtyData?.location
                              }
                            </div>
                            <div>
                              {item?.doctorInfoData?.Doctor_Infor?.nameClinic}
                            </div>
                          </td>
                          <td>
                            {item.statusId === "S1" ? (
                              "Chưa xác nhận"
                            ) : item.statusId === "S4" ? (
                              "Bạn đã hủy hẹn"
                            ) : item.statusId === "S2" ? (
                              <div className="btn-group-patient">
                                <button
                                  onClick={() =>
                                    this.CancelBooking(
                                      item.id,
                                      PatientAppointment
                                    )
                                  }
                                  className="mp-btn-cancel"
                                >
                                  <i class="fas fa-window-close"></i>
                                </button>
                              </div>
                            ) : item.statusId === "S3" ? (
                              <>
                                <div className="btn-group-patient">
                                  <button
                                    onClick={() => this.RatingTime(item)}
                                    hidden={
                                      item.statusId === "S5" ? true : false
                                    }
                                    className="mp-btn-rate"
                                  >
                                    <i class="fas fa-star"></i>
                                  </button>

                                  <button
                                    onClick={() => this.ViewingTime(item)}
                                    className="mp-btn-remedy"
                                  >
                                    <i class="fas fa-eye"></i>
                                  </button>
                                </div>
                              </>
                            ) : item.statusId === "S5" ? (
                              <div className="btn-group-patient">
                                <button
                                  onClick={() => this.ViewingTime(item)}
                                  className="mp-btn-remedy"
                                >
                                  <i class="fas fa-eye"></i>
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
          <ModalViewMedicalRecord
            bookingDate={bookingDate}
            closeViewMedicalRecordModal={this.closeViewMedicalRecordModal}
            viewingBookingId={viewingBookingId}
            isOpenViewMedicalRecord={isOpenViewMedicalRecord}
          />
          <ModalRatingAppointment
            RatingInfor={RatingInfor}
            id={userInfo.id}
            bookingId={ratingBookingId}
            closeRatingModal={this.closeRatingModal}
            isOpenModalRating={isOpenModalRating}
          />
          <ModalWaiting isOpenModalWaiting={isOpenModalWaiting} />
          <ModalAnnounceCancel
            isOpenModalAnnounce={isOpenModalAnnounce}
            closeAnnouncementModal={this.closeAnnouncementModal}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUsersRedux: () => {
    //   dispatch(actions.fetchAllUsersStart());
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAppointment);
