import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';

import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userServices'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: {},
            description: '',
            descriptionHTML: '',
            listDoctocs: '',
            hasOldData: false,


            //save to detail doctor's infor
            listPrices: [],
            listPayments: [],
            listProvinces: [],
            listSpecialties: [],
            listClinics: [],

            selectedClinic: '',
            selectedSpecialty: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',

            // nameClinic: '',
            addressClinic: '',
            note: '',
            maximum: ''

        }
    }
    async componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.loadAllSpecialties();
        this.props.getAllRequiredInfor();
        this.props.loadAllClinics();
        // this.props.fetchAllMarkdown(this.state.selectedDoctor.value);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USER')
            this.setState({
                listDoctocs: dataSelect
            })
        }
        if (prevProps.allSpecialties !== this.props.allSpecialties) {
            let dataSelectSpecialties = this.buildDataInputSelect(this.props.allSpecialties, 'SPECIALTIES')
            this.setState({
                listSpecialties: dataSelectSpecialties,
            })
        }
        if (prevProps.allClinics !== this.props.allClinics) {
            let dataSelectClinics = this.buildDataInputSelect(this.props.allClinics, 'CLINICS')
            this.setState({
                listClinics: dataSelectClinics,
            })
        }
        if (prevProps.allRequiredInfor !== this.props.allRequiredInfor) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listPrices: dataSelectPrice,
                listPayments: dataSelectPayment,
                listProvinces: dataSelectProvince,
            })
        }
        if (prevProps.allMarkdown !== this.props.allMarkdown) {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                selectedDoctor: '',
                description: '',

                selectedClinic: '',
                selectedSpecialty: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',

                nameClinic: '',
                addressClinic: '',
                note: '',
            })
        }
        if (prevProps.language !== this.props.language) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredInfor;

            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USER')
            this.setState({
                listDoctocs: dataSelect
            })
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listPrices: dataSelectPrice,
                listPayments: dataSelectPayment,
                listProvinces: dataSelectProvince,
            })

            let dataSelectSpecialties = this.buildDataInputSelect(this.props.allSpecialties, 'SPECIALTIES')
            this.setState({
                listSpecialties: dataSelectSpecialties,
            })

            let dataSelectClinics = this.buildDataInputSelect(this.props.allClinics, 'CLINICS')
            this.setState({
                listClinics: dataSelectClinics,
            })
        }
    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USER') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'SPECIALTIES' || type === 'CLINICS') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = language === LANGUAGES.VI ? item.name : item.nameEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} `;
                    let labelEn = `${item.valueEn} `;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }

        }
        return result;
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
    }
    handleSaveContentMarkDown = async () => {
        if (!this.state.selectedPrice || !this.state.selectedPayment || !this.state.selectedProvince) {

        }
        let { hasOldData, description } = this.state
        // let htmlDescription = this.handleOnChangeTextforTextArea(description);
        console.log('before send to nodejs', this.state)
        await this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.descriptionHTML,
            descriptionNONHTML: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedClinic: this.state.selectedClinic.value,
            selectedSpecialty: this.state.selectedSpecialty.value,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,

            nameSpecialty: this.state.selectedSpecialty.label,
            nameClinic: this.state.selectedClinic.label,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            count: this.state.maximum
        })
        // console.log('check save ?', res)
        this.props.fetchAllMarkdown();
    }
    handleChange = async (selectedDoctor) => {
        let { listPayments, listPrices, listProvinces, listClinics, listSpecialties } = this.state
        this.setState({ selectedDoctor: selectedDoctor });
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            console.log('check res', res)
            if (res.data.Doctor_Infor) {
                let doctorInfor = res.data.Doctor_Infor;
                console.log(doctorInfor.priceData.valueVi);
                let paymentId = doctorInfor.paymentId;
                let priceId = doctorInfor.priceId;
                let provinceId = doctorInfor.provinceId;
                let specialtyId = doctorInfor.specialtyId;
                let clinicId = doctorInfor.clinicId;

                let Payment = '', Price = '', Province = '', Clinic = '', Specialty = ''

                Payment = listPayments.find(item => {
                    return item && item.value === paymentId
                })

                Price = listPrices.find(item => {
                    return item && item.value === priceId
                })

                Province = listProvinces.find(item => {
                    return item && item.value === provinceId
                })

                Clinic = listClinics.find(item => {
                    return item && item.value === clinicId
                })
                Specialty = listSpecialties.find(item => {
                    return item && item.value === specialtyId
                })
                this.setState({
                    contentHTML: res.data.Markdown.contentHTML,
                    contentMarkdown: res.data.Markdown.contentMarkdown,
                    description: res.data.Markdown.descriptionNONHTML,
                    descriptionHTML: res.data.Markdown.description,
                    hasOldData: true,
                    addressClinic: doctorInfor.addressClinic,
                    nameClinic: doctorInfor.nameClinic,
                    note: doctorInfor.note,
                    maximum: doctorInfor.count,
                    selectedPayment: Payment,
                    selectedPrice: Price,
                    selectedProvince: Province,
                    selectedClinic: Clinic,
                    selectedSpecialty: Specialty,
                })
            }
        }
        else {
            this.setState({
                addressClinic: '',
                nameClinic: '',
                selectedClinic: '',
                selectedSpecialty: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                note: '',
                maximun: '',
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    };
    handleChangeSelectInfor = (selectedInfor, name) => {
        let stateName = name.name;
        let stateCopy = { ... this.state };

        let { language, allClinics } = this.props


        stateCopy[stateName] = selectedInfor;
        this.setState({
            ...stateCopy,
        })
        if (stateName === 'selectedClinic') {
            allClinics.forEach(element => {
                console.log(element, 'selected', selectedInfor)
                let comparation = language === LANGUAGES.VI ? element.name.localeCompare(selectedInfor.label) :
                    element.nameEn.localeCompare(selectedInfor.label)
                console.log(comparation)
                if (comparation === 0) {
                    this.setState({
                        addressClinic: language === LANGUAGES.VI ? element.address : element.addressEn
                    })
                }
            });
        }

    }
    handleOnChangeText = (event, id) => {
        let stateCopy = { ... this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        })
    }
    handleOnChangeTextforTextArea = (event, id) => {
        let text_input = event.target.value;
        let output_html = '';
        let counter
        if (text_input.length > 0) {
            output_html += "<p>";
            for (counter = 0; counter < text_input.length; counter++) {
                switch (text_input[counter]) {
                    case '\n':
                        if (text_input[counter + 1] === '\n') {
                            output_html += "</p>\n<p>";
                            counter++;
                        }
                        else output_html += "<br>";
                        break;
                    case ' ':
                        if (text_input[counter - 1] != ' ' && text_input[counter - 1] != '\t')
                            output_html += " ";
                        break;

                    case '\t':
                        if (text_input[counter - 1] != '\t')
                            output_html += " ";
                        break;

                    case '&':
                        output_html += "&amp;";
                        break;

                    case '"':
                        output_html += "&quot;";
                        break;

                    case '>':
                        output_html += "&gt;";
                        break;

                    case '<':
                        output_html += "&lt;";
                        break;

                    default:
                        output_html += text_input[counter];

                }
            }
            output_html += "</p>"; //finally close paragraph
        }
        let stateCopy = { ... this.state };
        stateCopy[id] = event.target.value;
        stateCopy['descriptionHTML'] = output_html;
        console.log(stateCopy);
        this.setState({
            ...stateCopy,
        })
    }
    render() {
        let { hasOldData } = this.state
        console.log('check state', this.state);
        return (
            <div className='manage-doctor-container'>

                <div className='manage-doctor-title'>
                    <FormattedMessage id='admin.manage-doctor.title' />
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.choose' /></label>
                        <Select
                            placeholder={'Chọn bác sĩ'}
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            // name='selectedDoctor'
                            options={this.state.listDoctocs} />
                    </div>
                    <div className='content-right'>
                        <label>
                            <FormattedMessage id='admin.manage-doctor.profile-title' />
                        </label>
                        <textarea
                            onChange={(event) => this.handleOnChangeTextforTextArea(event, 'description')}
                            value={this.state.description}
                            className='form-control showtext'
                            rows="4">
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id='admin.manage-doctor.choose-price' />
                        </label>

                        <Select
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-price' />}
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectInfor}
                            name='selectedPrice'
                            options={this.state.listPrices} />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.choose-payment' /></label>
                        <Select
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-payment' />}
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectInfor}
                            name='selectedPayment'
                            options={this.state.listPayments} />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.choose-province' /></label>
                        <Select
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-province' />}
                            value={this.state.selectedProvince}
                            name='selectedProvince'
                            onChange={this.handleChangeSelectInfor}
                            options={this.state.listProvinces} />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chuyên khoa</label>
                        <Select
                            placeholder='Chọn chuyên khoa'
                            value={this.state.selectedSpecialty}
                            name='selectedSpecialty'
                            onChange={this.handleChangeSelectInfor}
                            options={this.state.listSpecialties} />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Phòng khám</label>
                        <Select
                            placeholder='Chọn phòng khám'
                            value={this.state.selectedClinic}
                            name='selectedClinic'
                            onChange={this.handleChangeSelectInfor}
                            options={this.state.listClinics} />
                    </div>
                    <div className='col-4 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.clinic-address' /></label>
                        <input
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                            className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.clinic-Note' /></label>
                        <input
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}

                            className='form-control' />
                    </div>
                    <div className='col-2 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.maximun-patient-in-same-time' /></label>
                        <input
                            onChange={(event) => this.handleOnChangeText(event, 'maximum')}
                            value={this.state.maximum}
                            type="number"
                            className='form-control' />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor
                        value={this.state.contentMarkdown}
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
                </div>
                <button
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={() => this.handleSaveContentMarkDown()}
                >{hasOldData === true ? <span>
                    <FormattedMessage id='admin.manage-doctor.save' />

                </span> : <span>
                    <FormattedMessage id='admin.manage-doctor.create' />
                </span>}</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allMarkdown: state.admin.allMarkdown,
        doctorSelected: state.admin.doctor,
        allRequiredInfor: state.admin.allRequiredInfor,
        allSpecialties: state.admin.allSpecialties,
        allClinics: state.admin.allClinics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllRequiredInfor: () => dispatch(actions.getAllRequiredInfor()),
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchAllMarkdown: () => dispatch(actions.fetchAllMarkdown()),
        fetchDoctor: (idInput) => dispatch(actions.fetchDoctor(idInput)),
        loadAllSpecialties: () => dispatch(actions.fetchAllSpecialties()),
        loadAllClinics: () => dispatch(actions.fetchAllClinics())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
