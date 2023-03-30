import actionTypes from './actionTypes';
import {getDetailClinicByIdInAccountantSide,
    getAllSpecialtiesOfClinic,getAllDoctorOfClinic,saveBulkScheduleForClinic,
    getClinicWeekSchedules,createNewDoctorService
} from '../../services/userServices';
import { toast } from "react-toastify";

export const fetchDetailedClinic = (clinicId) => {
    return async (dispatch, getState) => {
        try {
    
            let res = await getDetailClinicByIdInAccountantSide({id:clinicId});
   

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_CLINIC_DETAIL_SUCCESS,
                    data: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_CLINIC_DETAIL_FAIL,
                });
            }
        } catch (e) {
            console.log("fetch all medicine by clinicId", e);
            dispatch({
                type: actionTypes.FETCH_CLINIC_DETAIL_FAIL,
            })
        }
    }
}
export const fetchAllRequiredInforSuccess = (data) => ({
    type: actionTypes.FETCH_CLINIC_DETAIL_SUCCESS,
    data: data,
})

export const fetchAllRequiredInforFailed = () => ({
    type: actionTypes.FETCH_CLINIC_DETAIL_FAIL,
})
export const fetchAllSpecialtiesOfClinic = (data) => {
    return async (dispatch, getState) => {
        try {
    
            let res = await getAllSpecialtiesOfClinic({clinicId:data});
            console.log('check specialty',res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_SPECIALTIES_OF_CLINIC_SUCCESS,
                    data: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_SPECIALTIES_OF_CLINIC_FAIL,
                });
            }
        } catch (e) {
            console.log("fetch all specialties by clinicId", e);
            dispatch({
                type: actionTypes.FETCH_ALL_SPECIALTIES_OF_CLINIC_FAIL,
            })
        }
    }
}
export const fetchAllSpecialtiesOfClinicSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SPECIALTIES_OF_CLINIC_SUCCESS,
    data: data,
})

export const fetchAllSpecialtiesOfClinicFailed = () => ({
    type: actionTypes.FETCH_ALL_SPECIALTIES_OF_CLINIC_FAIL,
})


export const fetchAllDoctorsOfClinic = (clinicId,specialtyId,positionId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorOfClinic({
                clinicId:clinicId,
                specialtyCode:specialtyId,
                positionCode:positionId
            });
            console.log('check res', res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_OF_CLINIC_SUCCESS,
                    data: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_OF_CLINIC_FAIL,
                });
            }
        } catch (e) {
            console.log("fetch all specialties by clinicId", e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_OF_CLINIC_FAIL,
            })
        }
    }
}
export const fetchAllDoctorsOfClinicSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_OF_CLINIC_SUCCESS,
    data: data,
})

export const fetchAllDoctorsOfClinicFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_OF_CLINIC_FAIL,
})
export const SaveBulkScheduleForClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveBulkScheduleForClinic(data);

            if (res && res.errCode === 0) {
                toast.success('Save Schedules for clinic successfully')
                dispatch({
                    type: actionTypes.SAVE_BULK_SCHEDULES_FOR_CLINIC_SUCCESS,
                    data: res.data,
                })
            }
            else {
                toast.error('Save Schedules for clinic fail')
                dispatch({
                    type: actionTypes.SAVE_BULK_SCHEDULES_FOR_CLINIC_FAIL,
                });
            }
        } catch (e) {
            console.log("SAVE_BULK_SCHEDULES_FOR_CLINIC_SUCCESS", e);
            dispatch({
                type: actionTypes.SAVE_BULK_SCHEDULES_FOR_CLINIC_SUCCESS,
            })
        }
    }
}
export const SaveBulkScheduleForClinicSuccess = (data) => ({
    type: actionTypes.SAVE_BULK_SCHEDULES_FOR_CLINIC_SUCCESS,
    data: data,
})

export const SaveBulkScheduleForClinicFailed = () => ({
    type: actionTypes.SAVE_BULK_SCHEDULES_FOR_CLINIC_FAIL,
})

export const fetchClinicWeekSchedules = (clinicId,date) => {
    return async (dispatch, getState) => {
        try {
            let res = await getClinicWeekSchedules({
                clinicId:clinicId,
                currentDate:date
            });
            console.log('check res', res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_SUCCESS,
                    data: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_FAILED,
                });
            }
        } catch (e) {
            console.log("fetch all clinic week schedules by clinicId", e);
            dispatch({
                type: actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_FAILED,
            })
        }
    }
}
export const fetchClinicWeekSchedulesSuccess = (data) => ({
    type: actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_SUCCESS,
    data: data,
})

export const fetchClinicWeekSchedulesFailed = () => ({
    type: actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_FAILED,
})



export const SaveNewDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewDoctorService(data);

            if (res && res.errCode === 0) {
                toast.success('Save New Doctor  successfully')
                dispatch({
                    type: actionTypes.SAVE_NEW_DOCTOR_SUCCESS,
                    data: res.data,
                })
            }
            else {
                toast.error('Save Schedules for clinic fail')
                console.log("SAVE_BULK_SCHEDULES_FOR_CLINIC_SUCCESS", res.errMessage);

                dispatch({
                    type: actionTypes.SAVE_NEW_DOCTOR_FAIL,
                });
            }
        } catch (e) {
            console.log("SAVE_BULK_SCHEDULES_FOR_CLINIC_SUCCESS", e);
            dispatch({
                type: actionTypes.SAVE_NEW_DOCTOR_SUCCESS,
            })
        }
    }
}
export const SaveNewDoctorSuccess = (data) => ({
    type: actionTypes.SAVE_NEW_DOCTOR_SUCCESS,
    data: data,
})

export const SaveNewDoctorFailed = () => ({
    type: actionTypes.SAVE_NEW_DOCTOR_FAIL,
})