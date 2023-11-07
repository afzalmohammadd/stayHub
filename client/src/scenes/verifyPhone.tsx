import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MobileVerificationReuest } from "../types/PayloadInterface";
import { phoneVerificationValidationSchema } from "../util/validation";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { mobileVer } from "../API/userRoutes";
import { setPhone } from "../Redux/slice/User/authRecoverySlice";
import { useDispatch } from "react-redux";

const VerifyMobileNumber = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MobileVerificationReuest>({
    resolver: yupResolver(phoneVerificationValidationSchema),
  });

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

  const submitHandler = async (formData: MobileVerificationReuest) => {
    console.log(formData, "ckckckck");

    mobileVer(formData)
      .then((response) => {
        console.log("inside verifyPhone");
        const Phone = response.phone
        console.log(response.phone,"opopop");
        
        if (response.verified === true) {
          
          dispatch(setPhone(Phone))
          console.log("verifying success");
          notify("Login success", "success");

          setTimeout(() => {
            navigate("/otp");
          }, 2000);
        } else {
          console.log("Phone number is not valid");
          notify("Phone number is not valid", "error");
        }
      })
      .catch((error: any) => {
        console.log(error, "?");
        notify(error.message, "error");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-teal-300 to-teal-500">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Verify Mobile Number
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Enter Your Registered Phone Number
        </p>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col items-center"
        >
          <input
            {...register("phone")}
            className="w-full max-w-md text-gray-800 py-2 px-4 border rounded mb-4 outline-none focus:ring focus:ring-teal-300"
            type="text"
            placeholder="Enter Mobile Number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          <button
            type="submit"
            className="bg-teal-500 text-white rounded-full p-3 w-36 text-center font-semibold hover:bg-teal-600 transition-colors duration-300"
          >
            Verify Mobile
          </button>
        </form>
        <p className="text-sm mt-4 text-gray-600">
          <Link to="/SignupPage" className="text-teal-500 underline">
            Don't have an account? Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyMobileNumber;
