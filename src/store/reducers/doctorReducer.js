import actionTypes from "../actions/actionTypes";

const initialState = {
  medicineByClinicId: [],
  doctorWeekSchedules: [],
  medicalRecords: {},
  registeredPatients: [],
  examinatedPatients: [],
  patientsMedicalRecords: [],
  dataPatients: [],
};
const doctorReducer = (state = initialState, action) => {
  let copyState = { ...state };

  switch (action.type) {
    case actionTypes.FETCH_ALL_MEDICINE_BY_CLINICID_SUCCESS:
      copyState.medicineByClinicId = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_SCHEDULE_WEEK_SUCCESS:
      copyState.doctorWeekSchedules = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_MEDICAL_RECORD_SUCCESS:
      copyState.medicalRecords = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_REGISTERED_PATIENT_SUCCESS:
      copyState.registeredPatients = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_EXAMINATED_PATIENT_SUCCESS:
      copyState.examinatedPatients = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_PATIENTS_MEDICAL_RECORD_BYDATE_SUCCESS:
      copyState.patientsMedicalRecords = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_PATIENT_INFOR_SUCCESS:
      copyState.dataPatients = action.data;
      return {
        ...copyState,
      };
    default:
      return state;
  }
};
export default doctorReducer;
