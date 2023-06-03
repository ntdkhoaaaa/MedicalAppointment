import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _, { last } from "lodash";
import Select from "react-select";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import { postPatientAppointment } from "../../../../services/userServices";
import { toast } from "react-toastify";
import moment from "moment/moment";
import ModalWaiting from "../../Profile/ModalWaiting";
import ProfileDoctorSpecialty from "../../Clinics/ProfileDoctorSpecialty";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: "",
      firstName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      patientAge: "",
      genderIdentity: "",
      forwho: "",
      genders: [],
      doctorId: "",
      timetype: "",
      date: "",
      height: "",
      weight: "",
      bloodType: "",
      pathology: "",
      isOpenModalWaiting: false,
    };
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }
  componentDidMount() {
    this.props.getGendersStart();
    if (this.props.isLoggedIn) {
      let blood = {};
      if (this.props.userInfo?.bloodType) {
        blood = {
          value: this.props.userInfo?.bloodType,
          label: this.props.userInfo?.bloodType,
        };
      }
      console.log(
        "blood",
        this.props.userInfo,
        " ",
        this.props.userInfo.UserMedicalInformation
      );
      this.setState({
        email: this.props.userInfo?.email,
        lastName: this.props.userInfo?.lastName,
        firstName: this.props.userInfo?.firstName,
        address: this.props.userInfo?.address,
        phoneNumber: this.props.userInfo?.phoneNumber,
        height: this.props.userInfo?.height,
        weight: this.props.userInfo?.weight,
        bloodType: blood,
        pathology: this.props.userInfo?.pathology,
        genderIdentity:
          this.props.userInfo?.gender === "M"
            ? {
                label: this.props.language === LANGUAGES.VI ? "Nam" : "Male",
                value: "M",
              }
            : this.props.userInfo?.gender === "F"
            ? {
                label: this.props.language === LANGUAGES.VI ? "Nữ" : "Female",
                value: "F",
              }
            : {
                label: this.props.language === LANGUAGES.VI ? "Khác" : "Other",
                value: "O",
              },
      });
    }
    document.addEventListener("keydown", this.handleKeyDown);
  }
  buildDataGenders = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGenders(this.props.genderRedux),
        genderIdentity:
          this.props.userInfo?.gender === "M"
            ? {
                label: this.props.language === LANGUAGES.VI ? "Nam" : "Male",
                value: "M",
              }
            : this.props.userInfo?.gender === "F"
            ? {
                label: this.props.language === LANGUAGES.VI ? "Nữ" : "Female",
                value: "F",
              }
            : {
                label: this.props.language === LANGUAGES.VI ? "Khác" : "Other",
                value: "O",
              },
      });
    }
    if (this.props.genderRedux !== prevProps.genderRedux) {
      this.setState({
        genders: this.buildDataGenders(this.props.genderRedux),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timetype = this.props.dataTime.timetype;
        let date = this.props.dataTime.date;
        this.setState({
          doctorId: doctorId,
          timetype: timetype,
          date: date,
        });
      }
    }
    if (this.props.userInfo !== prevProps.userInfo) {
      let blood = {};
      if (this.props.userInfo?.bloodType) {
        blood = {
          value: this.props.userInfo?.bloodType,
          label: this.props.userInfo?.bloodType,
        };
      }
      this.setState({
        email: this.props.userInfo?.email,
        lastName: this.props.userInfo?.lastName,
        firstName: this.props.userInfo?.firstName,
        address: this.props.userInfo?.address,
        phoneNumber: this.props.userInfo?.phoneNumber,
        height: this.props.userInfo?.height,
        weight: this.props.userInfo?.weight,
        bloodType: blood,
        pathology: this.props.userInfo?.pathology,
        genderIdentity:
          this.props.userInfo?.gender === "M"
            ? {
                label: this.props.language === LANGUAGES.VI ? "Nam" : "Male",
                value: "M",
              }
            : this.props.userInfo?.gender === "F"
            ? {
                label: this.props.language === LANGUAGES.VI ? "Nữ" : "Female",
                value: "F",
              }
            : {
                label: this.props.language === LANGUAGES.VI ? "Khác" : "Other",
                value: "O",
              },
      });
    }
  }
  handleOnChangeInput = (event, id) => {
    if(id==='height' || id==='weight' || id==='patientAge')
    {
      console.log('log',event.target.value)
      if(id==='height')
      {
        if(event.target.value<0)
        {
          toast.warn('Chiều cao không phải là số âm')
        }
        else{
          let inputValue = event.target.value;
          let copyState = { ...this.state };
          copyState[id] = inputValue;
          this.setState({
            ...copyState,
          });
        }
      }
      if(id==='weight')
      {
        if(event.target.value<0)
        {
          toast.warn('Cân nặng không phải là số âm')
        }
        else{
          let inputValue = event.target.value;
          let copyState = { ...this.state };
          copyState[id] = inputValue;
          this.setState({
            ...copyState,
          });
        }
      }
      if(id==='patientAge')
      {
        if(event.target.value<0)
        {
          toast.warn('Tuổi không phải là số âm')
        }
        else{
          let inputValue = event.target.value;
          let copyState = { ...this.state };
          copyState[id] = inputValue;
          this.setState({
            ...copyState,
          });
        }
      }
    }
    else{
      let inputValue = event.target.value;
      let copyState = { ...this.state };
      copyState[id] = inputValue;
      this.setState({
        ...copyState,
      });
    }

  };
  handleOnChangeDataPicker = (date) => {
    this.setState({
      doB: date[0],
    });
  };
  handleChangeSelectInfor = (selectedInfor, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedInfor;
    this.setState({
      ...stateCopy,
    });
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  renderBookingTime = (bookingTime) => {
    let { language } = this.props;
    if (bookingTime && !_.isEmpty(bookingTime)) {
      let time =
        language === LANGUAGES.VI
          ? bookingTime.timetypeData.valueVi
          : bookingTime.timetypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? this.capitalizeFirstLetter(
              moment.unix(+bookingTime.date / 1000).format("dddd - DD/MM/YYYY")
            )
          : moment
              .unix(+bookingTime.date / 1000)
              .locale("en")
              .format("ddd - DD/MM/YYYY");
      return `${time} - ${date}`;
    }
    return "";
  };
  renderDoctorName = (bookingTime) => {
    let { language } = this.props;
    if (bookingTime && !_.isEmpty(bookingTime)) {
      let doctorNameEn = `${this.props.dataTime.doctorData.firstName} ${this.props.dataTime.doctorData.lastName}`;
      let doctorNameVi = `${this.props.dataTime.doctorData.lastName} ${this.props.dataTime.doctorData.firstName}`;
      let doctorName = language === LANGUAGES.VI ? doctorNameVi : doctorNameEn;
      return doctorName;
    }
    return "";
  };
  renderDoctorNameForSpecialty = (firstName, lastName) => {
    let { language } = this.props;
    if (
      firstName &&
      !_.isEmpty(firstName) &&
      lastName &&
      !_.isEmpty(lastName)
    ) {
      let doctorNameEn = `${firstName} ${lastName}`;
      let doctorNameVi = `${lastName} ${firstName}`;
      let doctorName = language === LANGUAGES.VI ? doctorNameVi : doctorNameEn;
      return doctorName;
    }
    return "";
  };
  renderBookingTimeForSpecialty = (bookingTimeVi, bookingTimeEn, date) => {
    console.log("date from booking modal", date);
    if (bookingTimeVi && bookingTimeEn) {
      let { language } = this.props;
      let time = language === LANGUAGES.VI ? bookingTimeVi : bookingTimeEn;
      if (
        bookingTimeVi &&
        !_.isEmpty(bookingTimeVi) &&
        bookingTimeEn &&
        !_.isEmpty(bookingTimeEn)
      ) {
        let day =
          language === LANGUAGES.VI
            ? this.capitalizeFirstLetter(
                moment.unix(date / 1000).format("dddd - DD/MM/YYYY")
              )
            : moment
                .unix(date / 1000)
                .locale("en")
                .format("ddd - DD/MM/YYYY");

        return `${time} - ${day}`;
      }
      return "";
    }
  };
  checkState = () => {
    if (!this.state.lastName) {
      toast.error("Nhập thiếu họ");
      return false;
    }
    if (!this.state.firstName) {
      toast.error("Nhập thiếu tên");
      return false;
    }
    if (!this.state.phoneNumber) {
      toast.error("Nhập thiếu số điện thoại");
      return false;
    }
    if (!this.state.address) {
      toast.error("Nhập thiếu địa chỉ");
      return false;
    }
    if (!this.state.reason) {
      toast.error("Nhập thiếu triệu chứng");
      return false;
    }
    if (!this.state.genderIdentity) {
      toast.error("Nhập thiếu bản dạng giới");
      return false;
    }
    if (!this.state.forwho) {
      toast.error("Nhập thiếu đăng ký cho ai");
      return false;
    }
    if (!this.state.patientAge) {
      toast.error("Nhập thiếu tuổi bệnh nhân");
      return false;
    }
    if (!this.state.height) {
      toast.error("Nhập thiếu chiều cao");
      return false;
    }
    if (!this.state.weight) {
      toast.error("Nhập thiếu cân nặng");
      return false;
    }
    if (!this.state.bloodType) {
      toast.error("Nhập thiếu nhóm máu");
      return false;
    }
    if (!this.state.pathology) {
      toast.error(
        "Nhập thiếu triệu chứng! Nếu không có vui lòng điền không có"
      );
      return false;
    }
    return true;
    // if()
  };
  handleConfirmBooking = async () => {
    console.log("login with enter",this.props);
    let { specialtyBooking, dataTime } = this.props;
    let checkState = this.checkState();
    if (checkState) {
      if (specialtyBooking) {
        this.setState({ isOpenModalWaiting: true });
        let timeString = this.renderBookingTimeForSpecialty(
          dataTime.bookingInfor[0].valueVi,
          dataTime.bookingInfor[0].valueEn,
          dataTime.bookingInfor[0].date
        );
        let doctorName = this.renderDoctorNameForSpecialty(
          dataTime.bookingInfor[0].firstName,
          dataTime.bookingInfor[0].lastName
        );
        let res = await postPatientAppointment({
          lastName: this.state.lastName,
          firstName: this.state.firstName,
          phoneNumber: this.state.phoneNumber,
          email: this.state.email,
          address: this.state.address,
          reason: this.state.reason,
          genderIdentity: this.state.genderIdentity.value,
          doctorId: dataTime.bookingInfor[0].doctorId,
          forwho: this.state.forwho,
          timetype: dataTime.bookingInfor[0].timetype,
          date: dataTime.bookingInfor[0].date,
          language: this.props.language,
          pickDate: timeString,
          patientAge: this.state.patientAge,
          doctorName: doctorName,
          clinicId: dataTime.bookingInfor[0].clinicId,
          specialtyId: dataTime.bookingInfor[0].specialtyId,
          fromSpecialtyHospital: true,
          height: this.state.height,
          weight: this.state.weight,
          bloodType: this.state.bloodType.value,
          pathology: this.state.pathology,
        });
        this.setState({ isOpenModalWaiting: false });
        if (res && res.errCode === 0) {
          this.setState({
            reason: "",
            height: "",
            weight: "",
            bloodType: "",
            pathology: "",
            genderIdentity:
              this.props.userInfo?.gender === "M"
                ? {
                    label:
                      this.props.language === LANGUAGES.VI ? "Nam" : "Male",
                    value: "M",
                  }
                : this.props.userInfo?.gender === "F"
                ? {
                    label:
                      this.props.language === LANGUAGES.VI ? "Nữ" : "Female",
                    value: "F",
                  }
                : {
                    label:
                      this.props.language === LANGUAGES.VI ? "Khác" : "Other",
                    value: "O",
                  },
            doctorId: "",
            forwho: "",
            timetype: "",
            date: "",
            language: "",
            pickDate: "",
            patientAge: "",
            doctorName: "",
          });
          toast.success("Thêm lịch hẹn thành công");
        } else {
          toast.error("Bạn nhập thiếu thông tin.Xin mời kiểm tra lại");
        }
        this.props.closeBookingModal();
      } else {
        this.setState({ isOpenModalWaiting: true });
        let timeString = this.renderBookingTime(this.props.dataTime);
        let doctorName = this.renderDoctorName(this.props.dataTime);
        let res = await postPatientAppointment({
          lastName: this.state.lastName,
          firstName: this.state.firstName,
          phoneNumber: this.state.phoneNumber,
          email: this.state.email,
          address: this.state.address,
          reason: this.state.reason,
          genderIdentity: this.state.genderIdentity.value,
          doctorId: this.state.doctorId,
          forwho: this.state.forwho,
          timetype: this.state.timetype,
          date: this.props.dataTime.date,
          language: this.props.language,
          pickDate: timeString,
          patientAge: this.state.patientAge,
          doctorName: doctorName,
          fromSpecialtyHospital: false,
          height: this.state.height,
          weight: this.state.weight,
          bloodType: this.state.bloodType.value,
          pathology: this.state.pathology,
        });
        this.setState({ isOpenModalWaiting: false });
        if (res && res.errCode === 0) {
          this.setState({
            // lastName: this.state.lastName,
            // firstName: this.state.firstName,
            // phoneNumber: this.state.phoneNumber,
            // email: this.state.email,
            // address: this.state.address,
            reason: "",
            reason: "",
            height: "",
            weight: "",
            bloodType: "",
            pathology: "",
            genderIdentity:
              this.props.userInfo?.gender === "M"
                ? {
                    label:
                      this.props.language !== LANGUAGES.VI ? "Nam" : "Male",
                    value: "M",
                  }
                : this.props.userInfo?.gender === "F"
                ? {
                    label:
                      this.props.language !== LANGUAGES.VI ? "Nữ" : "Female",
                    value: "F",
                  }
                : {
                    label:
                      this.props.language !== LANGUAGES.VI ? "Khác" : "Other",
                    value: "O",
                  },
            doctorId: "",
            forwho: "",
            timetype: "",
            date: "",
            language: "",
            pickDate: "",
            patientAge: "",
            doctorName: "",
          });
          toast.success("Thêm lịch hẹn thành công");
        } else {
          toast.error("Bạn nhập thiếu thông tin.Xin mời kiểm tra lại");
        }
        this.props.closeBookingModal();
      }
    }
  };
  handleKeyDown = (event) => {
    console.log("handleKeyDown");
    if (event.key === "Enter") {
      // Perform action on Enter key press inside the modal
      this.handleConfirmBooking();
    }
  };
  render() {
    let {
      genderIdentity,
      isOpenModalWaiting,
      height,
      weight,
      bloodType,
      pathology,
    } = this.state;
    let {
      isOpenModal,
      closeBookingModal,
      dataTime,
      name,
      nameEn,
      image,
      specialtyBooking,
      doctorInfor
    } = this.props;
    let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
    const bloodTypeArr = [
      {
        value: "A+",
        label: "A+",
      },
      {
        value: "A-",
        label: "A-",
      },
      {
        value: "B+",
        label: "B+",
      },
      {
        value: "B-",
        label: "B-",
      },
      {
        value: "AB+",
        label: "AB+",
      },
      {
        value: "AB-",
        label: "AB-",
      },
      {
        value: "O+",
        label: "O+",
      },
      {
        value: "O-",
        label: "O-",
      },
      {
        value: "unidentified",
        label: "Chưa xác định",
      },
    ];
    return (
      <Modal
        isOpen={isOpenModal}
        size="lg"
        toggle={closeBookingModal}
        centered={true}
        backdrop={true}
        // onKeyDown={this.handleKeyDown}
        className="booking-modal-container"
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              <FormattedMessage id="patient.modal-booking.booking-infor" />
            </span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <ModalWaiting isOpenModalWaiting={isOpenModalWaiting} />
          <div className="booking-modal-body">
            <div className="doctor-infor">
              {specialtyBooking === true ? (
                <ProfileDoctorSpecialty
                  name={name}
                  nameEn={nameEn}
                  image={image}
                  showInModal={true}
                  date={dataTime.date}
                  bookingTimeVi={dataTime.bookingTimeVi}
                  bookingTimeEn={dataTime.bookingTimeEn}
                />
              ) : (
                <ProfileDoctor
                  doctorId={doctorId}
                  isShowDescription={false}
                  dataTime={dataTime}
                  isShowPrice={true}
                  isShowDetail={false}
                  doctorInfor={doctorInfor}
                />
              )}
            </div>
            <div className="booking-information">
              <div className="basic-information row">
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.modal-booking.email" />
                  </label>
                  <input
                    className="input-container"
                    readOnly={true}
                    value={this.state.email}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "email")
                    }
                  ></input>
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.modal-booking.address-contact" />
                  </label>
                  <input
                    className="input-container"
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "address")
                    }
                  ></input>
                </div>
                <div className="col-4 form-group">
                  <label>
                    <FormattedMessage id="patient.modal-booking.lastname" />
                  </label>
                  <input
                    className="input-container"
                    value={this.state.firstName}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "firstName")
                    }
                  ></input>
                </div>
                <div className="col-4 form-group">
                  <label>
                    <FormattedMessage id="patient.modal-booking.firstname" />
                  </label>
                  <input
                    className="input-container"
                    value={this.state.lastName}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "lastName")
                    }
                  ></input>
                </div>
                <div className="col-4 form-group">
                  <label>
                    <FormattedMessage id="patient.modal-booking.phonenumber" />
                  </label>
                  <input
                    type="number"
                    className="input-container"
                    value={this.state.phoneNumber}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "phoneNumber")
                    }
                  ></input>
                </div>
              </div>

              <div className="medical-information row">
              <div className="col-4 form-group">
                  <label>
                    <FormattedMessage id="patient.modal-booking.booking-for" />
                  </label>
                  <input
                    className="input-container"
                    value={this.state.forwho}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "forwho")
                    }
                  ></input>
                </div>
                <div className="col-5 form-group">
                  <label>
                    <FormattedMessage id="patient.modal-booking.prognostic" />
                  </label>
                  <input
                    className="input-container"
                    value={this.state.reason}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "reason")
                    }
                  ></input>
                </div>

                <div className="col-3 form-group">
                  <label>
                    <FormattedMessage id="patient.modal-booking.patientAge" />
                  </label>
                  <input
                    type="number"
                    className="small-input input-container "
                    value={this.state.patientAge}
                    min={0}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "patientAge")
                    }
                  ></input>
                </div>
                <div className="col-3 form-group">
                  <label>
                    <FormattedMessage id="patient.modal-booking.genderIdentity" />
                  </label>
                  <Select
                    name="genderIdentity"
                    value={genderIdentity}
                    onChange={this.handleChangeSelectInfor}
                    options={this.state.genders}
                  ></Select>
                </div>
                <div className="col-3 form-group">
                  <label>
                    <FormattedMessage id="patient.modal-booking.bloodType" />
                  </label>
                  <Select
                    name="bloodType"
                    value={bloodType}
                    onChange={this.handleChangeSelectInfor}
                    options={bloodTypeArr}
                  ></Select>
                </div>
                <div className="col-3 form-group">
                  <label>
                    <FormattedMessage id="patient.modal-booking.height" />
                  </label>
                  <input
                    className="small-input input-container"
                    type="number"
                    value={height}
                    min={120}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "height")
                    }
                  ></input>
                </div>
                <div className="col-3 form-group">
                  <label>
                    <FormattedMessage id="patient.modal-booking.weight" />
                  </label>
                  <input
                    className="small-input input-container "
                    type="number"
                    value={weight}
                    min={5}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "weight")
                    }
                  ></input>
                </div>
                <div className="col-12 form-group">
                  <label>
                    <FormattedMessage id="patient.modal-booking.pathology" />
                  </label>
                  <textarea
                    className="pathology"
                    type="text"
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "pathology")
                    }
                    value={pathology}
                    placeholder="Nếu có thông tin về bệnh lý, bệnh nhân vui lòng cung cấp để các bác sĩ nắm rõ thông tin"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn-booking-comfirm"
              onClick={() => this.handleConfirmBooking()}
            >
              Xác nhận
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
