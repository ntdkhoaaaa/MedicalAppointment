import axios from 'axios';
import _ from 'lodash';
import reduxStore from './redux.js'
import jwt_decode from 'jwt-decode'
import actionTypes from './store/actions/actionTypes';
import { toast } from 'react-toastify';


const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: true
});

const refreshToken = async (token) => {
    try {
        const res = await axios.post(`http://localhost:8080/api/refresh-token`, { refreshToken: token })
        if (res && res.data.errCode === 0 && res.data.user) {
            reduxStore.dispatch({
                type: actionTypes.REFRESH_TOKEN,
                accessToken: res.data.accessToken,
                user: res.data.user,
                refreshToken: res.data.refreshToken,
            })
            return { data: res.data, errCode: 0 };
        } else {
            toast.error("Phiên làm việc hết hạn! Vui lòng đăng nhập lại")
            reduxStore.dispatch({
                type: actionTypes.PROCESS_LOGOUT,
            })
            return { errCode: -1 };
        }
    } catch (error) {
        console.log(error)
    }
}

instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;
        return response.data;
    },
);

instance.interceptors.request.use(async (config) => {
    let state = reduxStore.getState();
    let currentDate = new Date();
    if (state && state.user && state.user.accessToken && state.user.accessToken.trim().length > 0) {
        const decodeToken = jwt_decode(state.user.accessToken);
        if (decodeToken && decodeToken.exp * 1000 < currentDate.getTime()) {
            let res = await refreshToken(state.user.refreshToken);
            config.headers["Authorization"] = res.data.accessToken;
        } else {
            config.headers["Authorization"] = state.user.accessToken
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error)
}
);
export default instance;
