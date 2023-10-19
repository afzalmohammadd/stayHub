import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminRegValidationSchema } from "../util/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { adminRegRequest } from "../types/PayloadInterface";
import { toast } from "react-toastify";
import { adminReg } from "../API/adminRoutes";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<adminRegRequest>({
    resolver: yupResolver(adminRegValidationSchema),
  });

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

  const submitHandler = async (formData: adminRegRequest) => {
    console.log(formData, "ckckckck");

    adminReg(formData)
      .then((response) => {
        notify("Registration success", "success");
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };

  return (
    <div>
      <div className="w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="w-11/12 max-w-md bg-teal-500 flex flex-col p-6 justify-between items-center rounded-lg h-[70vh] shadow-2xl">
          <h1 className="text-4xl text-white font-semibold mb-4 pt-4">
            Admin Signup
          </h1>

          <div className="w-full flex flex-col space-y-4">
            <div className="w-full flex flex-col mb-4">
              <h3 className="text-3xl font-semibold mb-2 text-white">
                Create an Admin Account
              </h3>
              <p className="text-base text-white">
                Welcome to StayHub.com! Please fill in the details to create
                your admin account.
              </p>
            </div>

            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="w-full flex flex-col space-y-4">
                <input
                  {...register("email")}
                  className="w-full text-white py-2 bg-teal-500 border-b border-white outline-none focus:outline-none pl-2"
                  type="text"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                <input
                  {...register("password")}
                  className="w-full text-white py-2 bg-teal-500 border-b border-white outline-none focus:outline-none pl-2"
                  type="password"
                  placeholder="Create a Password"
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
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="w-full flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-white">
                  Already have an account?{" "}
                  <button
                    className="underline underline-offset-2"
                    type="button"
                  >
                    Log in
                  </button>
                </p>
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  type="submit"
                  className="w-full bg-white font-semibold text-teal-500 rounded-md p-4 text-center"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="w-full mb-4">
              <p className="text-sm font-normal text-white pb-4">
                By signing up, you agree to our{" "}
                <button
                  className="font-semibold underline underline-offset-2"
                  type="button"
                >
                  Terms and Conditions
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
