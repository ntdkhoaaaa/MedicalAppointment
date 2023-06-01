import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    position: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allMarkdown: [],
    doctor: [],
    allScheduleTime: [],
    allRequiredInfor: [],
    allSpecialties: [],
    allClinics:[],

    // createSuccessMarkdown: false,
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state }
            copyState.isLoadingGender = true
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLES_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLES_FAILED:
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:

            state.position = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.position = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_MARKDOWN_SUCCESS:
            state.allMarkdown = action.allMarkdown;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_MARKDOWN_FAILED:
            state.allMarkdown = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_A_DOCTOR_SUCCESS:
            state.doctor = action.doctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_A_DOCTOR_FAILED:
            state.doctor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_REQUIRED_INFOR_SUCCESS:
            state.allRequiredInfor = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_REQUIRED_INFOR_FAILED:
            state.allRequiredInfor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SPECIALTIES_FAILED:
            state.allSpecialties = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SPECIALTIES_SUCCESS:
            state.allSpecialties = action.allSpecialties;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CLINICS_FAILED:
            state.allClinics = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CLINICS_SUCCESS:
            state.allClinics = action.allClinics;
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;