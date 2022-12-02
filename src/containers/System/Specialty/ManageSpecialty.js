import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils'
import { addNewSpecialty } from '../../../services/userServices'
import { toast } from 'react-toastify';
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
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

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
            // let objectUrl = URL.createObjectURL(file);
            this.setState({
                // previewImgURL: objectUrl,
                imageBase64: base64
            })
        }
    }
    handleSaveNewSpecialty = async () => {
        console.log('saveNewSpecialty', this.state)
        let res = await addNewSpecialty({
            name: this.state.name,
            nameEn: this.state.nameEn,
            imageBase64: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
        })
        if (res && res.errCode === 0) {
            toast.success('Create a new Specialty successfully')
            this.setState({
                name: '',
                nameEn: '',
                imageBase64: '',
                descriptionMarkdown: '',
            })
        }
        else {
            toast.error('Create a new Specialty fail')

        }
        console.log('saveNewSpecialty', res)
    }
    // openPreviewImage = () => {
    //     if (!this.state.previewImgURL) return;
    //     this.setState({
    //         isOpen: true
    //     })
    // }
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
                    <div className='col-4 form-group'>
                        <label>Ảnh chuyên khoa</label>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.handleOnChangeImage(event)} />
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
