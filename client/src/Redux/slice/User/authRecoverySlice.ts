import { createSlice } from "@reduxjs/toolkit";

const authRecoverySlice = createSlice({
    name:"authRecovery",
    initialState: {
        phone: ""
    },
    reducers: {
        setPhone:(state, action) => {
            const phone = action.payload
            state.phone = phone

            console.log("Updated state:", state.phone);
        }
    }
})

export const { setPhone } = authRecoverySlice.actions
export default authRecoverySlice.reducer