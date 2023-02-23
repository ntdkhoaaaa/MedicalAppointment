import actionTypes from './actionTypes';
import {getMedicineByClinicId} from '../../services/userServices';
import { toast } from "react-toastify";
export const fetchAllMedicine = (clinicId) => {
    return async (dispatch, getState) => {
        try {
            console.log('check clinicId', clinicId)

            let res = await getMedicineByClinicId(clinicId);
            console.log('check res', res);

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_MEDICINE_BY_CLINICID_SUCCESS,
                    data: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_MEDICINE_BY_CLINICID_FAIL,
                });
            }
        } catch (e) {
            console.log("fetch all medicine by clinicId", e);
            dispatch({
                type: actionTypes.FETCH_ALL_MEDICINE_BY_CLINICID_FAIL,
            })
        }
    }
}
export const fetchAllRequiredInforSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_REQUIRED_INFOR_SUCCESS,
    data: data,
})

export const fetchAllRequiredInforFailed = () => ({
    type: actionTypes.FETCH_ALL_REQUIRED_INFOR_FAILED,
})