import actionTypes from './actionTypes';
import {
    getAllCodeService, deleteUserService,
    createNewUserService, getAllUsers,
    editUserService, getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctorService, getAllMarkdown, getDetailInforDoctor,
    getAllSpecialties, getAllClinics

} from '../../services/userServices';
import { toast } from "react-toastify";
export const fetchGenderStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");

            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());
            console.log("Error", e);
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

export const fetchRolesSuccess = (rolesData) => ({
    type: actionTypes.FETCH_ROLES_SUCCESS,
    data: rolesData,
})

export const fetchRolesFail = () => ({
    type: actionTypes.FETCH_ROLES_FAILED,
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})


export const fetchPositionStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("Position");

            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else {
                dispatch(fetchPositionFail());
            }
        } catch (e) {
            dispatch(fetchPositionFail());
            console.log("Error", e);
        }
    }
}



export const fetchRolesStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("Role");

            if (res && res.errCode === 0) {
                dispatch(fetchRolesSuccess(res.data));
            }
            else {
                dispatch(fetchRolesFail());
            }
        } catch (e) {
            dispatch(fetchRolesFail());
            console.log("Error", e);
        }
    }
}
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Create a new user success')
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log("saveUserFailed", e);
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSucess(res.users.reverse()));
            }
            else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("Fetch all users failed")
            dispatch(fetchAllUsersFailed());
            console.log("Error", e);
        }
    }
}
export const fetchAllMarkdown = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllMarkdown("ALL");
            if (res && res.errCode === 0) {
                // let users=res.users.reserve
                dispatch(fetchAllMarkdownSuccess(res.data.reverse()));
            }
            else {
                dispatch(fetchAllMarkdownFailed());
            }
        } catch (e) {
            toast.error("Fetch all users failed")
            dispatch(fetchAllMarkdownFailed());
            console.log("Error", e);
        }
    }
}
export const fetchAllMarkdownSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_MARKDOWN_SUCCESS,
    allMarkdown: data
})
export const fetchAllMarkdownFailed = () => ({
    type: actionTypes.FETCH_ALL_MARKDOWN_FAILED,
})


export const fetchAllUsersSucess = (users) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: users
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Delete user success')
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.success('Delete user failed')
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log("saveUserFailed", e);
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const EditUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Update user success')
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.success('Delete a new user failed')
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.success('Delete a new user failed')

            dispatch(editUserFailed());
            console.log("editUserFailed", e);
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
export const fetchTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                });
            }
        } catch (e) {
            console.log("fetchTopDoctorHomeService", e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
        }
    }
}
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                });
            }
        } catch (e) {
            console.log("fetchTopDoctorHomeService", e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
        }
    }
}
export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res) {
                if (res.errCode === 0) {
                    toast.success('Save infor detail success')
                }
                if (res.errCode === 2) {
                    toast.success('Update infor detail success')
                }
                if (res.errCode === 1) {
                    toast.error(res.errMessage)
                }
                dispatch({
                    type: actionTypes.SAVE_DETAILED_DOCTOR_SUCCESS,
                })
            }
            else {
                toast.error('Error')
                dispatch({
                    type: actionTypes.SAVE_DETAILED_DOCTOR_FAILED,
                });
            }
        } catch (e) {
            toast.error('Error')
            dispatch({
                type: actionTypes.SAVE_DETAILED_DOCTOR_FAILED,
            })
        }
    }
}
export const fetchDoctor = (idInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDetailInforDoctor(idInput);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_A_DOCTOR_SUCCESS,
                    doctor: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_A_DOCTOR_FAILED,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_A_DOCTOR_FAILED,
            })
        }
    }
}
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED,
            })
        }
    }
}
export const getAllRequiredInfor = () => {

    return async (dispatch, getState) => {
        try {
            let res_price = await getAllCodeService("PRICE");
            let res_payment = await getAllCodeService("PAYMENT");
            let res_province = await getAllCodeService("PROVINCE");

            if ((res_price && res_price.errCode === 0)
                && (res_payment && res_payment.errCode === 0)
                && (res_province && res_province.errCode === 0)) {
                let data = {
                    resPrice: res_price.data,
                    resPayment: res_payment.data,
                    resProvince: res_province.data
                }
                dispatch(fetchAllRequiredInforSuccess(data))
            }
            else {
                dispatch(fetchAllRequiredInforFailed());
            }
        } catch (e) {
            dispatch(fetchAllRequiredInforFailed());
            console.log("Error", e);
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

export const fetchAllSpecialties = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSpecialties();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_SPECIALTIES_SUCCESS,
                    allSpecialties: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_SPECIALTIES_FAILED,
                });
            }
        } catch (e) {
            console.log("fetchTopDoctorHomeService", e);
            dispatch({
                type: actionTypes.FETCH_ALL_SPECIALTIES_FAILED,
            })
        }
    }
}

export const fetchAllClinics = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllClinics();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_CLINICS_SUCCESS,
                    allClinics: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_CLINICS_FAILED,
                });
            }
        } catch (e) {
            console.log("fetchTopDoctorHomeService", e);
            dispatch({
                type: actionTypes.FETCH_ALL_CLINICS_FAILED,
            })
        }
    }
}