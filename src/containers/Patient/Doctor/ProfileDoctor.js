import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";

import { Link } from "react-router-dom";
import { getProfileDoctorById } from "../../../services/userServices";
import _ from "lodash";
import moment from "moment/moment";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    if (this.props.checkModal && this.props.checkModal === true) {
      let data = await this.getProfileDoctor(this.props.doctorId, true);
      this.setState({
        dataProfile: data,
      });
    } else {
      let data = await this.getProfileDoctor(this.props.doctorId, false);
      console.log(data);
      this.setState({
        dataProfile: data,
      });
    }
  }
  getProfileDoctor = async (id, checkModal) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id, checkModal);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      if (this.props.checkModal && this.props.checkModal === true) {
        let data = await this.getProfileDoctor(this.props.doctorId, true);
        this.setState({
          dataProfile: data,
        });
      } else {
        let data = await this.getProfileDoctor(this.props.doctorId, false);
        this.setState({
          dataProfile: data,
        });
      }
      // let data = await this.getProfileDoctor(this.props.doctorId)
      // this.setState({
      //     dataProfile: data
      // })
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  renderBookingTime = (bookingTime) => {
    if (bookingTime) {
      let { language } = this.props;
      console.log(bookingTime);
      let time =
        language === LANGUAGES.VI
          ? bookingTime.timetypeData.valueVi
          : bookingTime.timetypeData.valueEn;
      if (bookingTime && !_.isEmpty(bookingTime)) {
        let date =
          language === LANGUAGES.VI
            ? this.capitalizeFirstLetter(
                moment
                  .unix(+bookingTime.date / 1000)
                  .format("dddd - DD/MM/YYYY")
              )
            : moment
                .unix(+bookingTime.date / 1000)
                .locale("en")
                .format("ddd - DD/MM/YYYY");
        return (
          <>
            <div>
              {time} - {date}
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
      language,
      isShowDescription,
      dataTime,
      isShowPrice,
      isShowDetail,
      doctorId,
      doctorInfor,
      detailDoctor,
    } = this.props;
    let { dataProfile } = this.state;
    let nameVi, nameEn;
    if (doctorInfor && doctorInfor.User) {
      nameVi = `${
        doctorInfor ? doctorInfor?.User?.lastName : dataProfile?.lastName
      } ${
        doctorInfor.User ? doctorInfor?.User?.firstName : dataProfile?.firstName
      }`;
      nameEn = `${
        doctorInfor ? doctorInfor?.User?.firstName : dataProfile?.firstName
      } ${
        doctorInfor.User ? doctorInfor?.User?.lastName : dataProfile?.lastName
      }`;
    }
    if (dataProfile) {
      nameVi = `${dataProfile?.lastName} ${dataProfile?.firstName}`;
      nameEn = `${dataProfile?.firstName} ${dataProfile?.lastName}`;
    }
    console.log("check dataTime: ", this.props);
    return (
      <div className="doctor-profile-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                doctorInfor?.User && doctorInfor?.User?.image
                  ? doctorInfor.User?.image
                  : doctorInfor && doctorInfor?.image
                  ? doctorInfor?.image
                  : dataProfile && dataProfile?.image
                  ? dataProfile.image
                  : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="Up">
              <Link to={`/detail-doctor/${doctorId}`}>
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </Link>
            </div>
            <div className="Down">
              {isShowDescription === true ? (
                <>
                  {doctorInfor?.User?.Markdown ?
                    doctorInfor?.User?.Markdown?.description && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: doctorInfor?.User?.Markdown?.description,
                        }}
                      >

                      </div>
                    )
                :
                dataProfile.Markdown && (
                    <div
                    dangerouslySetInnerHTML={{
                      __html: dataProfile.Markdown.description,
                    }}
                  >

                  </div>
                )
                }
                </>
              ) : (
                <>{this.renderBookingTime(dataTime)}</>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
