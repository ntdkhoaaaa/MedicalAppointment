import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import { CommonUtils } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { toast } from "react-toastify";
import {
  addNewSpecialtyOfClinic,
  deleteClinicSpecialtyById,
  updateClinicSpecialtybyId,
} from "../../../services/userServices";
import TableSpecialtiesClinic from "../Accountant/TableSpecialtiesClinic.js";
import * as actions from "../../../store/actions";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";
import "./ManageClinicSpecialties.scss";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinicSpecialties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameEn: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      listSpecialty: [],
      idSpecialty: "",
      action: CRUD_ACTIONS.CREATE,
      isOpen: "",
      previewImgURL: "",
    };
  }
  async componentDidMount() {
    this.props.fetchAllSpecialtiesOfClinic(this.props.userInfo.clinicId);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    // if(this.props.clinicSpecialties!== prevProps.clinicSpecialties){
    //     let {clinicSpecialties} = this.props
    //     let {listSpecialty}=this.state
    //     listSpecialty=clinicSpecialties
    //     console.log(listSpecialty)
    //     this.setState({
    //         ...listSpecialty
    //     })
    //     console.log(this.state.listSpecialty)
    // }
    if (prevProps.clinicSpecialties !== this.props.clinicSpecialties) {
      this.setState({
        listSpecialty: this.props.clinicSpecialties,
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
  handleSaveNewSpecialty = async () => {
    console.log(this.state);
    if (this.state.action === CRUD_ACTIONS.CREATE) {
      let res = await addNewSpecialtyOfClinic({
        name: this.state.name,
        nameEn: this.state.nameEn,
        clinicId: this.props.userInfo.clinicId,
        imageBase64: this.state.imageBase64,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
      });
      await this.props.fetchAllSpecialtiesOfClinic(
        this.props.userInfo.clinicId
      );

      if (res && res.errCode === 0) {
        toast.success("Create a new Specialty successfully");
        this.setState({
          name: "",
          nameEn: "",
          imageBase64: "",
          descriptionMarkdown: "",
          descriptionHTML: "",
          previewImgURL: "",
        });
      } else {
        toast.error("Create a new Specialty fail");
      }
    } else {
      let res = await updateClinicSpecialtybyId({
        name: this.state.name,
        nameEn: this.state.nameEn,
        imageBase64: this.state.imageBase64,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
        id: this.state.idSpecialty,
      });
      await this.props.fetchAllSpecialtiesOfClinic(
        this.props.userInfo.clinicId
      );
      if (res && res.errCode === 0) {
        toast.success("Update Specialty successfully");
        this.setState({
          name: "",
          nameEn: "",
          imageBase64: "",
          descriptionMarkdown: "",
          descriptionHTML: "",
          action: CRUD_ACTIONS.CREATE,
          previewImgURL: "",
        });
      } else {
        toast.error("Update Specialty fail");
      }
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };
  handleDeleteSpecialty = async (id) => {
    let res = await deleteClinicSpecialtyById(id);
    await this.props.fetchAllSpecialtiesOfClinic(this.props.userInfo.clinicId);
    if (res && res.errCode === 0) {
      toast.success("Xóa chuyên khoa thành cônggg");
      this.setState({
        name: "",
        nameEn: "",
        imageBase64: "",
        descriptionMarkdown: "",
        descriptionHTML: "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    } else {
      toast.error("Xóa không thành công kiểm tra lại");
    }
  };
  handleEditSpecialtyFromParent = async (specialty) => {
    this.setState({
      imageBase64: specialty.image,
      name: specialty.name,
      nameEn: specialty.nameEn,
      previewImgURL: specialty.image,
      descriptionHTML: specialty.descriptionHTML,
      descriptionMarkdown: specialty.descriptionMarkdown,
      action: CRUD_ACTIONS.EDIT,
      idSpecialty: specialty.id,
    });
  };
  render() {
    let { listSpecialty } = this.state;

    return (
      <div className="manage-specialty-container">
        <div className="add-new-specialty">
          <div className="clinic-basic-infor">
            <div className="specialty-name">
              <label className="name-tilte">Tên Chuyên Khoa</label>

              <div className="nameVi">
                <label className="nameVi-label">Tên chuyên khoa</label>
                <input
                  value={this.state.name}
                  onChange={(event) => this.handleOnChangeInput(event, "name")}
                  className="nameVi-input"
                  type="text"
                />
              </div>
              <div className="nameEn">
                <label className="nameEn-label">Tên tiếng anh</label>
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
            <div className="specialty-image">
              <label className="image-tilte">Ảnh Chuyên Khoa</label>
              <div className="preview-container">
                <input
                  className="preview"
                  id="preview-img"
                  type="file"
                  
                  style={{
                    backgroundImage: `url(${this.state.previewImgURL})`,
                  }}
                  onChange={(event) => this.handleOnChangeImage(event)}
                  //   onClick={() => this.openPreviewImage()}
                />
              </div>
            </div>
          </div>

          <div className="extra-infor-specialty">
            <MdEditor
              value={this.state.descriptionMarkdown}
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
            />
          </div>
          <button
            className={
              this.state.action === CRUD_ACTIONS.EDIT
                ? "btn-edit-specialty btn"
                : "btn-add-specialty btn"
            }
            onClick={() => this.handleSaveNewSpecialty()}
          >
            Save
          </button>
          <div className="clinic-specialties">
            <TableSpecialtiesClinic
              className="table-specialties"
              handleEditClinicSpecialtyFromParentKey={
                this.handleEditSpecialtyFromParent
              }
              action={this.state.action}
              handleDeleteClinicSpecialty={this.handleDeleteSpecialty}
              listSpecialty={listSpecialty}
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
    clinicSpecialties: state.clinicAccountant.clinicSpecialties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialtiesOfClinic: (data) =>
      dispatch(actions.fetchAllSpecialtiesOfClinic(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageClinicSpecialties);
