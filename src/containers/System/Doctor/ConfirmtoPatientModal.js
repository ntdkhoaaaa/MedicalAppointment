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
import { postPatientAppointment } from "../../../services/userServices";
import { toast } from "react-toastify";
import moment from "moment/moment";
import UserProfile from "../../Patient/Profile/UserProfile";
import ProfileUser from "./ProfileUser";

class ConfirmtoPatientModal extends Component {
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
      trieuchung: "",
      kedonthuoc: "",
      songaycap: "",
      donthuocs: [
        {
          tenthuoc: "",
          donvitinh: "",
          soluong: "",
        },
      ],
    };
  }
  componentDidMount() {
    this.props.getGendersStart();
    if (this.props.isLoggedIn) {
      this.setState({
        email: this.props.userInfo?.email,
        lastName: this.props.userInfo?.lastName,
        firstName: this.props.userInfo?.firstName,
        address: this.props.userInfo?.address,
        phoneNumber: this.props.userInfo?.phoneNumber,
      });
    }
  }
  handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const donthuocs = [...this.state.donthuocs];
    donthuocs[idx] = {
      ...donthuocs[idx],
      [name]: value,
    };
    this.setState({
      donthuocs,
    });
  };
  handleAddRow = () => {
    const item = {
      tenthuoc: "",
      donvitinh: "",
      soluong: "",
    };
    this.setState({
      donthuocs: [...this.state.donthuocs, item],
    });
  };
  handleRemoveRow = () => {
    this.setState({
      donthuocs: this.state.donthuocs.slice(0, -1),
    });
  };
  handleRemoveSprcificRow = (idx) => () => {
    const donthuocs = [...this.state.donthuocs];
    donthuocs.splice(idx, 1);
    this.setState({ donthuocs });
  };
  // buildDataGenders = (data) => {
  //     let result = []
  //     let language = this.props.language;
  //     if (data && data.length > 0) {
  //         data.map(item => {
  //             let object = {}
  //             object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
  //             object.value = item.keyMap
  //             result.push(object)
  //         })
  //     }
  //     return result
  // }
  //componentDidUpdate(prevProps, prevState, snapshot) {
  // if (this.props.language !== prevProps.language) {
  //     this.setState({
  //         genders: this.buildDataGenders(this.props.genderRedux)
  //     })
  // }
  // if (this.props.genderRedux !== prevProps.genderRedux) {
  //     this.setState({
  //         genders: this.buildDataGenders(this.props.genderRedux)
  //     })
  // }
  // if (this.props.dataTime !== prevProps.dataTime) {
  //     if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
  //         let doctorId = this.props.dataTime.doctorId
  //         let timetype = this.props.dataTime.timetype
  //         let date = this.props.dataTime.date
  //         console.log('date', this.props.dataTime)
  //         this.setState({
  //             doctorId: doctorId,
  //             timetype: timetype,
  //             date: date
  //         })
  //     }
  // }
  // if (this.props.userInfo !== prevProps.userInfo) {
  //     this.setState({
  //         email: this.props.userInfo?.email,
  //         lastName: this.props.userInfo?.lastName,
  //         firstName: this.props.userInfo?.firstName,
  //         address: this.props.userInfo?.address,
  //         phoneNumber: this.props.userInfo?.phoneNumber
  //     })
  // }
  //}
  handleOnChangeInput = (event, id) => {
    let inputValue = event.target.value;
    let copyState = { ...this.state };
    copyState[id] = inputValue;
    this.setState({
      ...copyState,
    });
  };
  handleOnChangeDataPicker = (date) => {
    this.setState({
      doB: date[0],
    });
  };
  // handleOnChangeGender = (gender) => {
  //     console.log('onChangeGender ', gender)
  //     let genderSelected = gender.label
  //     this.setState({
  //         genderIdentity: genderSelected
  //     })
  // }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // renderBookingTime = (bookingTime) => {
  //     let { language } = this.props;
  //     // console.log(bookingTime);
  //     if (bookingTime && !_.isEmpty(bookingTime)) {
  //         let time = language === LANGUAGES.VI ? bookingTime.timetypeData.valueVi : bookingTime.timetypeData.valueEn
  //         let date = language === LANGUAGES.VI ?
  //             this.capitalizeFirstLetter(moment.unix(+bookingTime.date / 1000).format('dddd - DD/MM/YYYY'))
  //             :
  //             moment.unix(+bookingTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY')
  //         return `${time} - ${date}`
  //     }
  //     return ''

  // }
  // renderDoctorName = (bookingTime) => {
  //     let { language } = this.props;
  //     if (bookingTime && !_.isEmpty(bookingTime)) {
  //         let doctorNameEn = `${this.props.dataTime.doctorData.firstName} ${this.props.dataTime.doctorData.lastName}`;
  //         let doctorNameVi = `${this.props.dataTime.doctorData.lastName} ${this.props.dataTime.doctorData.firstName}`;
  //         let doctorName = language === LANGUAGES.VI ? doctorNameVi : doctorNameEn;
  //         return doctorName;
  //     }
  //     return ''
  // }
  // handleConfirmBooking = async () => {
  //     let timeString = this.renderBookingTime(this.props.dataTime)
  //     let doctorName = this.renderDoctorName(this.props.dataTime)
  //     let res = await postPatientAppointment({
  //         lastName: this.state.lastName,
  //         firstName: this.state.firstName,
  //         phoneNumber: this.state.phoneNumber,
  //         email: this.state.email,
  //         address: this.state.address,
  //         reason: this.state.reason,
  //         genderIdentity: this.state.genderIdentity,
  //         doctorId: this.state.doctorId,
  //         forwho: this.state.forwho,
  //         timetype: this.state.timetype,
  //         date: this.props.dataTime.date,
  //         language: this.props.language,
  //         pickDate: timeString,
  //         patientAge: this.state.patientAge,
  //         doctorName: doctorName,
  //     })
  //     console.log('check req', res)
  //     if (res && res.errCode === 0) {
  //         toast.success('Thêm lịch hẹn thành công')
  //     }
  //     else {
  //         toast.error('Bạn nhập thiếu thông tin.Xin mời kiểm tra lại')
  //     }
  //}
  render() {
    let { gender ,donthuocs} = this.state;
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    console.log("render", this.props.userInfo);
    console.log("don thuoc ", this.state.donthuocs);
    let patientId = dataTime && !_.isEmpty(dataTime) ? dataTime.patientId : "";
    return (
      <Modal
        isOpen={isOpenModal}
        size="lg"
        centered={true}
        backdrop={true}
        className="booking-modal-container"
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">Nhập đơn thuốc khám bệnh</span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>

          <div className="booking-modal-body">
            {/* {JSON.stringify(dataTime)} */}
            <div className="doctor-infor">
              <ProfileUser patientId={patientId} />
            </div>
            <div className="row">
              <div className="col-12 form-group">
                <label>Thời gian khám</label>
                <input
                  className="form-control"
                  readOnly={true}
                  value={dataTime.bookingDate}
                ></input>
              </div>
              <div className="col-12 form-group">
                <label>Bệnh án</label>
                <textarea
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "trieuchung")
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
                    {donthuocs.map((item, idx) => {
                        return (
                      <tr>
                                            <td>{idx}</td>
                        <td>
                          <input
                            type="text"
                            name="tenthuoc"
                            value={donthuocs[idx].tenthuoc}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="donvitinh"
                            value={donthuocs[idx].donvitinh}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="soluong"
                            min="1"
                            value={donthuocs[idx].soluong}
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
                    this.handleOnChangeInput(event, "songaycap")
                  }
                ></input>
              </div>
            </div>
          </div>

          <div className="booking-modal-footer">
            <button
              className="btn-booking-comfirm"
              onClick={() => this.handleConfirmBooking()}
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
