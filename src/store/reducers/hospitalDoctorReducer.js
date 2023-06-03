import actionTypes from "../actions/actionTypes";
const initialState = {
  doctorWeeklySchedule: [],
  medicineByClinicId: [],
};
const doctorHospitalReducer = (state = initialState, action) => {
  let copyState = { ...state };

  switch (action.type) {
    case actionTypes.FETCH_SPECIALTY_DOCTOR_WEEKLY_SCHEDULE_SUCCESS:
      copyState.doctorWeeklySchedule = action.data;
      console.log(action.data);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_MEDICINE_BY_CLINICID_SUCCESS:
      copyState.medicineByClinicId = action.data;
      console.log("form hospital reducer", action.data);
      return {
        ...copyState,
      };

    default:
      return state;
  }
};
export default doctorHospitalReducer;
