import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    accessToken: '',
    permission: '',
    refreshToken: '',
    loadPermission: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.USER_LOGIN_SUCCESS:
    console.log(action.userInfo)
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
                accessToken: action.accessToken,
                permission: action.userInfo.roleId,
                refreshToken: action.refreshToken,
                loadPermission: true,
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
                accessToken: '',
                permission: '',
                refreshToken: '',
            }
        case actionTypes.PERMISSION_SUCCESS:
            return {
                ...state,
                permission: action.data,
                userInfo: action.userInfo,
                loadPermission: true
            }
        case actionTypes.PERMISSION_FAIL:
            return {
                ...state,
                permission: action.data,
                isLoggedIn: false,
                userInfo: null,
                accessToken: '',
                refreshToken: '',
                loadPermission: false,
            }
        case actionTypes.REFRESH_TOKEN:
            return {
                ...state,
                accessToken: action.accessToken,
                userInfo: action.user,
                permission: action.user.roleId,
                refreshToken: action.refreshToken,
                loadPermission: true
            }
        default:
            return state;
    }
}

export default appReducer;