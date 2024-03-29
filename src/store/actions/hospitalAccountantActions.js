import actionTypes from "./actionTypes";
import {
  getDetailClinicByIdInAccountantSide,
  getAllSpecialtiesOfClinic,
  getAllDoctorOfClinic,
  saveBulkScheduleForClinic,
  getClinicWeekSchedules,
  createNewDoctorService,
  getAllDoctorOfHospital,
  editDoctorHospitalService,
  deleteDoctorService,
  getSpecialtyScheduleByWeek,
  getExtraSpecialtyInforClinic,
  getHospitalAppointmentByDate,
  getStatisticalForHospitalSpecialty,
  getStatisticalForDoctorHospitalSpecialty
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
export const fetchAllDoctorsOfClinic = (clinicId, specialtyId, positionId) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorOfClinic({
        clinicId: clinicId,
        specialtyCode: specialtyId,
        positionCode: positionId,
      });
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

export const fetchAllAppointmentByDate = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getHospitalAppointmentByDate({
        hospitalId:data.hospitalId,
        date:data.date
      });
      console.log("check res", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_APPOINTMENT_HOSPITAL_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_APPOINTMENT_HOSPITAL_FAIL,
        });
      }
    } catch (e) {
      console.log("fetch all specialties by clinicId", e);
      dispatch({
        type: actionTypes.FETCH_ALL_APPOINTMENT_HOSPITAL_FAIL,
      });
    }
  };
};
export const fetchStatisticalForHospitalSpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getStatisticalForHospitalSpecialty({
        hospitalId:data.hospitalId,
        startDate:data.startDate,
        endDate:data.endDate
      });

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_STATISTICAL_FOR_HOSPITAL_SPECIALTY_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_STATISTICAL_FOR_HOSPITAL_SPECIALTY_FAIL,
        });
      }
    } catch (e) {
      console.log("fetch all specialties by clinicId", e);
      dispatch({
        type: actionTypes.FETCH_ALL_APPOINTMENT_HOSPITAL_FAIL,
      });
    }
  };
};
export const fetchStatisticalForDoctorHospitalSpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      console.log(data);
      let res = await getStatisticalForDoctorHospitalSpecialty({
        hospitalId:data.hospitalId,
        specialtyId:data.specialtyId,
        startDate:data.startDate,
        endDate:data.endDate
      });

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_STATISTICAL_FOR_DOCTOR_HOSPITAL_SPECIALTY_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_STATISTICAL_FOR_DOCTOR_HOSPITAL_SPECIALTY_FAIL,
        });
      }
    } catch (e) {
      console.log("fetch all specialties by clinicId", e);
      dispatch({
        type: actionTypes.FETCH_STATISTICAL_FOR_DOCTOR_HOSPITAL_SPECIALTY_FAIL,
      });
    }
  };
};



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
      });
      console.log("check res", res);
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
export const SaveNewDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewDoctorService(data);
      console.log(data);
      if (res && res.errCode === 0) {
        toast.success("Save New Doctor  successfully");
        dispatch({
          type: actionTypes.SAVE_NEW_DOCTOR_SUCCESS,
          data: res,
        });
        dispatch(
          fetchAllDoctorsOfHospital({
            clinicId: data.clinicId,
            specialtyCode: "All",
            positionCode: "All",
          })
        );
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
      console.log("checkdata", data);
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
export const EditInforDoctorHospital = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editDoctorHospitalService(data);
      console.log(data);
      if (res && res.errCode === 0) {
        toast.success("Edit infor doctor  successfully");
        dispatch({
          type: actionTypes.EDIT_INFOR_DOCTOR_SUCCESS,
          data: res,
        });
        dispatch(
          fetchAllDoctorsOfHospital({
            clinicId: data.clinicId,
            specialtyCode: "All",
            positionCode: "All",
          })
        );
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
export const DeleteDoctorHospital = (userId, clinicId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteDoctorService({ userId: userId });
      // console.log(data);
      if (res && res.errCode === 0) {
        toast.success("delete doctor  successfully");
        dispatch({
          type: actionTypes.DELETE_DOCTOR_SUCCESS,
          data: res,
        });
        dispatch(
          fetchAllDoctorsOfHospital({
            clinicId: clinicId,
            specialtyCode: "All",
            positionCode: "All",
          })
        );
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





export const fetchWeekSpecialtyScheduleClinic = (clinicId,specialtyId) => {
  return async (dispatch, getState) => {
    try {
      let res = await getSpecialtyScheduleByWeek(clinicId,specialtyId);

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_SPECIALTY_WEEK_SCHEDULE_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_SPECIALTY_WEEK_SCHEDULE_FAIL,
        });
      }
    } catch (e) {
      console.log("fetch week specialty schedules", e);
      dispatch({
        type: actionTypes.FETCH_SPECIALTY_WEEK_SCHEDULE_FAIL,
      });
    }
  };
};
export const fetchExtraSpecialtyInforClinic = (specialtyId) => {
  return async (dispatch, getState) => {
    try {
      let res = await getExtraSpecialtyInforClinic(specialtyId);

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_EXTRA_SPECIALTY_INFOR_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_EXTRA_SPECIALTY_INFOR_FAIL,
        });
      }
    } catch (e) {
      console.log("fetch extra specialty infor", e);
      dispatch({
        type: actionTypes.FETCH_EXTRA_SPECIALTY_INFOR_FAIL,
      });
    }
  };
};