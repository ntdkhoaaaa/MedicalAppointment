import actionTypes from "./actionTypes";
import {
    getDoctorSpecialtyWeekSchedules,
    getMedicineByClinicId
} from "../../services/userServices";
import { toast } from "react-toastify";
export const fetchSpecialtyDoctorScheduleForWeek = (doctorId,date) => {
    return async (dispatch, getState) => {
      try {  
        console.log(doctorId,date)
        let res = await getDoctorSpecialtyWeekSchedules({
          doctorId: doctorId,
          currentDate: date
        });  
        console.log('res', res);
        if (res && res.errCode === 0) {
          dispatch({
            type: actionTypes.FETCH_SPECIALTY_DOCTOR_WEEKLY_SCHEDULE_SUCCESS,
            data: res.data,
          });
        } else {
          dispatch({
            type: actionTypes.FETCH_SPECIALTY_DOCTOR_WEEKLY_SCHEDULE_FAIL,
          });
        }
      } catch (e) {
        console.log("fetch specialty doctor weekly schedule", e);
        dispatch({
          type: actionTypes.FETCH_SPECIALTY_DOCTOR_WEEKLY_SCHEDULE_FAIL,
        });
      }
    };
  };
  export const fetchSpecialtyDoctorScheduleForWeekSuccess = (data) => ({
    type: actionTypes.FETCH_SPECIALTY_DOCTOR_WEEKLY_SCHEDULE_SUCCESS,
    data: data,
  });
  
  export const fetchSpecialtyDoctorScheduleForWeekFailed = () => ({
    type: actionTypes.FETCH_SPECIALTY_DOCTOR_WEEKLY_SCHEDULE_FAIL,
  });
  export const fetchAllMedicineFromDoctorHospital = (clinicId) => {
    return async (dispatch, getState) => {
      try {
        console.log('from doctor hospital',clinicId)
        let res = await getMedicineByClinicId(clinicId);
        console.log('from doctor',res)
        if (res && res.errCode === 0) {
          dispatch({
            type: actionTypes.FETCH_ALL_MEDICINE_BY_CLINICID_SUCCESS,
            data: res.data,
          });
        } else {
          dispatch({
            type: actionTypes.FETCH_ALL_MEDICINE_BY_CLINICID_FAIL,
          });
        }
      } catch (e) {
        console.log("fetch all medicine by clinicId", e);
        dispatch({
          type: actionTypes.FETCH_ALL_MEDICINE_BY_CLINICID_FAIL,
        });
      }
    };
  };