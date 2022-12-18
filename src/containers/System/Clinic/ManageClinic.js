import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils'
import TableManageClinic from './TableManageClinic';
import { addNewClinic, deleteClinicById, updateClinicbyId } from '../../../services/userServices'
import { toast } from 'react-toastify';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import * as actions from "../../../store/actions";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameEn: '',
            imageBase64: '',
            previewImgURL: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: '',
            addressEn: '',
            isOpen: false,
            listClinic: [],
            idClinic: '',
            action: CRUD_ACTIONS.CREATE,
        }
    }
    async componentDidMount() {
        this.props.loadAllClinics();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.allClinics !== this.props.allClinics) {
            this.setState({
                listClinic: this.props.allClinics
            })
        }
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                imageBase64: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleDeleteClinic = async (id) => {
        let res = await deleteClinicById(id);
        await this.props.loadAllClinics();
        if (res && res.errCode === 0) {
            toast.success("Xóa clinic thành cônggg")
        } else {
            toast.error("Xóa không thành công kiểm tra lại");
        }

    }
    handleSaveNewSpecialty = async () => {
        if (this.state.action === CRUD_ACTIONS.CREATE) {
            let res = await addNewClinic({
                name: this.state.name,
                nameEn: this.state.nameEn,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                address: this.state.address,
                addressEn: this.state.addressEn
            })
            await this.props.loadAllClinics();
            if (res && res.errCode === 0) {
                toast.success('Create a new clinic successfully')
                this.setState({
                    name: '',
                    nameEn: '',
                    imageBase64: '',
                    previewImgURL: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    address: '',
                    addressEn: '',
                })
            }
            else {
                toast.error('Create a new clinic fail')
            }
        }
        else {
            let res = await updateClinicbyId({
                name: this.state.name,
                nameEn: this.state.nameEn,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                address: this.state.address,
                addressEn: this.state.addressEn,
                id: this.state.idClinic
            })
            await this.props.loadAllClinics();
            if (res && res.errCode === 0) {
                toast.success('Create a new clinic successfully')
                this.setState({
                    name: '',
                    nameEn: '',
                    imageBase64: '',
                    previewImgURL: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    address: '',
                    addressEn: '',
                    action: CRUD_ACTIONS.CREATE,
                })
            }
            else {
                toast.error('Create a new clinic fail')
            }
        }

    }
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
            action: CRUD_ACTIONS.EDIT,
            idClinic: clinic.id
        })
    }

    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý phòng khám</div>
                <div className='add-new-specialty row'>
                    <div className='col-4 form-group'>
                        <label>Tên phòng khám</label>
                        <input
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                            className='form-control' type='text' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tên tiếng anh</label>
                        <input
                            value={this.state.nameEn}
                            onChange={(event) => this.handleOnChangeInput(event, 'nameEn')}
                            className='form-control' type='text' />
                    </div>
                    <div className='col-2 form-group'>
                        <label>Ảnh phòng khám</label>
                        <div className='preview-img-container'>
                            <input id='preview-img' type='file' hidden
                                onChange={(event) => this.handleOnChangeImage(event)} />
                            <label className='label-image' htmlFor='preview-img'>Tải ảnh<i className='fas fa-upload'></i></label>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                onClick={() => this.openPreviewImage()}>
                            </div>
                        </div>
                        {/* <label>Ảnh phòng khám</label>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.handleOnChangeImage(event)} /> */}
                    </div>

                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input
                            value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                            className='form-control' type='text' />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ tiếng anh</label>
                        <input
                            value={this.state.addressEn}
                            onChange={(event) => this.handleOnChangeInput(event, 'addressEn')}
                            className='form-control' type='text' />
                    </div>
                    <div className='col-12 add-new-specalty'>
                        <MdEditor
                            value={this.state.descriptionMarkdown}
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange} />
                    </div>
                    <div className='col-12'>
                        <button className='btn-add-new-specialty'
                            onClick={() => this.handleSaveNewSpecialty()}>
                            Save
                        </button>
                    </div>
                    <div className='col-12  mb-5'>
                        <TableManageClinic
                            handleEditClinicFromParentKey={this.handleEditClinicFromParent}
                            action={this.state.action}
                            handleDeleteClinic={this.handleDeleteClinic}
                            listClinic={this.state.listClinic}
                        />
                    </div>
                </div>
                {
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allClinics: state.admin.allClinics,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllClinics: () => dispatch(actions.fetchAllClinics())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
