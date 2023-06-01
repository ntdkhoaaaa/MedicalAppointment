import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { CommonUtils } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { toast } from "react-toastify";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";
import * as actions from "../../../store/actions";
import { updateClinicbyId } from "../../../services/userServices";
// import "./ManageClinicByAccountant.scss";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHospitalByAccountant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameEn: "",
      imageBase64: "",
      previewImgURL: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      address: "",
      addressEn: "",
      isOpen: false,
      idClinic: "",
    };
  }
  async componentDidMount() {
    this.props.fetchDetailedClinic(this.props.userInfo.clinicId);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.clinicDetailed !== prevProps.clinicDetailed) {
      console.log("chekckkkk", this.props.clinicDetailed);
      let clinic = this.props.clinicDetailed;

      this.setState({
        imageBase64: clinic.image,
        name: clinic.name,
        nameEn: clinic.nameEn,
        previewImgURL: clinic.image,
        descriptionHTML: clinic.descriptionHTML,
        descriptionMarkdown: clinic.descriptionMarkdown,
        address: clinic.address,
        addressEn: clinic.addressEn,
        idClinic: clinic.id,
      });
    }
  }
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        imageBase64: base64,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };
  handleSaveNewClinic = async () => {
    let res = await updateClinicbyId({
      name: this.state.name,
      nameEn: this.state.nameEn,
      imageBase64: this.state.imageBase64,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
      address: this.state.address,
      addressEn: this.state.addressEn,
      id: this.state.idClinic,
    });
    await this.props.fetchDetailedClinic(this.props.userInfo.clinicId);
    if (res && res.errCode === 0) {
      toast.success("Create a new clinic successfully");
    } else {
      toast.error("Create a new clinic fail");
    }
  };
  handleEditClinicFromParent = async (clinic) => {
    this.setState({
      imageBase64: clinic.image,
      name: clinic.name,
      nameEn: clinic.nameEn,
      previewImgURL: clinic.image,
      descriptionHTML: clinic.descriptionHTML,
      descriptionMarkdown: clinic.descriptionMarkdown,
      address: clinic.address,
      addressEn: clinic.addressEn,
      idClinic: clinic.id,
    });
  };
  render() {
    return (
      <div className="manage-clinic-container">
        {/* <div className="ms-title">Quản lý phòng khám</div> */}
        <div className="add-new-clinic">
          <div className="clinic-basic-infor">
            <div className="clinic-infor">
              <div className="clinic-name">
                <label className="clinic-name-tilte"> Tên</label>
                <div className="nameVi">
                  <label className="nameVi-tilte">Tên phòng khám</label>
                  <input
                    value={this.state.name}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "name")
                    }
                    className="nameVi-input"
                    type="text"
                  />
                </div>
                <div className="nameEn">
                  <label className="nameEn-tilte">Tên tiếng anh</label>
                  <input
                    value={this.state.nameEn}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "nameEn")
                    }
                    className="nameEn-input"
                    type="text"
                  />
                </div>
              </div>
              <div className="clinic-address">
                <label className="clinic-address-tilte">
                  Địa chỉ phòng khám
                </label>
                <div className="addressVi">
                  <label className="addressVi-tilte">Địa chỉ tiếng việt</label>
                  <input
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "address")
                    }
                    className="addressVi-input"
                    type="text"
                  />
                </div>
                <div className="addressEn">
                  <label className="addressEn-tilte">Địa chỉ tiếng anh</label>
                  <input
                    value={this.state.addressEn}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "addressEn")
                    }
                    className="addressEn-input"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="clinic-image">
              <label className="image-tilte">Ảnh</label>
              <div className="save-container">
                <input
                  className="preview"
                  id="preview-img"
                  style={{
                    backgroundImage: `url(${this.state.previewImgURL})`,
                  }}
                  type="file"
                  onChange={(event) => this.handleOnChangeImage(event)}
                />
                <div className="btn-save">
                  <button
                    className="btn-add-new-clinic"
                    onClick={() => this.handleSaveNewClinic()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="clinic-extra-infor">
            <MdEditor
              value={this.state.descriptionMarkdown}
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
            />
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
    clinicDetailed: state.clinicAccountant.clinicDetailed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetailedClinic: (id) => dispatch(actions.fetchDetailedClinic(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageHospitalByAccountant);
