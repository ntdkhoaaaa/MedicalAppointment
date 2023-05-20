import actionTypes from "./actionTypes";
import {
  getMedicineByClinicId,
  getDoctorWeekSchedules,
  getMedicalRecordByBookingId,
  getListPatientForDoctor,
  getListExaminatedPatientForDoctor,
  getMedicalRecordByDate
} from "../../services/userServices";
import { toast } from "react-toastify";
export const fetchAllMedicine = (clinicId) => {
  return async (dispatch, getState) => {
    try {

      let res = await getMedicineByClinicId(clinicId);

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
export const fetchAllRequiredInforSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_REQUIRED_INFOR_SUCCESS,
  data: data,
});

export const fetchAllRequiredInforFailed = () => ({
  type: actionTypes.FETCH_ALL_REQUIRED_INFOR_FAILED,
});
export const fetchAllScheduleForWeek = (doctorId, date) => {
  return async (dispatch, getState) => {
    try {

      let res = await getDoctorWeekSchedules({
        doctorId: doctorId,
        currentDate: date,
      });
      console.log(res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_SCHEDULE_WEEK_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_SCHEDULE_WEEK_FAILED,
        });
      }
    } catch (e) {
      console.log("fetch all medicine by clinicId", e);
      dispatch({
        type: actionTypes.FETCH_ALL_SCHEDULE_WEEK_FAILED,
      });
    }
  };
};
export const fetchAllSchedulesForWeekSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_SCHEDULE_WEEK_SUCCESS,
  data: data,
});

export const fetchAllSchedulesForWeekFailed = () => ({
  type: actionTypes.FETCH_ALL_SCHEDULE_WEEK_FAILED,
});

export const fetchMedicalRecordByBookingId = (bookingId) => {
  return async (dispatch, getState) => {
    try {

      let res = await getMedicalRecordByBookingId(bookingId);

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_MEDICAL_RECORD_SUCCESS,
          data: res.historyInfo,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_MEDICAL_RECORD_FAIL,
        });
      }
    } catch (e) {
      console.log("fetch all medicine by clinicId", e);
      dispatch({
        type: actionTypes.FETCH_MEDICAL_RECORD_FAIL,
      });
    }
  };
};

export const fetchRegisteredPatientByDate = (doctorId, date) => {
  return async (dispatch, getState) => {
    try {

      let res = await getListPatientForDoctor({
        doctorId: doctorId,
        date: date,
      });

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_REGISTERED_PATIENT_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_REGISTERED_PATIENT_FAIL,
        });
      }
    } catch (e) {
      console.log("fetch all medicine by clinicId", e);
      dispatch({
        type: actionTypes.FETCH_REGISTERED_PATIENT_FAIL,
      });
    }
  };
};

export const fetchExaminatedPatientByDate = (doctorId, date) => {
  return async (dispatch, getState) => {
    try {;

      let res = await getListExaminatedPatientForDoctor({
        doctorId: doctorId,
        date: date,
      });

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_EXAMINATED_PATIENT_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_EXAMINATED_PATIENT_FAIL,
        });
      }
    } catch (e) {
      console.log("fetch FETCH_EXAMINATED_PATIENT_FAIL", e);
      dispatch({
        type: actionTypes.FETCH_EXAMINATED_PATIENT_FAIL,
      });
    }
  };
};
export const fetchPatientMedicalRecordsByDate = (date) => {
  return async (dispatch, getState) => {
    try {

      let res = await getMedicalRecordByDate(date);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PATIENTS_MEDICAL_RECORD_BYDATE_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PATIENTS_MEDICAL_RECORD_BYDATE_FAIL,
        });
      }
    } catch (e) {
      console.log("fetch FETCH_PATIENTS_MEDICAL_RECORD_BYDATE_FAIL", e);
      dispatch({
        type: actionTypes.FETCH_PATIENTS_MEDICAL_RECORD_BYDATE_FAIL,
      });
    }
  };
};