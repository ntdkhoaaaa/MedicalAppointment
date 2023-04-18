import actionTypes from "../actions/actionTypes";

const initialState = {
  clinicDetailed: {},
  clinicSpecialties: [],
  clinicDoctors: [],
  clinicWeekSchedules: [],
  saveNewUserSuccess: {},
  hospitalDoctors: [],
};
const clinicAccountantReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CLINIC_DETAIL_SUCCESS:
      let copyState = { ...state };
      copyState.clinicDetailed = action.data;
      console.log(action.data);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_SPECIALTIES_OF_CLINIC_SUCCESS:
      state.clinicSpecialties = action.data;
      console.log(action.data);
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_OF_CLINIC_SUCCESS:
      state.clinicDoctors = action.data;
      console.log(action.data);
      return {
        ...state,
      };
    case actionTypes.FETCH_CLINIC_WEEK_SCHEDULES_SUCCESS:
      state.clinicWeekSchedules = action.data;
      console.log(action.data);
      return {
        ...state,
      };
    case actionTypes.SAVE_NEW_DOCTOR_SUCCESS:
      state.saveNewUserSuccess = action.data;
      console.log(action.data);
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_HOSPITAL_SUCCESS:
      state.hospitalDoctors = action.data;
      console.log(action.data);
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default clinicAccountantReducer;
