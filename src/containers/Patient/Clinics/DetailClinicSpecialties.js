import React, { Component } from "react";
import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
// import { withRouter } from "react-router";
import { Link, withRouter } from 'react-router-dom';

import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailClinicSpecialties.scss";
import * as actions from "../../../store/actions";
class DetailClinicSpecialties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialty: [],
    };
  }
  async componentDidMount() {
    this.props.fetchAllSpecialtiesOfClinic(this.props.match.params.id);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (prevProps.clinicSpecialties !== this.props.clinicSpecialties) {
      this.setState({
        listSpecialty: this.props.clinicSpecialties,
      });
    }
  }
  render() {
    let { listSpecialty } = this.state;
    let { language } = this.props;
    return (
      <div className="hospital-specialties">
        <HomeHeader />
        <div className="hospital-specialties-header">
          <span>Chọn chuyên khoa</span>
          <div className="search">
            <input
              className="search-specialties"
              type="text"
              id="myInput"
              title="Type in a name"
            />
            <div className="icon-container">
              <i className="fas fa-search"></i>
            </div>
          </div>
        </div>
        <div className="hospital-specialties-container">
          {listSpecialty &&
            listSpecialty.length > 0 &&
            listSpecialty.map((item) => {
              console.log(item);
              return (
                <Link 
                to={`/hospital-specialty/${this.props.match.params.id}/${item.id}`}
                className="each-item">
                  <div className="hospital-specialty-item">
                    <div
                      className="hospital-specialty-item-image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className="hospital-specialty-item-extra-infor">
                      <div className="specialty-name">
                        {language === LANGUAGES.VI ? item.name : item.nameEn}
                      </div>
                      <div className="apartment-location">
                        <i className="fas fa-map-marker-alt"></i>
                        {language === LANGUAGES.VI
                          ? item.location
                          : item.locationEn}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
    clinicSpecialties: state.clinicAccountant.clinicSpecialties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialtiesOfClinic: (data) =>
      dispatch(actions.fetchAllSpecialtiesOfClinic(data)),

  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailClinicSpecialties)
);
