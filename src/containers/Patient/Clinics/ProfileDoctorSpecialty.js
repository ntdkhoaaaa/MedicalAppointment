import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import "./ProfileDoctorSpecialty.scss";
// import * as actions from "../../../store/actions";
import _ from "lodash";
import moment from "moment/moment";

class ProfileDoctorSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  renderBookingTime = (bookingTimeVi, bookingTimeEn, date) => {
    if (bookingTimeVi && bookingTimeEn) {
      // let formatted=moment.unix(date).format('dddd - DD/MM/YYYY')
      // console.log(formatted);
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
                moment.unix(date).format("dddd - DD/MM/YYYY")
              )
            : moment.unix(date).locale("en").format("ddd - DD/MM/YYYY");

        return (
          <>
            <div>
              {time} - {day}
            </div>
            <div>
              <FormattedMessage id="patient.modal-booking.bookingforfree" />
            </div>
          </>
        );
      }
      return <></>;
    }
  };
  render() {
    let {
      image,
      name,
      nameEn,
      showInModal,
      date,
      bookingTimeVi,
      bookingTimeEn,
    } = this.props;
    let { language } = this.props;
    return (
      <div
        className={
          showInModal === true ? "profile-container-modal" : "profile-container"
        }
      >
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{ backgroundImage: `url(${image && image ? image : ""})` }}
          ></div>
          <div className="content-right">
            <div className="Up">
              {language === LANGUAGES.VI ? name : nameEn}
              {/* <Link to={`/detail-doctor/${doctorId}`} >{language === LANGUAGES.VI ? nameVi : nameEn}</Link> */}
            </div>
            <div className="Down">
              {showInModal === false ? (
                <div>
                  <div>Giáo sư, tiến sĩ, bác sĩ giàu kinh nghiệm</div>
                  <div>Hỗ trợ đặt lịch khám trực tuyến</div>
                  <div>Giảm thời gian chờ đợi, ưu tiên khám nhanh</div>
                </div>
              ) : (
                <div>
                  <div>
                    {this.renderBookingTime(bookingTimeVi, bookingTimeEn, date)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
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
)(ProfileDoctorSpecialty);
