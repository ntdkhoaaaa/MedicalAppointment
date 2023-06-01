import actionTypes from "../actions/actionTypes";
const initialState = {
  specialtyWeekSchedules: [],
  extraSpecialtyInfor: {},
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
    default:
      return state;
  }
};
export default hospitalAccountantReducer;
