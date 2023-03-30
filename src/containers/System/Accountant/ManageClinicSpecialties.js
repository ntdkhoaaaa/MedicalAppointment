import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES,CRUD_ACTIONS } from '../../../utils';
import { CommonUtils } from '../../../utils'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import { addNewSpecialtyOfClinic,deleteClinicSpecialtyById,updateClinicSpecialtybyId } from '../../../services/userServices'
import  TableSpecialtiesClinic from './TableSpecialtiesClinic.js'
import * as actions from "../../../store/actions";
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinicSpecialties extends Component {
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
        this.props.fetchAllSpecialtiesOfClinic(this.props.userInfo.clinicId)
        
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
                listSpecialty: this.props.clinicSpecialties
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
        console.log(this.state)
        if (this.state.action === CRUD_ACTIONS.CREATE) {
            let res = await addNewSpecialtyOfClinic({
                name: this.state.name,
                nameEn: this.state.nameEn,
                clinicId: this.props.userInfo.clinicId,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
            await this.props.fetchAllSpecialtiesOfClinic(this.props.userInfo.clinicId);

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
            let res = await updateClinicSpecialtybyId({
                name: this.state.name,
                nameEn: this.state.nameEn,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                id: this.state.idSpecialty,
            })
            await this.props.fetchAllSpecialtiesOfClinic(this.props.userInfo.clinicId);
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
        let res = await deleteClinicSpecialtyById(id);
        await this.props.fetchAllSpecialtiesOfClinic(this.props.userInfo.clinicId);
        if (res && res.errCode === 0) {
            toast.success("Xóa chuyên khoa thành cônggg")
            this.setState({
                name: '',
                nameEn: '',
                imageBase64: '',
                descriptionMarkdown: '',
                descriptionHTML: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
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
        let {listSpecialty}=this.state
        
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
                        <button 
                        className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn-warning btn-add-new-specialty btn ' : 'btn-add-new-specialty btn btn-primary'}
                            onClick={() => this.handleSaveNewSpecialty()}
                            >
                            Save
                        </button>
                    </div>
                    <div className='col-12  mb-5'>
                        <TableSpecialtiesClinic
                            handleEditClinicSpecialtyFromParentKey={this.handleEditSpecialtyFromParent}
                            action={this.state.action}
                            handleDeleteClinicSpecialty={this.handleDeleteSpecialty}
                            listSpecialty={listSpecialty}
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
        userInfo: state.user.userInfo,
        clinicSpecialties:state.clinicAccountant.clinicSpecialties
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialtiesOfClinic: (data) => dispatch(actions.fetchAllSpecialtiesOfClinic(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinicSpecialties);
