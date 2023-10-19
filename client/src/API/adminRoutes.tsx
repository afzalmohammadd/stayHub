import axios, { AxiosResponse, AxiosError } from "axios";
import { LoginRequest,adminRegRequest } from "../types/PayloadInterface"


// adminLogin

interface LoginResponse {
    admin : any
    token: string;
  }
  
  export const adminLogin = async (
    values: LoginRequest
  ): Promise<LoginResponse > => {
    console.log("entering to adminLogin API function");
    
    try {
      
      const response: AxiosResponse<LoginResponse> = await axios.post(      
        "http://localhost:5000/admin/adminLogin",
        values
      );
  
      return response.data; 
    } catch (error) {
      console.log("Error when User Login:",error);
      
      
      throw error;
    }
  };

  // adminRegistration

  interface RegistrationResponse {
    admin:any
  } 

  export const  adminReg = async (
    values: adminRegRequest
  ): Promise<RegistrationResponse | undefined> => {
    console.log("entering to admin registration");
    
    try {
      const response: AxiosResponse<RegistrationResponse> = await axios.post(
        "http://localhost:5000/admin/adminReg",
        values
      )
  
      return response.data;
    } catch (error) {
      console.log("Error when user Registration",error);
      
    }
  }