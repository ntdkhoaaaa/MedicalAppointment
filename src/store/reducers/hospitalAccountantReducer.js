import actionTypes from "../actions/actionTypes";
const initialState = {
    clinicDetailed: {},
    clinicSpecialties: [],
    clinicDoctors: [],
    clinicWeekSchedules: [],
    saveNewUserSuccess: {},
    hospitalDoctors: [],
  };
  const hospitalAccountantReducer = (state = initialState, action) => {
    switch (action.type) {

      default:
        return state;
    }
  };
  export default hospitalAccountantReducer;