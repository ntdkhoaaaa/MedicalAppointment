import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    accessToken: '',
    permission: '',
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
                accessToken: action.accessToken,
                permission: action.userInfo.roleId,
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                accessToken: ''
            }
        case actionTypes.PERMISSION_SUCCESS:
            return {
                ...state,
                permission: action.data
            }
        case actionTypes.PERMISSION_FAIL:
            return {
                ...state,
                permission: action.data,
                isLoggedIn: false,
                userInfo: null,
                accessToken: ''
            }
        default:
            return state;
    }
}

export default appReducer;