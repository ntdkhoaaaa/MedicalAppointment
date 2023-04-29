export const path = {
    HOME: '/',
    HOMEPAGE: '/home',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    DETAIL_DOCTOR: '/detail-doctor/:id',
    DETAIL_SPECIALTY: '/detail-specialty/:id',
    DETAIL_CLINIC: '/detail-clinic/:id',
    VERIFY_EMAIL_BOOKING: '/verify-booking',
    REGISTER: '/register',
    USER_PROFILE: '/patient',
    VERIFY_REGISTER: '/verify-register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    DETAIL_CLINIC_SPECIALTY: '/hospital-specialties/:id',
    HOSPITAL_SPECIALTY_SCHEDULE:'/hospital-specialty/:id/:specialtyId'
};

export const LANGUAGES = {
    VI: 'vi',
    EN: 'en'
};

export const CRUD_ACTIONS = {
    CREATE: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE",
    READ: "READ"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}
export const USER_ROLE = {
    ADMIN: 'R1',
    DOCTOR: 'R2',
    PATIENT: 'R3',
    ACCOUNTANT: 'R4',
    HOSPITAL_DOCTOR: 'R5',
    HOSPITAL_ACCOUNTANT: 'R6',
}