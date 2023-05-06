import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import "./UserBasicInfor.scss";
import {
  getAllUsers,
  editUserInforByOwnService,
} from "../../../services/userServices";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";
import Select from "react-select";

class UserBasicInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      avatar: "",
      previewImgURL: "",
      firstName: "",
      lastName: "",
      height: "",
      weight: "",
      bloodType: "",
      pathology: "",
    };
  }
  async componentDidMount() {
    let { userInfo } = this.props;
    let response = await getAllUsers(userInfo?.id);
    let blood={}
    if(response.users?.bloodType)
    {
      blood = {
        value: response.users?.bloodType,
        label: response.users?.bloodType
      }
    }
    if (response && response.errCode === 0) {
      this.setState({
        email: response.users?.email,
        firstName: response.users?.firstName,
        lastName: response.users?.lastName,
        phoneNumber: response.users?.phoneNumber,
        address: response.users?.address,
        gender: response.users?.gender,
        avatar: response.users?.image,
        previewImgURL: response.users?.image,
        height: response.users?.height,
        weight: response.users?.weight,
        bloodType: blood,
        pathology: response.users?.pathology,
      });
    }

  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.userInfo !== prevProps.userInfo) {
      let { userInfo } = this.props;
      let response = await getAllUsers(userInfo?.id);
      let blood={}
      if(response.users?.bloodType)
      {
        blood = {
          value: response.users?.bloodType,
          label: response.users?.bloodType
        }
      }
      if (response && response.errCode === 0) {
        this.setState({
          email: response.users?.email,
          firstName: response.users?.firstName,
          lastName: response.users?.lastName,
          phoneNumber: response.users?.phoneNumber,
          address: response.users?.address,
          gender: response.users?.gender,
          avatar: response.users?.image,
          previewImgURL: response.users?.image,
          height: response.users?.height,
          weight: response.users?.weight,
          bloodType: blood,
          pathology: response.users?.pathology,
        });
      }
    }
  }
  setGenderCheck = (gender) => {
    this.setState({
      gender: gender.gender,
    });
  };
  async SaveBasicInfor() {
    let gender = this.state.gender;
    if (gender === "male") {
      gender = "M";
    }
    if (gender === "female") {
      gender = "F";
    }
    if (gender === "other") {
      gender = "O";
    }
    let user = {
      id: this.props.userInfo.id,
      email: this.state.email,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: gender,
      avatar: this.state.avatar,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      height: this.state.height,
      weight: this.state.weight,
      bloodType: this.state.bloodType.value,
      pathology: this.state.pathology,
    };
    let res = await editUserInforByOwnService(user);
    if (res && res.errCode === 0) {
      toast.success("Cập nhật thông tin thành công");
    } else {
      toast.error(
        "Cập nhật thông tin không thành công.Xem lại thông tin và hình ảnh theo quy định"
      );
    }
  }
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
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
  render() {
    let {
      email,
      firstName,
      lastName,
      phoneNumber,
      address,
      previewImgURL,
      height,
      weight,
      bloodType,
      pathology,
    } = this.state;
    let genderCheck = this.state.gender;
    if (genderCheck === "M") {
      genderCheck = "male";
    }
    if (genderCheck === "F") {
      genderCheck = "female";
    }
    if (genderCheck === "O") {
      genderCheck = "other";
    }
    const genderArr = [
      {
        id: 1,
        gender: "male",
      },
      {
        id: 2,
        gender: "female",
      },
      {
        id: 3,
        gender: "other",
      },
    ];
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
    ];
    return (
      <div className="user-detail-container">
        <div className="patient-infor">
          <div className="left">
            <input
              className="preview-img"
              type="file"
              style={{ backgroundImage: `url(${previewImgURL})` }}
              onChange={(event) => this.handleOnChangeImage(event)}
            />
          </div>
          <div className="right">
            <div className="basic-infor">
              <span className="title-name">
                {lastName} {firstName}
              </span>
              <div className="user-information">
                <div className="user-name">
                  <div className="firstName">
                    <label className="sub-title">
                      <span>
                        <i class="fas fa-user"></i>First Name{" "}
                      </span>{" "}
                    </label>
                    <input
                      onChange={(event) => {
                        this.onChangeInput(event, "firstName");
                      }}
                      className="input-container user-mail "
                      defaultValue={firstName}
                    />
                  </div>
                  <div className="lastName">
                    <label className="sub-title">
                      <span>
                        <i class="fas fa-user"></i>Last Name{" "}
                      </span>{" "}
                    </label>
                    <input
                      onChange={(event) => {
                        this.onChangeInput(event, "lastName");
                      }}
                      className="input-container user-mail "
                      defaultValue={lastName}
                    />
                  </div>
                </div>
                <div className="extra-infor">
                  <div className="basic-information">
                    <div className="phone">
                      <label className="sub-title">
                        <span>
                          <i class="fas fa-phone"></i> Điện thoại{" "}
                        </span>{" "}
                      </label>
                      <input
                        onChange={(event) => {
                          this.onChangeInput(event, "phoneNumber");
                        }}
                        className="input-container user-mail "
                        defaultValue={phoneNumber}
                      />
                    </div>
                    <div className="address">
                      <label className="sub-title">
                        <span>
                          <i class="fas fa-map-marker-alt"></i> Địa chỉ{" "}
                        </span>{" "}
                      </label>
                      <input
                        onChange={(event) => {
                          this.onChangeInput(event, "address");
                        }}
                        className="input-container user-mail "
                        defaultValue={address}
                      />
                    </div>
                  </div>
                  <div className="basic-information">
                    <div className="email">
                      <label className="sub-title">
                        <span>
                          <i class="fas fa-envelope"></i> Email{" "}
                        </span>{" "}
                      </label>
                      <input
                        disabled={true}
                        onChange={(event) => {
                          this.onChangeInput(event, "email");
                        }}
                        className="input-container user-mail "
                        defaultValue={email}
                      />
                    </div>
                    <div className="radio-group">
                      {genderArr.map((gender) => (
                        <div key={gender.id} className="male">
                          <input
                            type="radio"
                            onChange={() => this.setGenderCheck(gender)}
                            checked={genderCheck === gender.gender}
                          />
                          <label>
                            {gender.gender === "male"
                              ? "Nam"
                              : gender.gender === "female"
                              ? "Nữ"
                              : "Khác"}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="medical-infor">
              <span className="medical-info-title">Medical Information</span>
              <div className="medical-user-information">
                <div className="personal-parameters">
                  <div className="user-height">
                    <label className="sub-title">
                      <span>
                        <i class="fas fa-ruler-vertical"></i>Chiều cao(cm){" "}
                      </span>{" "}
                    </label>
                    <input
                      type="number"
                      onChange={(event) => {
                        this.onChangeInput(event, "height");
                      }}
                      className="input-container user-mail "
                      defaultValue={height}
                    />
                  </div>
                  <div className="user-weight">
                    <label className="sub-title">
                      <span>
                        <i class="fas fa-weight"></i>Cân nặng(kg){" "}
                      </span>{" "}
                    </label>
                    <input
                      type="number"
                      onChange={(event) => {
                        this.onChangeInput(event, "weight");
                      }}
                      className="input-container user-mail "
                      defaultValue={weight}
                    />
                  </div>
                  <div className="bloodType">
                    <label className="sub-title">
                      <span>
                        <i class="fas fa-tint"></i> Nhóm máu{" "}
                      </span>{" "}
                    </label>
                    <Select
                      placeholder="Chọn nhóm máu"
                      value={bloodType}
                      name="bloodType"
                      onChange={this.handleChangeSelectInfor}
                      options={bloodTypeArr}
                    />
                  </div>
                </div>
                <div className="personal-pathology">
                  <label className="sub-title">
                    <span>
                      <i class="fas fa-notes-medical"></i> Bệnh lý{" "}
                    </span>{" "}
                  </label>
                  <textarea
                    className="pathology"
                    type="text"
                    onChange={(event) => this.onChangeInput(event, "pathology")}
                    value={pathology}
                    placeholder="Nếu có thông tin về bệnh lý, bệnh nhân vui lòng cung cấp để các bác sĩ nắm rõ thông tin"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="btn-container">
            <button className="btn btn-submit" onClick={()=>this.SaveBasicInfor()}>
              Save
            </button>
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
    userInfo: state.user.userInfo,
    permission: state.user.permission,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBasicInfor);
