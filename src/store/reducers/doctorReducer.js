import actionTypes from "../actions/actionTypes";

const initialState = {
  medicineByClinicId: [],
  doctorWeekSchedules: [],
};
const doctorReducer = (state = initialState, action) => {
    let copyState = { ...state };

  switch (action.type) {

    case actionTypes.FETCH_ALL_MEDICINE_BY_CLINICID_SUCCESS:
        copyState.medicineByClinicId = action.data;
      console.log(action.data);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_SCHEDULE_WEEK_SUCCESS:
        copyState.doctorWeekSchedules = action.data;
      console.log(action.data);
      return {
        ...copyState,
      };
    default:
      return state;
  }
};
export default doctorReducer;
