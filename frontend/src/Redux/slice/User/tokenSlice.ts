import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { log } from "console";
import { get } from "http";

interface tokenState {
    token: string | null
}

const loadTokenFromLocalStorage = (): string | null => {
    try{
        const getToken = localStorage.getItem("token")
        return getToken ? getToken:null
    } catch (error) {
        console.log("Error loading token from local storage:",error)
        return null
    }
}

const initialState: tokenState ={
    token: loadTokenFromLocalStorage()
}

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken :(state,action:PayloadAction<string>) => {
            state.token = action.payload
            try{
                localStorage.setItem("token", action.payload)
            }catch (error) {
                console.log("Error when storin token in localStorage:",error)
            }
        },
        clearToken: (state) => {
            state.token = null
            try {
                localStorage.removeItem("token")
            }catch(error){
                console.log("Error when removing token from localStorage:",error);
                
            }
        }
    }
})

export const { setToken,clearToken } = tokenSlice.actions
export default tokenSlice.reducer