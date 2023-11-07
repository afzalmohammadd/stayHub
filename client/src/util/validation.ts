import * as yup from "yup"

export const userRegisterValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]*$/, "Enter a valid name"),
    email: yup.string().required("Email is required").email("Invalid email"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^\d{10}$/, "Enter a valid 10-digit phone number"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: yup
      .string()
      .required("Re-enter the password to confirm ")
      .oneOf([yup.ref("password")], "Password does not match"),
  });

  export const userLoginValidationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 character long"),
  });

  export const adminRegValidationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: yup
      .string()
      .required("Re-enter the password to confirm ")
      .oneOf([yup.ref("password")], "Password does not match"),
  });

  export const adminLoginValidationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 character long"),
  });

  export const phoneVerificationValidationSchema = yup.object().shape({
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  });


  export const OtpVerificationValidationSchema = yup.object().shape({
    otp: yup
      .number()
      .required("OTP is required")
      .integer("OTP must be an integer")
      .positive("OTP must be a positive number")
      .test('is-six-digits', 'OTP must be exactly 6 digits', value => value.toString().length === 6)
  });

  export const passwordValidationSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: yup
      .string()
      .required("Re-enter the password to confirm")
      .oneOf([yup.ref("password")], "Password does not match"),
  });


  