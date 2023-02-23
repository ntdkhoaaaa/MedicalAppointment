import actionTypes from '../actions/actionTypes';

const initialState = {
    medicineByClinicId:[]
}
const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_MEDICINE_BY_CLINICID_SUCCESS:
            let copyState = { ...state }
            copyState.medicineByClinicId = action.data
            console.log(action.data)
            return {
                ...copyState,
            }
        default:
            return state;
    }
}
export default doctorReducer;
