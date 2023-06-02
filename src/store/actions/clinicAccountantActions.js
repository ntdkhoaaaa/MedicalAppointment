import actionTypes from "./actionTypes";
import {
  getDetailClinicByIdInAccountantSide,
  getAllSpecialtiesOfClinic,
  getAllDoctorOfClinic,
  saveBulkScheduleForClinic,
  getClinicWeekSchedules,
  
  createNewClinicDoctorService,
  getAllDoctorOfHospital,
  editDoctorHospitalService,
  deleteDoctorService,
  editDoctorClinicService,
  deleteDoctorClinicService
} from "../../services/userServices";
import { toast } from "react-toastify";

export const fetchDetailedClinic = (clinicId) => {
  return async (dispatch, getState) => {
    try {
      let res = await getDetailClinicByIdInAccountantSide({ id: clinicId });

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_CLINIC_DETAIL_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_CLINIC_DETAIL_FAIL,
        });
      }
    } catch (e) {
      console.log("fetch all medicine by clinicId", e);
      dispatch({
        type: actionTypes.FETCH_CLINIC_DETAIL_FAIL,
      });
    }
  };
};
export const fetchAllRequiredInforSuccess = (data) => ({
  type: actionTypes.FETCH_CLINIC_DETAIL_SUCCESS,
  data: data,
});

export const fetchAllRequiredInforFailed = () => ({
  type: actionTypes.FETCH_CLINIC_DETAIL_FAIL,
});
export const fetchAllSpecialtiesOfClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllSpecialtiesOfClinic({ clinicId: data });
      console.log("check specialty", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_SPECIALTIES_OF_CLINIC_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_SPECIALTIES_OF_CLINIC_FAIL,
        });
      }
    } catch (e) {
      console.log("fetch all specialties by clinicId", e);
      dispatch({
        type: actionTypes.FETCH_ALL_SPECIALTIES_OF_CLINIC_FAIL,
      });
    }
  };
};
export const fetchAllSpecialtiesOfClinicSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_SPECIALTIES_OF_CLINIC_SUCCESS,
  data: data,
});

export const fetchAllSpecialtiesOfClinicFailed = () => ({
  type: actionTypes.FETCH_ALL_SPECIALTIES_OF_CLINIC_FAIL,
});

export const fetchAllDoctorsOfClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorOfClinic(data);
      console.log("check res", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_OF_CLINIC_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_OF_CLINIC_FAIL,
        });
      }
    } catch (e) {
      console.log("fetch all specialties by clinicId", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_OF_CLINIC_FAIL,
      });
    }
  };
};
export const fetchAllDoctorsOfClinicSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_OF_CLINIC_SUCCESS,
  data: data,
});

export const fetchAllDoctorsOfClinicFailed = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_OF_CLINIC_FAIL,
});
export const SaveBulkScheduleForClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveBulkScheduleForClinic(data);

      if (res && res.errCode === 0) {
        toast.success("Save Schedules for clinic successfully");
        dispatch({
          type: actionTypes.SAVE_BULK_SCHEDULES_FOR_CLINIC_SUCCESS,
          data: res.data,
        });
      } else {
        toast.error("Save Schedules for clinic fail");
        dispatch({
          type: actionTypes.SAVE_BULK_SCHEDULES_FOR_CLINIC_FAIL,
        });
      }
    } catch (e) {
      console.log("SAVE_BULK_SCHEDULES_FOR_CLINIC_SUCCESS", e);
      dispatch({
        type: actionTypes.SAVE_BULK_SCHEDULES_FOR_CLINIC_SUCCESS,
      });
    }
  };
};
export const SaveBulkScheduleForClinicSuccess = (data) => ({
  type: actionTypes.SAVE_BULK_SCHEDULES_FOR_CLINIC_SUCCESS,
  data: data,
});

export const SaveBulkScheduleForClinicFailed = () => ({
  type: actionTypes.SAVE_BULK_SCHEDULES_FOR_CLINIC_FAIL,
});

export const fetchClinicWeekSchedules = (clinicId, date) => {
  return async (dispatch, getState) => {
    try {
      let res = await getClinicWeekSchedules({
        clinicId: clinicId,
        currentDate: date,
        timetype: 'TM'
      });
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_FAILED,
        });
      }
    } catch (e) {
      console.log("fetch all clinic week schedules by clinicId", e);
      dispatch({
        type: actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_FAILED,
      });
    }
  };
};
export const fetchClinicWeekSchedulesSuccess = (data) => ({
  type: actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_SUCCESS,
  data: data,
});

export const fetchClinicWeekSchedulesFailed = () => ({
  type: actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_FAILED,
});
export const fetchClinicWeekSchedulesAfternoon = (clinicId, date) => {
  return async (dispatch, getState) => {
    try {
      let res = await getClinicWeekSchedules({
        clinicId: clinicId,
        currentDate: date,
        timetype: 'TA'
      });
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_AFTERNOON_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_AFTERNOON_FAILED,
        });
      }
    } catch (e) {
      console.log("fetch all clinic week schedules by clinicId", e);
      dispatch({
        type: actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_AFTERNOON_FAILED,
      });
    }
  };
};
export const fetchClinicWeekSchedulesAfternoonSuccess = (data) => ({
  type: actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_AFTERNOON_SUCCESS,
  data: data,
});

export const fetchClinicWeekSchedulesAfternoonFailed = () => ({
  type: actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_AFTERNOON_FAILED,
});
export const SaveNewClinicDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewClinicDoctorService(data);
      console.log(data);
      if (res && res.errCode === 0) {
        toast.success("Save New Doctor  successfully");
        dispatch({
          type: actionTypes.SAVE_NEW_DOCTOR_SUCCESS,
          data: res,
        });
        dispatch(fetchAllDoctorsOfClinic({
          clinicId: data.clinicId,
          specialtyCode:'All',
          positionCode:'All'
        }))
      } else {
        toast.error("Save Schedules for clinic fail");
        console.log("SAVE_BULK_SCHEDULES_FOR_CLINIC_SUCCESS", res.errMessage);
        dispatch({
          type: actionTypes.SAVE_NEW_DOCTOR_FAIL,
        });
      }
    } catch (e) {
      console.log("SAVE_BULK_SCHEDULES_FOR_CLINIC_SUCCESS", e);
      dispatch({
        type: actionTypes.SAVE_NEW_DOCTOR_SUCCESS,
      });
    }
  };
};
export const SaveNewDoctorSuccess = (data) => ({
  type: actionTypes.SAVE_NEW_DOCTOR_SUCCESS,
  data: data,
});

export const SaveNewDoctorFailed = () => ({
  type: actionTypes.SAVE_NEW_DOCTOR_FAIL,
});
export const fetchAllDoctorsOfHospital = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorOfHospital(data);
      console.log("check specialty", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_HOSPITAL_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_HOSPITAL_FAIL,
        });
      }
    } catch (e) {
      console.log("fetch all specialties by clinicId", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_HOSPITAL_FAIL,
      });
    }
  };
};
export const EditInforDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editDoctorClinicService(data);
      console.log(data);
      if (res && res.errCode === 0) {
        toast.success("Edit infor doctor  successfully");
        dispatch({
          type: actionTypes.EDIT_INFOR_DOCTOR_SUCCESS,
          data: res,
        });
        dispatch(fetchAllDoctorsOfClinic({
          clinicId: data.clinicId,
          specialtyCode:'All',
          positionCode:'All'
        }))
      } else {
        toast.error("Edit infor doctor fail");
        console.log("Edit infor doctor", res.errMessage);
        dispatch({
          type: actionTypes.EDIT_INFOR_DOCTOR_FAIL,
        });
      }
    } catch (e) {
      console.log("Edit infor doctor", e);
      dispatch({
        type: actionTypes.EDIT_INFOR_DOCTOR_SUCCESS,
      });
    }
  };
};
export const EditInforDoctorSuccess = (data) => ({
  type: actionTypes.EDIT_INFOR_DOCTOR_SUCCESS,
  data: data,
});

export const EditInforDoctorFailed = () => ({
  type: actionTypes.EDIT_INFOR_DOCTOR_FAIL,
});
export const DeleteDoctor = (userId,clinicId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteDoctorClinicService({userId:userId});
      // console.log(data);
      if (res && res.errCode === 0) {
        toast.success("delete doctor  successfully");
        dispatch({
          type: actionTypes.DELETE_DOCTOR_SUCCESS,
          data: res,
        });
        dispatch(fetchAllDoctorsOfClinic({
          clinicId: clinicId,
          specialtyCode:'All',
          positionCode:'All'
        }))
      } else {
        toast.error("delete doctor fail");
        console.log("delete doctor", res.errMessage);
        dispatch({
          type: actionTypes.DELETE_DOCTOR_FAIL,
        });
      }
    } catch (e) {
      console.log("delete doctor", e);
      dispatch({
        type: actionTypes.DELETE_DOCTOR_SUCCESS,
      });
    }
  };
};
export const DeleteDoctorSuccess = (data) => ({
  type: actionTypes.DELETE_DOCTOR_SUCCESS,
  data: data,
});

export const DeleteDoctorFailed = () => ({
  type: actionTypes.EDIT_INFOR_DOCTOR_FAIL,
});