import axios from '../axios';
import { setAuthHeader } from './filterService'

const handleGetPermission = () => {
    return axios.get(`/api/check-permission`)
}
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`)
}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
    // return axios.delete('/api/delete-user', { id: userId })
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}
const editUserInforByOwnService = (inputData) => {
    return axios.put('/api/edit-on-own-user-infor', inputData);
}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/get-top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}
const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}
const getAllMarkdown = () => {
    return axios.get(`/api/get-all-markdown`)
}
const getDetailInforDoctor = (idInput) => {
    return axios.get(`/api/get-detailed-doctor-byId?id=${idInput}`)
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}
const getSelectedSchedule = (doctorId, date) => {
    return axios.get(`/api/get-selected-schedule-byId?doctorId=${doctorId}&date=${date}`)
}
const getSelectedScheduleFromDoctor = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date-from-doctor?doctorId=${doctorId}&date=${date}`)
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-byDate?doctorId=${doctorId}&date=${date}`)
}
const deleteSelectedSchedule = (data) => {
    return axios.delete('/api/delete-selected-schedule', {
        data: {
            id: data
        }
    })
}
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-byId?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-byId?doctorId=${doctorId}`)
}


const postPatientAppointment = (data) => {
    return axios.post(`/api/patient-booking-appointment`, data)
}
const postVerifyBooking = (data) => {
    return axios.post(`/api/verify-booking`, data)
}

const addNewSpecialty = (data) => {
    return axios.post(`/api/add-new-specialty`, data)
}
const getAllSpecialties = () => {
    return axios.get(`/api/get-all-specialties`)
}
const deleteSpecialtyById = (id) => {
    return axios.get(`/api/delete-specialty-by-id?id=${id}`)
}
const updateSpecialtybyId = (data) => {
    return axios.post(`/api/update-specialty-by-id`, data)
}
// clinic
const addNewClinic = (data) => {
    return axios.post(`/api/add-new-clinic`, data)
}
const updateClinicbyId = (data) => {
    return axios.post(`/api/update-clinic-by-id`, data)
}
const getAllClinics = () => {
    return axios.get(`/api/get-all-clinics`)
}
const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-byId?id=${data.id}&location=${data.location}`)
}
const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-byId?id=${data.id}`)
}
const deleteClinicById = (id) => {
    return axios.get(`/api/delete-clinic-by-id?id=${id}`)
}
const handleRegisterApi = async (data) => {
    return await axios.post('/api/register', data)
}
const getListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const getAllAppointmentOfPatient = (data) => {
    return axios.get(`/api/get-all-appointment-of-user?id=${data}`)
}
const cancelBookingFromPatient = (data) => {
    return axios.post(`/api/cancel-booking`, data)
}
const postVerifyRegister = (data) => {
    return axios.post(`/api/verify-register`, data)
}
const postMedicalRecords = (data) => {
    return axios.post(`/api/post-history-patient`, data)
}
const postRating = (data) => {
    return axios.post(`/api/post-rating-patient`, data)
}
const getMedicalRecordByBookingId = (data) => {
    return axios.get(`/api/get-history-patient?bookingId=${data}`)
}
const getListExaminatedPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-examinated-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const handleForgotPassWord = async (data) => {
    return await axios.post('/api/forgot-password', data)
}
const checkTokenResetPassword = async (data) => {
    return await axios.post('/api/get-info-reset-password-by-token', data)
}
const handleResetPassWord = async (data) => {
    return await axios.post('/api/reset-password', data)
}
const getListPatientCommentByDoctorId = (data) => {
    return axios.get(`/api/get-rating-patient?doctorId=${data}`)
}
export {
    handleLoginApi, postMedicalRecords, postRating, getListExaminatedPatientForDoctor,
    getAllUsers, getMedicalRecordByBookingId, getListPatientCommentByDoctorId,
    createNewUserService, getSelectedScheduleFromDoctor,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors, cancelBookingFromPatient,
    saveDetailDoctorService, getAllMarkdown,
    getDetailInforDoctor, saveBulkScheduleDoctor,
    getSelectedSchedule, getScheduleDoctorByDate,
    deleteSelectedSchedule, getExtraInforDoctorById,
    getProfileDoctorById, postPatientAppointment,
    postVerifyBooking, addNewSpecialty, getAllAppointmentOfPatient,
    getAllSpecialties, addNewClinic, getAllClinics,
    getDetailSpecialtyById, handleRegisterApi, handleGetPermission,
    getDetailClinicById, getListPatientForDoctor, editUserInforByOwnService, postVerifyRegister,
    handleForgotPassWord, checkTokenResetPassword, handleResetPassWord,
    deleteClinicById, updateClinicbyId, deleteSpecialtyById, updateSpecialtybyId
}
