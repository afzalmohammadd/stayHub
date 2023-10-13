import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userRegisterValidationSchema } from "../util/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegistrationRequest } from "../types/PayloadInterface";
import { toast } from "react-toastify";
import { userReg } from "../API/userRoutes";

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationRequest>({
    resolver: yupResolver(userRegisterValidationSchema),
  });

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

  const submitHandler = async (formData: RegistrationRequest) => {
    console.log(formData, "ckckckck");

    userReg(formData)
      .then((response) => {
        notify("Registration success", "success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };
  return (
    <div>
      <div className="w-full min-h-screen h-full flex items-start pl-56 pr-56 overflow-hidden">
        <div className="relative w-1/2 h-screen flex flex-col ">
          <div className="absolute top-[20%] left-[10%] flex flex-col">
            <h1 className="text-4xl text-white font-extrabold my-4">
              Welcome to Your Dream Getaway
            </h1>
            <p className=" text-xl text-white font-normal">
              Sign Up and Let the Experience Begin
            </p>
          </div>
          <img
            src="Login.png"
            className="w-full h-full object-cover rounded-tl-3xl rounded-bl-3xl shadow-2xl "
            alt=""
          />
        </div>
        <div className="w-1/2 h-screen  bg-[#f5f5f5] flex flex-col p-20 justify-between items-center rounded-tr-3xl rounded-br-3xl shadow-2xl">
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col mb-2">
              <h3 className="text-3xl font-semibold mb-2">Create an Account</h3>
              <p className="text-base mb-2">
                Please enter your details to register.
              </p>
            </div>

            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="w-full flex flex-col">
                <input
                  {...register("name")}
                  className="w-full text-black py-2 my-2 bg-none border-b border-black outline-none focus:outline-none pl-2"
                  type="text"
                  placeholder="Full Name"
                />
                {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}

                <input
                  {...register("email")}
                  className="w-full text-black py-2 my-2 bg-none border-b border-black outline-none focus:outline-none pl-2"
                  type="text"
                  placeholder="Enter your email"
                />
                {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                <input
                  {...register("phone")}
                  className="w-full text-black py-2 my-2 bg-none border-b border-black outline-none focus:outline-none pl-2"
                  type="text"
                  placeholder="Phone Number"
                />
                {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}

                <input
                  {...register("password")}
                  className="w-full text-black py-2 my-2 bg-none border-b border-black outline-none focus:outline-none pl-2"
                  type="password"
                  placeholder="Password"
                />
                {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
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

              

              <div className="w-full flex flex-col my-4">
                <button
                  type="submit"
                  className="w-full bg-black my-2 font-semibold text-white rounded-md p-4 text-center flex items-center justify-center"
                >
                 Register
                </button>
              </div>
            </form>

            <div className="w-full flex items-center justify-center relative py-2">
              <div className="w-full h-[1px] bg-black"></div>
              <p className="absolute text-black/80 bg-[#f5f5f5]">OR</p>
            </div>

            <button className="w-full my-2 font-semibold text-black border-black/40 border rounded-md p-4 text-center flex items-center justify-center">
              <img src="google.svg" className="h-6 mr-2" alt="" />
              SIGN UP WITH GOOGLE
            </button>
          </div>

          <div className="w-full">
            <p className="text-sm font-normal text-black">
              Already have an account?{" "}
              <button className="font-semibold underline underline-offset-2">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
