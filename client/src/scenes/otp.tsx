import React,{useEffect} from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OtpVerificationRequest } from "../types/PayloadInterface";
import { OtpVerificationValidationSchema } from "../util/validation";
import { otpVer } from "../API/userRoutes";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Reducer/Reducer";


const Otp = () => {
  const navigate = useNavigate();
  const RegPhone = useSelector((state: RootState) => state.authRecovery.phone);
  console.log(RegPhone, "RegPhone");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpVerificationRequest>({
    resolver: yupResolver(OtpVerificationValidationSchema),
  });

  // useEffect(() => {
  //   // Initialize toast configuration
  //   toast.configure();
  // }, []);

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

  const submitHandler = async (formData: OtpVerificationRequest) => {
    
    const dataToSend = {
      ...formData,
      phone: RegPhone // Assuming the field name for phone in backend is 'phone'
    };

    otpVer(dataToSend)
      .then((response) => {
        console.log("inside Otp");

        if (response.verified === true) {
          console.log("Otp verifying success");
          notify("Otp success", "success");

          setTimeout(() => {
            navigate("/forgotpass");
          }, 2000);
        } else {
          console.log("otp verification failed");
          notify("Phone number is not valid", "error");
        }
      })
      .catch((error: any) => {
        console.log(error, "?");
        notify(error.message, "error");
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r">
        <div className="bg-white p-8 rounded-md shadow-lg">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Enter OTP</h1>
          <p className="text-lg text-gray-600 mb-6">We've sent you a one-time password.</p>
          <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col items-center">
            <input
              {...register("otp")}
              className="w-full max-w-md text-gray-800 py-2 px-4 border rounded mb-4 outline-none focus:ring focus:ring-blue-300"
              type="number"
              placeholder="Enter OTP"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm">{errors.otp.message}</p>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white rounded-full p-3 w-36 text-center font-semibold hover:bg-blue-600 transition-colors duration-300"
            >
              Verify OTP
            </button>
          </form>
          <p className="text-sm mt-4 text-gray-600">
            <Link to="/SignupPage" className="text-blue-500 underline">
              Don't have an account? Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;
