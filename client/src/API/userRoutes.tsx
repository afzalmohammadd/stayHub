import axios, { AxiosResponse, AxiosError } from "axios";
import { LoginRequest,RegistrationRequest,GoogleLogin,MobileVerificationReuest,OtpVerificationRequest,
PasswordChangingRequest } from "../types/PayloadInterface"

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

// Mobile Verification
interface MobileVerificationResponse {
  verified : boolean;
  phone: number
}

export const mobileVer = async (
  values: MobileVerificationReuest
): Promise<MobileVerificationResponse > => {
  console.log("entering to Mobile Verification API function");
  
  try {
    const response: AxiosResponse<MobileVerificationResponse> = await axios.post(      
      "http://localhost:5000/MobileVer",
      values
    );

    console.log("Response from API:", response.data);
    
    if (response.data.verified === true) {
      return response.data;
    } else {
      throw new Error("Phone number is not valid");
      console.log(Error);
      
    }
  } catch (error) {
    console.log("Error when User Login:", error);
    throw error;
  }
}

// Otp Verification
interface OtpVerificationResponse {
  verified : boolean;
}

export const otpVer = async (
  values: OtpVerificationRequest & { phone: string }
): Promise<OtpVerificationResponse > => {
  console.log("entering to Otp Verification API function");
  
  try {
    const response: AxiosResponse<MobileVerificationResponse> = await axios.post(      
      "http://localhost:5000/OtpVer",
      values
    );

    console.log("Response from API:", response.data);
    
    if (response.data.verified === true) {
      return response.data;
    } else {
      throw new Error("OTP check unsuccesfull");
      console.log(Error);
      
    }
  } catch (error) {
    console.log("Error when User Login:", error);
    throw error;
  }
}

// Auth Reset
interface AuthResetResponse {
  verified : boolean
}

export const authReset = async (
  values: PasswordChangingRequest & { phone: string }
): Promise<AuthResetResponse > => {
  console.log("entering to Auth-Reset");
  
  try {
    const response: AxiosResponse<MobileVerificationResponse> = await axios.post(      
      "http://localhost:5000/AuthReset",
      values
    );

    console.log("Response from API:", response.data);
    
    if (response.data.verified === true) {
      return response.data;
    } else {
      throw new Error("Password Changing failed ");
      console.log(Error);
      
    }
  } catch (error) {
    console.log("Error when User Login:", error);
    throw error;
  }
}





