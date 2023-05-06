const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',


    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',


    FETCH_ROLES_SUCCESS: 'FETCH_ROLES_SUCCESS',
    FETCH_ROLES_FAILED: 'FETCH_ROLES_FAILED',

    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILED: 'FETCH_POSITION_FAILED',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',

    FETCH_ALL_USERS_SUCCESS: 'FETCH_ALL_USERS_SUCCESS',
    FETCH_ALL_USERS_FAILED: 'FETCH_ALL_USERS_FAILED',


    FETCH_TOP_DOCTORS_SUCCESS: 'FETCH_TOP_DOCTORS_SUCCESS',
    FETCH_TOP_DOCTORS_FAILED: 'FETCH_TOP_DOCTORS_FAILED',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',


    FETCH_ALL_DOCTORS_SUCCESS: 'FETCH_ALL_DOCTORS_SUCCESS',
    FETCH_ALL_DOCTORS_FAILED: 'FETCH_ALL_DOCTORS_FAILED',

    SAVE_DETAILED_DOCTOR_SUCCESS: 'SAVE_DETAILED_DOCTOR_SUCCESS',
    SAVE_DETAILED_DOCTOR_FAILED: 'SAVE_DETAILED_DOCTOR_FAILED',

    FETCH_ALL_MARKDOWN_SUCCESS: 'FETCH_ALL_MARKDOWN_SUCCESS',
    FETCH_ALL_MARKDOWN_FAILED: 'FETCH_ALL_MARKDOWN_FAILED',


    FETCH_A_DOCTOR_SUCCESS: 'FETCH_A_DOCTOR_SUCCESS',
    FETCH_A_DOCTOR_FAILED: 'FETCH_A_DOCTOR_FAILED',

    FETCH_ALL_SCHEDULE_TIME_SUCCESS: 'FETCH_ALL_SCHEDULE_TIME_SUCCESS',
    FETCH_ALL_SCHEDULE_TIME_FAILED: 'FETCH_ALL_SCHEDULE_TIME_FAILED',

    FETCH_ALL_SCHEDULE_WEEK_SUCCESS: 'FETCH_ALL_SCHEDULE_WEEK_SUCCESS',
    FETCH_ALL_SCHEDULE_WEEK_FAILED: 'FETCH_ALL_SCHEDULE_WEEK_FAILED',
    // FETCH_ALL_SCHEDULE_TIME_OF_DOCTOR_BYDAY_SUCCESS: 'FETCH_ALL_SCHEDULE_TIME_OF_DOCTOR_BYDAY_SUCCESS',
    // FETCH_ALL_SCHEDULE_TIME_OF_DOCTOR_BYDAY_FAILED: 'FETCH_ALL_SCHEDULE_TIME_OF_DOCTOR_BYDAY_FAILED',

    FETCH_ALL_REQUIRED_INFOR_SUCCESS: 'FETCH_ALL_REQUIRED_INFOR_SUCCESS',
    FETCH_ALL_REQUIRED_INFOR_FAILED: 'FETCH_ALL_REQUIRED_INFOR_FAILED',

    FETCH_ALL_SPECIALTIES_SUCCESS: 'FETCH_ALL_SPECIALTIES_SUCCESS',
    FETCH_ALL_SPECIALTIES_FAILED: 'FETCH_ALL_SPECIALTIES_FAILED',


    FETCH_ALL_CLINICS_SUCCESS: 'FETCH_ALL_CLINICS_SUCCESS',
    FETCH_ALL_CLINICS_FAILED: 'FETCH_ALL_CLINICS_FAILED',
    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    USER_LOGIN_FALSE: 'USER_LOGIN_FALSE',
    PERMISSION_SUCCESS: 'PERMISSION_SUCCESS',
    PERMISSION_FAIL: 'PERMISSION_FAIL',

    REFRESH_TOKEN: 'REFRESH_TOKEN',



    FETCH_ALL_MEDICINE_BY_CLINICID_SUCCESS:'FETCH_ALL_MEDICINE_BY_CLINICID_SUCCESS',
    FETCH_ALL_MEDICINE_BY_CLINICID_FAIL:'FETCH_ALL_MEDICINE_BY_CLINICID_FAIL',


    FETCH_SPECIALTY_WEEK_SCHEDULE_SUCCESS:'FETCH_SPECIALTY_WEEK_SCHEDULE_SUCCESS',
    FETCH_SPECIALTY_WEEK_SCHEDULE_FAIL:'FETCH_SPECIALTY_WEEK_SCHEDULE_FAIL',
    
    FETCH_EXTRA_SPECIALTY_INFOR_SUCCESS:'FETCH_EXTRA_SPECIALTY_INFOR_SUCCESS',
    FETCH_EXTRA_SPECIALTY_INFOR_FAIL:'FETCH_EXTRA_SPECIALTY_INFOR_FAIL',
    

    FETCH_SPECIALTY_DOCTOR_WEEKLY_SCHEDULE_SUCCESS:'FETCH_SPECIALTY_DOCTOR_WEEKLY_SCHEDULE_SUCCESS',
    FETCH_SPECIALTY_DOCTOR_WEEKLY_SCHEDULE_FAIL:'FETCH_SPECIALTY_DOCTOR_WEEKLY_SCHEDULE_FAIL',


    FETCH_MEDICAL_RECORD_SUCCESS:'FETCH_MEDICAL_RECORD_SUCCESS',
    FETCH_MEDICAL_RECORD_FAIL:'FETCH_MEDICAL_RECORD_FAIL',

    FETCH_REGISTERED_PATIENT_SUCCESS:'FETCH_REGISTERED_PATIENT_SUCCESS',
    FETCH_REGISTERED_PATIENT_FAIL:'FETCH_REGISTERED_PATIENT_FAIL',

    FETCH_EXAMINATED_PATIENT_SUCCESS:'FETCH_EXAMINATED_PATIENT_SUCCESS',
    FETCH_EXAMINATED_PATIENT_FAIL:'FETCH_EXAMINATED_PATIENT_FAIL',

    FETCH_PATIENTS_MEDICAL_RECORD_BYDATE_SUCCESS:'FETCH_PATIENTS_MEDICAL_RECORD_BYDATE_SUCCESS',
    FETCH_PATIENTS_MEDICAL_RECORD_BYDATE_FAIL:'FETCH_PATIENTS_MEDICAL_RECORD_BYDATE_FAIL',
    // Clinic Accountant
    FETCH_CLINIC_DETAIL_SUCCESS: 'FETCH_CLINIC_DETAIL_SUCCESS',
    FETCH_CLINIC_DETAIL_FAIL: 'FETCH_CLINIC_DETAIL_FAIL',
    FETCH_ALL_SPECIALTIES_OF_CLINIC_SUCCESS: 'FETCH_ALL_SPECIALTIES_OF_CLINIC_SUCCESS',
    FETCH_ALL_SPECIALTIES_OF_CLINIC_FAIL: 'FETCH_ALL_SPECIALTIES_OF_CLINIC_FAIL',
    FETCH_ALL_DOCTORS_OF_CLINIC_SUCCESS: 'FETCH_ALL_DOCTORS_OF_CLINIC_SUCCESS',
    FETCH_ALL_DOCTORS_OF_CLINIC_FAIL: 'FETCH_ALL_DOCTORS_OF_CLINIC_FAIL',
    SAVE_BULK_SCHEDULES_FOR_CLINIC_SUCCESS: 'SAVE_BULK_SCHEDULES_FOR_CLINIC_SUCCESS',
    SAVE_BULK_SCHEDULES_FOR_CLINIC_FAIL:'SAVE_BULK_SCHEDULES_FOR_CLINIC_FAIL',
    FETCH_CLINIC_WEEK_SCHEDULES_SUCCESS:'FETCH_CLINIC_WEEK_SCHEDULES_SUCCESS',
    FETCH_CLINIC_WEEK_SCHEDULES_FAILED:'FETCH_CLINIC_WEEK_SCHEDULES_FAILED',
    SAVE_NEW_DOCTOR_SUCCESS:'SAVE_NEW_DOCTOR_SUCCESS',
    SAVE_NEW_DOCTOR_FAIL:'SAVE_NEW_DOCTOR_FAIL',
    FETCH_ALL_DOCTORS_HOSPITAL_SUCCESS:'FETCH_ALL_DOCTORS_HOSPITAL_SUCCESS',
    FETCH_ALL_DOCTORS_HOSPITAL_FAIL:'FETCH_ALL_DOCTORS_HOSPITAL_FAIL',
    EDIT_INFOR_DOCTOR_SUCCESS:'EDIT_INFOR_DOCTOR_SUCCESS',
    EDIT_INFOR_DOCTOR_FAIL:'EDIT_INFOR_DOCTOR_FAIL',
    DELETE_DOCTOR_SUCCESS:'DELETE_DOCTOR_SUCCESS',
    DELETE_DOCTOR_FAIL:'DELETE_DOCTOR_FAIL',

})

export default actionTypes;