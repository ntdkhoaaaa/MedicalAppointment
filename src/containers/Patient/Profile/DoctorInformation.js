import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { Link } from "react-router-dom";
import { da } from "date-fns/locale";
import "./DoctorInformation.scss";
import {
  getProfileDoctorById,
  getAllUsers,
} from "../../../services/userServices";
class DoctorInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    console.log("DoctorInformation");
    if (this.props.doctorId) {
      let res = await getProfileDoctorById(this.props.doctorId);
      if (res && res.errCode === 0) {
        this.setState({ dataProfile: res.data });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      console.log("DoctorInformation");
      let res = await getProfileDoctorById(this.props.doctorId);
      if (res && res.errCode === 0) {
        this.setState({ dataProfile: res.data });
      }
    }
  }
  render() {
    let { language, showDescription } = this.props;
    let nameVi, nameEn;
    let { dataProfile } = this.state;
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi},${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn},${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    let nameSpecialty = "";
    let clinicAddress = "";
    if (dataProfile.Doctor_Infor) {
      nameSpecialty = `${dataProfile.Doctor_Infor.nameSpecialty}`;
      clinicAddress = `${dataProfile.Doctor_Infor.addressClinic}`;
    }
    if (dataProfile.Doctor_Clinic_Specialty) {
      nameSpecialty = `${dataProfile.Doctor_Clinic_Specialty.specialtyData.name}`;
      clinicAddress = `${dataProfile.Doctor_Clinic_Specialty.specialtyData.location}`;
    }
    console.log(dataProfile);
    return (
      <div className="intro-doctor">
        <div
          className="content-left"
          style={{
            backgroundImage: `url(${
              dataProfile && dataProfile.image ? dataProfile.image : ""
            })`,
          }}
        ></div>
        <div className="content-right">
          <div className="Up">
            <Link
              to={
                dataProfile.Doctor_Infor !== null
                  ? `/detail-doctor/${this.props.doctorId}`
                  : `/hospital-specialty/${dataProfile.Doctor_Clinic_Specialty.clinicId}/${dataProfile.Doctor_Clinic_Specialty.specialtyId}`
              }
            >
              {this.props.language === LANGUAGES.VI ? nameVi : nameEn}
            </Link>
          </div>
          {showDescription && showDescription === true && (
            <div className="Down">
              <div>{nameSpecialty}</div>
              <div>{clinicAddress}</div>
            </div>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInformation);
