//Login
export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleLogin {
  email: string
}

export interface RegistrationRequest {
  name: string;
  email: string
  phone: string
  password:string
  confirmPassword:string
}

export interface adminRegRequest {
  email: string;
  password: string;
  confirmPassword:string
}

export interface MobileVerificationReuest {
  phone:string;
}

export interface OtpVerificationRequest {
  otp:number;
}

export interface PasswordChangingRequest {
  password: string;
  confirmPassword: string
}






