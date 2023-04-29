import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import './DoctorSpecialtyExtraInfor.scss'
import NumberFormat from 'react-number-format'
class DoctorSpecialtyExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  render() {
    let { language } = this.props;
    let {location,locationEn,priceDataForHospital,name,nameEn}=this.props
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.detail-doctor.address" />
          </div>
          <div className="clinic-name">
            { name && nameEn ? (
              language === LANGUAGES.VI ? (
                <span>{name}</span>
              ) : (
                <span>{nameEn}</span>
              )
            ) : (
              ""
            )}
          </div>
          <div className="address">
            { location&& locationEn ? (
              language === LANGUAGES.VI ? (
                <span>{location}</span>
              ) : (
                <span>{locationEn}</span>
              )
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="content-down">
          {
           (
            <>
              <div className="title-price">
                <FormattedMessage id="patient.detail-doctor.Medical-fee" />:
                {priceDataForHospital ? (
                      language === LANGUAGES.VI ? (
                        <NumberFormat
                          className="currency"
                          value={priceDataForHospital.valueVi}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"VND"}
                        />
                      ) : (
                        <NumberFormat
                          className="currency"
                          value={priceDataForHospital.valueEn}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"$"}
                        />
                      )
                    ):( "")}
              </div>
            </>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorSpecialtyExtraInfor);
