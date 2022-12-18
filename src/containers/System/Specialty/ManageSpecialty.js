import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils'
import { addNewSpecialty, deleteSpecialtyById, updateSpecialtybyId } from '../../../services/userServices'
import { toast } from 'react-toastify';
import TableManageSpecialty from './TableManageSpecialty';
import * as actions from "../../../store/actions";
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameEn: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            listSpecialty: [],
            idSpecialty: '',
            action: CRUD_ACTIONS.CREATE,
            isOpen: '',
            previewImgURL: ''
        }
    }
    async componentDidMount() {
        this.props.loadAllSpeciatlties()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.allSpecialties !== this.props.allSpecialties) {
            this.setState({
                listSpecialty: this.props.allSpecialties
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
    handleSaveNewSpecialty = async () => {
        if (this.state.action === CRUD_ACTIONS.CREATE) {
            let res = await addNewSpecialty({
                name: this.state.name,
                nameEn: this.state.nameEn,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
            await this.props.loadAllSpeciatlties();

            if (res && res.errCode === 0) {
                toast.success('Create a new Specialty successfully')
                this.setState({
                    name: '',
                    nameEn: '',
                    imageBase64: '',
                    descriptionMarkdown: '',
                    descriptionHTML: '',
                    previewImgURL: ''
                })
            }
            else {
                toast.error('Create a new Specialty fail')

            }
        } else {
            let res = await updateSpecialtybyId({
                name: this.state.name,
                nameEn: this.state.nameEn,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                id: this.state.idSpecialty,
            })
            await this.props.loadAllSpeciatlties();

            if (res && res.errCode === 0) {
                toast.success('Update Specialty successfully')
                this.setState({
                    name: '',
                    nameEn: '',
                    imageBase64: '',
                    descriptionMarkdown: '',
                    descriptionHTML: '',
                    action: CRUD_ACTIONS.CREATE,
                    previewImgURL: ''
                })
            }
            else {
                toast.error('Update Specialty fail')

            }
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleDeleteSpecialty = async (id) => {
        let res = await deleteSpecialtyById(id);
        await this.props.loadAllSpeciatlties();
        if (res && res.errCode === 0) {
            toast.success("Xóa chuyên khoa thành cônggg")
        } else {
            toast.error("Xóa không thành công kiểm tra lại");
        }

    }
    handleEditSpecialtyFromParent = async (specialty) => {
        this.setState({
            imageBase64: specialty.image,
            name: specialty.name,
            nameEn: specialty.nameEn,
            previewImgURL: specialty.image,
            descriptionHTML: specialty.descriptionHTML,
            descriptionMarkdown: specialty.descriptionMarkdown,
            action: CRUD_ACTIONS.EDIT,
            idSpecialty: specialty.id
        })
    }
    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý chuyên khoa</div>
                <div className='add-new-specialty row'>
                    <div className='col-4 form-group'>
                        <label>Tên chuyên khoa</label>
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
                        <label>Ảnh Chuyên Khoa</label>
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
                        <TableManageSpecialty
                            handleEditSpecialtyFromParentKey={this.handleEditSpecialtyFromParent}
                            action={this.state.action}
                            handleDeleteSpecialty={this.handleDeleteSpecialty}
                            listSpecialty={this.state.listSpecialty}
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
        allSpecialties: state.admin.allSpecialties,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllSpeciatlties: () => dispatch(actions.fetchAllSpecialties())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
