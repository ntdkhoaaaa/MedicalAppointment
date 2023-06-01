import React, { Component } from "react";
import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
// import { LANGUAGES } from "../../../utils";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSpecialtyExtraInfor from "./DoctorSpecialtyExtraInfor";
import DoctorSpecialtySchedule from "./DoctorSpecialtySchedule";
import ProfileDoctorSpecialty from "./ProfileDoctorSpecialty";
import "./HospitalSpecialtySchedules.scss";
import * as actions from "../../../store/actions";

class HospitalSpecialtySchedules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extraSpecialtyInfor:[]
    };
  }
  async componentDidMount() {
    await this.props.fetchExtraSpecialtyInforClinic(this.props.match.params.specialtyId)
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (
      prevProps.extraSpecialtyInfor !== this.props.extraSpecialtyInfor
    ) {
      this.setState({
        extraSpecialtyInfor:this.props.extraSpecialtyInfor
      })
    }
  }
  render() {
    let { extraSpecialtyInfor} =
      this.state;
      console.log(extraSpecialtyInfor)
    return (
      <div className="hospital-specialty-schedules">
        <HomeHeader />
        <div className="each-doctor-specialty">
          <div className="left">
            <ProfileDoctorSpecialty 
            image={extraSpecialtyInfor.image}
            name={extraSpecialtyInfor.name}
            nameEn={extraSpecialtyInfor.nameEn}
            showInModal={false}
            />
          </div>
          <div className="right">
            <DoctorSpecialtySchedule
            clinicId={this.props.match.params.id}
            specialtyId={this.props.match.params.specialtyId}
            image={extraSpecialtyInfor.image}
            name={extraSpecialtyInfor.name}
            nameEn={extraSpecialtyInfor.nameEn}
            />
            <DoctorSpecialtyExtraInfor 
            name={extraSpecialtyInfor.name}
            nameEn={extraSpecialtyInfor.nameEn}
            location={extraSpecialtyInfor.location}
            locationEn={extraSpecialtyInfor.locationEn}
            priceDataForHospital={extraSpecialtyInfor.priceDataForHospital}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    extraSpecialtyInfor: state.hospitalAccountant.extraSpecialtyInfor,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    fetchExtraSpecialtyInforClinic: (specialtyId) =>
    dispatch(actions.fetchExtraSpecialtyInforClinic(specialtyId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HospitalSpecialtySchedules);
