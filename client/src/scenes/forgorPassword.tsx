import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { PasswordChangingRequest } from "../types/PayloadInterface";
import { passwordValidationSchema } from "../util/validation";
import { RootState } from "../Redux/Reducer/Reducer";
import { useSelector } from "react-redux";
import { authReset } from "../API/userRoutes";

function ForgotPassword() {
  const navigate = useNavigate();

  const RegPhone = useSelector((state: RootState) => state.authRecovery.phone)
  console.log(RegPhone,"REG");
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordChangingRequest>({
    resolver: yupResolver(passwordValidationSchema),
  });

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

  const submitHandler = async (formData: PasswordChangingRequest) => {

    const dataToSend = {
      ...formData,
      phone: RegPhone // Assuming the field name for phone in backend is 'phone'
    };

    authReset(dataToSend)
      .then((response) => {
        console.log("inside passwordChange");

        if (response.verified === true) {
          console.log("Reset Password Successfully");
          notify("Password changed", "success");

          setTimeout(() => {
            navigate("/login");
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
    <div className="w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="w-1/2 max-w-screen-md bg-gray-200 flex flex-col p-8 lg:p-16 justify-center items-center rounded-md shadow-2xl">
        <h1 className="text-4xl text-gray-900 font-semibold mb-4 text-center">
          StayHub
        </h1>

        <div className="w-full flex flex-col items-center">
          <h3 className="text-3xl font-semibold mb-2">Forgot Password</h3>
          <p className="text-base mb-4 text-center">
            Please enter your new password.
          </p>

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="w-full max-w-xs lg:max-w-md"
          >
            <div className="w-full flex flex-col mb-2">
              <input
                {...register("password")}
                className="w-full text-black py-2 my-2 bg-none border-b border-black outline-none focus:outline-none pl-2"
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <input
                {...register("confirmPassword")}
                className="w-full text-black py-2 my-2 bg-none border-b border-black outline-none focus:outline-none pl-2"
                type="password"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="w-full flex flex-col items-center">
              <button
                type="submit"
                className="w-full bg-black my-2 font-semibold text-white rounded-md p-3"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
