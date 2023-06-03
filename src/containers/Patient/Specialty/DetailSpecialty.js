import React, { Component } from "react";
import { connect } from "react-redux";
// import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { withRouter } from "react-router";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDetailSpecialtyById,
  getAllCodeService,
} from "../../../services/userServices";
import _ from "lodash";
// import Select from 'react-select';

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      dataDetailSpecialty: {},
      provinceList: [],
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailSpecialtyById({
        id: id,
        location: "ALL",
      });
      console.log('check result',res)
      let provinces = await getAllCodeService("PROVINCE");
      if (res && res.errCode === 0 && provinces && provinces.errCode === 0) {
        let provinceData = provinces.data;
        let data = res.data;
        let arrDoc = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.specialtyData;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoc.push(item.doctorId);
            });
          }
        }
        if (provinceData && provinceData.length > 0) {
          provinceData.unshift({
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "ALL",
            valueVi: "Toàn quốc",
          });
        }
        this.setState({
          dataDetailSpecialty: res.data,
          provinceList: provinceData,
          arrDoctors: arrDoc,
        });
      }

      console.log("check res", res);
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnChangeProvince = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;
      let res = await getDetailSpecialtyById({
        id: id,
        location: location,
      });
      console.log("res selection", res);
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoc = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.specialtyData;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoc.push(item.doctorId);
            });
          }
        }
        this.setState({
          arrDoctors: arrDoc,
        });
      } else {
        this.setState({
          arrDoctors: [],
        });
      }
    }
  };
  render() {
    let { arrDoctors, dataDetailSpecialty, provinceList } = this.state;
    let { language } = this.props;
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="header-description">
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty.descriptionHTML,
                }}
              ></div>
            )}
          </div>
          <div className="province-selection">
            <select onChange={(event) => this.handleOnChangeProvince(event)}>
              {provinceList &&
                provinceList.length > 0 &&
                provinceList.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            {arrDoctors && arrDoctors.length > 0 ? (
              arrDoctors.map((item, index) => {
                return (
                  <div className="each-doctor" key={index}>
                    <div className="dt-content-left">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescription={true}
                        isShowDetail={true}
                        isShowPrice={false}
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
              <div>Hiện chưa có bác sĩ của hệ thống đăng ký khu vực này</div>
            )}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty)
);
