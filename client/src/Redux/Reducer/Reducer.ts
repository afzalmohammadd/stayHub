import { combineReducers } from "redux";
import userLoginAuthSlice from "../slice/User/userLoginAuthSlice";
import userDetailsSlice from "../slice/User/userDetailsSlice";
import adminLoginAuthSlice from "../slice/Admin/adminLoginAuthSlice";

const rootReducer = combineReducers({
    userAuth: userLoginAuthSlice,
    userDetails: userDetailsSlice,
    adminAuth: adminLoginAuthSlice
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;