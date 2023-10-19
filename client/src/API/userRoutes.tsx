import axios, { AxiosResponse, AxiosError } from "axios";
import { LoginRequest,RegistrationRequest,GoogleLogin } from "../types/PayloadInterface"

// userLogin
interface LoginResponse {
  user : any
  token: string;
}

export const userLogin = async (
  values: LoginRequest
): Promise<LoginResponse > => {
  console.log("entering to userLogin API function");
  
  try {
    console.log("jkjkjkjkjkjkjk");
    
    const response: AxiosResponse<LoginResponse> = await axios.post(      
      "http://localhost:5000/Login",
      values
    );

    return response.data; 
  } catch (error) {
    console.log("Error when User Login:",error);
    
    
    throw error;
  }
};
 
// Google Auth

export const googleLogin = async (
  values:any
): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      "http://localhost:5000/GoogleLogin",
      values
    );

    return response.data;
  } catch (error) {
    console.log("Error when Google Login:", error);
    throw error;
  }
}

// userRegistration
interface RegistrationResponse {
  user:any
} 

export const  userReg = async (
  values: RegistrationRequest
): Promise<RegistrationResponse | undefined> => {
  try {
    const response: AxiosResponse<RegistrationResponse> = await axios.post(
      "http://localhost:5000/Register",
      values
    )

    return response.data;
  } catch (error) {
    console.log("Error when user Registration",error);
    
  }
}





