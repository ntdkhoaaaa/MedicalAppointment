import actionTypes from "../actions/actionTypes";
const initialState = {
  specialtyWeekSchedules: [],
  extraSpecialtyInfor: {},
  appointmentByDate: [],
  statisticalForHospitalSpecialty: [],
  statisticalForDoctorHospitalSpecialty: [],
};
const hospitalAccountantReducer = (state = initialState, action) => {
  let copyState = { ...state };

  switch (action.type) {
    case actionTypes.FETCH_SPECIALTY_WEEK_SCHEDULE_SUCCESS:
      copyState.specialtyWeekSchedules = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_EXTRA_SPECIALTY_INFOR_SUCCESS:
      copyState.extraSpecialtyInfor = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_APPOINTMENT_HOSPITAL_SUCCESS:
      copyState.appointmentByDate = action.data;
      console.log("form hospital reducer", action.data);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_STATISTICAL_FOR_HOSPITAL_SPECIALTY_SUCCESS:
      copyState.statisticalForHospitalSpecialty = action.data;
      console.log("form hospital reducer", action.data);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_STATISTICAL_FOR_DOCTOR_HOSPITAL_SPECIALTY_SUCCESS:
      copyState.statisticalForDoctorHospitalSpecialty = action.data;
      console.log("form hospital reducer", action.data);
      return {
        ...copyState,
      };
    default:
      return state;
  }
};
export default hospitalAccountantReducer;
