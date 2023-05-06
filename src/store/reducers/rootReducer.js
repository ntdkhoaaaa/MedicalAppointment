import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import doctorReducer from './doctorReducer';
import clinicAccountantReducer from './clinicAccountantReducer';
import hospitalAccountantReducer from './hospitalAccountantReducer';
import hospitalDoctorReducer from './hospitalDoctorReducer';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo', 'accessToken', 'refreshToken']
};
const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whileList: ['language','systemMenuPath']
}

export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    admin: adminReducer,
    doctor:doctorReducer,
    clinicAccountant:clinicAccountantReducer,
    hospitalAccountant:hospitalAccountantReducer,
    hospitalDoctor:hospitalDoctorReducer

})