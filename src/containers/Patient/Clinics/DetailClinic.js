import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { withRouter } from "react-router";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getDetailClinicById } from "../../../services/userServices";
import _ from "lodash";
import * as actions from "../../../store/actions";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      dataDetailClinic: {},
    };
  }
  async componentDidMount() {
    let { arrDoctors } = this.state;
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailClinicById({
        id: id,
      });
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoc = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.clinicData;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoc.push(item);
            });
          }
        }
      console.log("check res", res);

        this.setState({
          dataDetailClinic: res.data,
          arrDoctors: arrDoc,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}
  MoveToSpecialties= () =>{
    if (this.props.history) {
        this.props.history.push(`/hospital-specialties/${this.props.match.params.id}`)
    }
  }
  render() {
    let { arrDoctors, dataDetailClinic } = this.state;
    console.log("render", dataDetailClinic);
    let { language } = this.props;
    console.log("render", this.state);
    return (
      <div className="detail-clinic-container">
        <HomeHeader />
        <div className="detail-clinic-body">
          <div className="header-description">
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailClinic?.descriptionHTML,
                }}
              ></div>
            )}
          </div>
          {arrDoctors && arrDoctors.length > 0 ? (
            arrDoctors.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="dt-content-left">
                    <ProfileDoctor
                      doctorId={item.id}
                      doctorInfor={item}
                      isShowDescription={true}
                      isShowDetail={true}
                      isShowPrice={false}
                      checkModal={false}
                    />
                  </div>
                  <div className="dt-content-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item} />
                    </div>

                    <div className="doctor-extra-infor">
                      <DoctorExtraInfor doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="choose-specialty">
              <button onClick={() => this.MoveToSpecialties()}>Chọn chuyên khoa</button>
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
  return {

  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailClinic)
);
