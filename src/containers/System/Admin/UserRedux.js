import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from "../../../services/userServices"
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import * as actions from "../../../store/actions"
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';    
import TableManageUser from './TableManageUser';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleIdArr: [],
            DegreeArr: [],
            clinicArr:[],
            previewImgURL: '',
            isOpen: false,
            
            idUser: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            clinicId:'',
            role: '',
            avatar: '',
            action: '',
        }
    }
    async componentDidMount() {
        this.props.getGendersStart();
        this.props.getRolesStart();
        this.props.getPositionStart();
        this.props.loadAllClinics();

    }

    componentDidUpdate(prevProps, preState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].name : ''
            })
        }
        if (prevProps.allClinics !== this.props.allClinics) {
            let clinicArr = this.props.allClinics;
            
            this.setState({
                clinicArr: clinicArr,
                clinicId: clinicArr && clinicArr.length > 0 ? clinicArr[0].id : ''
            })
        }
        if (prevProps.rolesRedux !== this.props.rolesRedux) {
            let arrRoles = this.props.rolesRedux;
            this.setState({
                roleIdArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                DegreeArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''

            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrRoles = this.props.rolesRedux;
            let arrPositions = this.props.positionRedux;
            let arrGenders = this.props.genderRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                previewImgURL: '',
                action: CRUD_ACTIONS.CREATE
            })
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
                avatar: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        
        this.setState({
            ...copyState
        });
    }
    ValiadateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing required parameter: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.ValiadateInput();
        if (isValid === false) return;
        console.log('this.state', this.state);

        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            if(this.state.role==='R1')
            {
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    roleId: this.state.role,
                })
            }
            if(this.state.role==='R2' || this.state.role==='R5')
            {
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    roleId: this.state.role,
                    gender: this.state.gender,
                    clinicId: this.state.clinicId,
                    positionId: this.state.position,
                    avatar: this.state.avatar
                })
            }
            if(this.state.role==='R3')
            {
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    roleId: this.state.role,
                    gender: this.state.gender,
                    avatar: this.state.avatar
                })
            }
            if(this.state.role==='R4' || this.state.role==='R6')
            {
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    roleId: this.state.role,
                    gender: this.state.gender,
                    clinicId: this.state.clinicId,
                })
            }
        }
        if (action === CRUD_ACTIONS.EDIT) {
            if(this.state.role==='R1')
            {
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    roleId: this.state.role,
                })
            }
            if(this.state.role==='R2')
            {
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    roleId: this.state.role,
                    gender: this.state.gender,
                    clinicId: this.state.clinicId,
                    positionId: this.state.position,
                    avatar: this.state.avatar
                })
            }
            if(this.state.role==='R3')
            {
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    roleId: this.state.role,
                    gender: this.state.gender,
                    avatar: this.state.avatar
                })
            }
            if(this.state.role==='R4')
            {
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    roleId: this.state.role,
                    gender: this.state.gender,
                    clinicId: this.state.clinicId,
                })
            }
            this.props.editUserRedux({
                id: this.state.idUser,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
                clinicId: this.state.clinicId

            })
        }

    }
    handleEditUserFromParent = (user) => {
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: user.image,
            previewImgURL: user.image,
            action: CRUD_ACTIONS.EDIT,
            idUser: user.id,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleIdArr;
        let clinics=this.state.clinicArr;
        
        let positions = this.state.DegreeArr;
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar,clinicId } = this.state
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User 
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            {/* <div className='col-12 mt-3'>{isGetGenders === true ? 'Loading genders' : ''}</div> */}
                            <div className='col-12 mt-5 sub-title' ><FormattedMessage id={"manage-user.add"} /></div>
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.roleID"} /></label>
                                <select className='form-control'
                                    value={role}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ?true:false}
                                    
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}>
                                    {/* <option>Choose...</option> */}
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.email"} /></label>
                                <input type="email" className='form-control'
                                    value={email}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.password"} /></label>
                                <input type="password" className='form-control'
                                    value={password}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.firstname"} /></label>
                                <input type="text" className='form-control'
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.lastname"} /></label>
                                <input type="text" className='form-control'
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.phonenumber"} /></label>
                                <input type="number" className='form-control'
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id={"manage-user.address"} /></label>
                                <input type="text" className='form-control'
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.gender"} /></label>
                                <select className='form-control'
                                    value={gender}
                                    disabled={this.state.role === 'R1' ? true : false}
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }} >
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.clinic"} /></label>
                                <select className='form-control'
                                    value={clinicId}
                                    disabled={this.state.role !== 'R2' && this.state.role !=='R4' &&this.state.role !=='R5' &&
                                    this.state.role !=='R6'  ? true : false}
                                    onChange={(event) => { this.onChangeInput(event, 'clinicId') }} >
                                    {clinics && clinics.length > 0 && clinics.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>{language === LANGUAGES.VI ? item.name : item.nameEn}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.position"} /></label>
                                <select className='form-control'
                                    value={position}
                                    disabled={this.state.role !== 'R2' ? true : false}
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}>
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.image"} /></label>
                                <div className='preview-img-container'>
                                    <input id='preview-img' type='file' hidden
                                        onChange={(event) => this.handleOnChangeImage(event)} />
                                    <label className='label-image' htmlFor='preview-img'>Tải ảnh<i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}>
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='manage-user.edit' /> :
                                        <FormattedMessage id='manage-user.save' />}
                                </button>
                            </div>
                            <div className='col-12  mb-5'>
                                <TableManageUser
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action} />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        rolesRedux: state.admin.roles,
        positionRedux: state.admin.position,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
        allClinics: state.admin.allClinics,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGendersStart: () => dispatch(actions.fetchGenderStart()),
        getRolesStart: () => dispatch(actions.fetchRolesStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.EditUser(data)),
        loadAllClinics: () => dispatch(actions.fetchAllClinics())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
