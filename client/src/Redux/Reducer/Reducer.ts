import { combineReducers } from "redux";
import userLoginAuthSlice from "../slice/User/userLoginAuthSlice";
import userDetailsSlice from "../slice/User/userDetailsSlice";
import adminLoginAuthSlice from "../slice/Admin/adminLoginAuthSlice";
import authRecoverySlice from "../slice/User/authRecoverySlice";

const rootReducer = combineReducers({
    userAuth: userLoginAuthSlice,
    userDetails: userDetailsSlice,
    adminAuth: adminLoginAuthSlice,
    authRecovery: authRecoverySlice
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;