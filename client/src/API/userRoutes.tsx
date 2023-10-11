import axios, { AxiosResponse, AxiosError } from "axios";
import { LoginRequest } from "../types/PayloadInterface"

// userLogin
interface LoginResponse {
  user : any
  token: string;
}

export const userLogin = async (
  values: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      "http://localhost:5000/Login",
      values
    );

    return response.data; // Assuming the response contains data field with token
  } catch (error) {
    console.log("Error when User Login:",error);
    
    
    throw error;
  }
};

