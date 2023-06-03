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

const createNewDoctorService = (data) => {
    return axios.post('/api/create-new-doctor', data)
}
const createNewClinicDoctorService = (data) => {
    return axios.post('/api/create-new-clinic-doctor', data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}
const deleteDoctorService = (userId) => {
    return axios.post('/api/delete-doctor', userId)
    // return axios.delete('/api/delete-user', { id: userId })
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const deleteDoctorClinicService = (userId) => {
    return axios.post('/api/delete-doctor-clinic', userId)
    // return axios.delete('/api/delete-user', { id: userId })
}
const editDoctorClinicService = (inputData) => {
    return axios.post('/api/edit-doctor-clinic', inputData);
}


const editDoctorHospitalService = (inputData) => {
    return axios.post('/api/edit-doctor-hospital', inputData);
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
const saveBulkScheduleForClinic = (data) => {
    return axios.post(`/api/create-bulk-schedules-for-doctors`, data)
}
const getHospitalAppointmentByDate = (data) => {
    return axios.post(`/api/get-booking-appointment-from-hospital`, data)
}
const getStatisticalForHospitalSpecialty = (data) => {
    return axios.post(`/api/get-statistical-for-specialty`, data)
}
const getStatisticalForDoctorHospitalSpecialty = (data) => {
    return axios.post(`/api/get-statistical-for-doctor-clinic-specialty`, data)
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
const getScheduleDoctorByDateContainUserId = (doctorId, date,userId) => {
    return axios.get(`/api/get-schedule-byDate-contain-userId?doctorId=${doctorId}&date=${date}&userId=${userId}`)
}
const getSpecialtyScheduleByWeek = (clinicId,specialtyId) => {
    return axios.get(`/api/get-hospital-specialty-schedule-byDate?clinicId=${clinicId}&specialtyId=${specialtyId}`)
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
const getProfileDoctorById = (doctorId,checkModal) => {
    return axios.get(`/api/get-profile-doctor-byId?doctorId=${doctorId}&checkModal=${checkModal}`)
}


const postPatientAppointment = (data) => {
    console.log('postPatientAppointment',data)
    return axios.post(`/api/patient-booking-appointment`, data)
}
const postVerifyBooking = (data) => {
    return axios.post(`/api/verify-booking`, data)
}

const addNewSpecialty = (data) => {
    return axios.post(`/api/add-new-specialty`, data)
}
const addNewSpecialtyOfClinic = (data) => {
    return axios.post(`/api/add-new-specialties-of-clinic`, data)
}
const getAllSpecialties = () => {
    return axios.get(`/api/get-all-specialties`)
}
const getAllSpecialtiesOfClinic = (data) => {
    return axios.post(`/api/get-all-specialties-of-clinic`,data)
}
const getClinicWeekSchedules = (data) => {
    return axios.post(`/api/get-clinic-week-schedules`,data)
}
const getDoctorWeekSchedules = (data) => {
    return axios.post(`/api/get-doctor-week-schedules`,data)
}
const getDoctorSpecialtyWeekSchedules = (data) => {
    return axios.post(`/api/get-doctor-specialty-week-schedules`,data)
}
const deleteSpecialtyById = (id) => {
    return axios.get(`/api/delete-specialty-by-id?id=${id}`)
}
const updateSpecialtybyId = (data) => {
    return axios.post(`/api/update-specialty-by-id`, data)
}
const deleteClinicSpecialtyById = (id) => {
    return axios.get(`/api/delete-clinic-specialty-by-id?id=${id}`)
}
const updateClinicSpecialtybyId = (data) => {
    return axios.post(`/api/update-clinic-specialty-by-id`, data)
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
const getDetailClinicByIdInAccountantSide = (data) => {
    return axios.get(`/api/get-detail-clinic-byId-in-accountantside?id=${data.id}`)
}
const deleteClinicById = (id) => {
    return axios.get(`/api/delete-clinic-by-id?id=${id}`)
}
const addNewMedicine=async(data)=>{
    return axios.post('/api/add-new-medicine',data)
}
const getMedicineByClinicId=async(data)=>{
    return axios.get(`/api/get-medicine-by-clinicId?clinicId=${data}`)
}
const getExtraSpecialtyInforClinic=async(data)=>{
    return axios.get(`/api/get-extra-specialty-infor-clinic?id=${data}`)
}
const deleteMedicineById=async(data)=>{
    return axios.delete(`/api/delete-medicine-by-id?id=${data}`)
}
const getMedicineById=async(data)=>{
    return axios.get(`/api/get-medicine-by-Id?id=${data}`)
}
const editMedicineInfor=async(data)=>{
    return axios.put(`/api/edit-medicine-infor`,data)
}
const warningDuplicateMedicine=async(data)=>{
    return axios.post('/api/check-dulicate-medicine',data)
}
const getAllDoctorOfClinic=async(data)=>{
    return axios.post('/api/get-all-doctor-clinic',data)
}
const getAllDoctorOfHospital=async(data)=>{
    return axios.post('/api/get-all-doctors-hospital',data)
}

const handleRegisterApi = async (data) => {
    return await axios.post('/api/register', data)
}
const getListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const getListPatientForDoctorWithTimeType = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor-withtimeType?doctorId=${data.doctorId}&date=${data.date}&timeType=${data.timeType}`)
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
const getMedicalRecordByDate= (data) => {
    return axios.get(`/api/get-history-patientByDate?date=${data}`)
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
const getListSearch = () => {
    return axios.get(`/api/get-data-search`)
}

export {
    handleLoginApi, postMedicalRecords, postRating, getListExaminatedPatientForDoctor,
    getAllUsers, getMedicalRecordByBookingId, getListPatientCommentByDoctorId,createNewDoctorService,
    createNewUserService, getSelectedScheduleFromDoctor,addNewMedicine,createNewClinicDoctorService,
    deleteClinicSpecialtyById,updateClinicSpecialtybyId,saveBulkScheduleForClinic,
    deleteMedicineById,getMedicineById,editMedicineInfor,getDetailClinicByIdInAccountantSide,
    deleteUserService,getMedicineByClinicId,warningDuplicateMedicine,addNewSpecialtyOfClinic,
    editUserService,getAllSpecialtiesOfClinic,getAllDoctorOfHospital,deleteDoctorService,
    getAllCodeService,getAllDoctorOfClinic,getClinicWeekSchedules,getListPatientForDoctorWithTimeType,
    getTopDoctorHomeService,editDoctorHospitalService,getDoctorWeekSchedules,
    getAllDoctors, cancelBookingFromPatient,getScheduleDoctorByDateContainUserId,
    saveDetailDoctorService, getAllMarkdown,getSpecialtyScheduleByWeek,
    getDetailInforDoctor, saveBulkScheduleDoctor,getExtraSpecialtyInforClinic,
    getSelectedSchedule, getScheduleDoctorByDate,getDoctorSpecialtyWeekSchedules,
    deleteSelectedSchedule, getExtraInforDoctorById,getMedicalRecordByDate,
    getProfileDoctorById, postPatientAppointment,deleteDoctorClinicService,
    postVerifyBooking, addNewSpecialty, getAllAppointmentOfPatient,
    getHospitalAppointmentByDate,getStatisticalForHospitalSpecialty,
    getAllSpecialties, addNewClinic, getAllClinics,editDoctorClinicService,
    getDetailSpecialtyById, handleRegisterApi, handleGetPermission,getStatisticalForDoctorHospitalSpecialty,
    getDetailClinicById, getListPatientForDoctor, editUserInforByOwnService, postVerifyRegister,
    handleForgotPassWord, checkTokenResetPassword, handleResetPassWord,
    deleteClinicById, updateClinicbyId, deleteSpecialtyById, updateSpecialtybyId, getListSearch
}
