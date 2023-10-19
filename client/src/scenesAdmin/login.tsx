import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { RootState } from "../Redux/Reducer/Reducer";
import { LoginRequest } from "../types/PayloadInterface";
import { adminLoginValidationSchema } from "../util/validation";
import { loginSuccess } from "../Redux/slice/Admin/adminLoginAuthSlice";
import { setToken } from "../Redux/slice/Admin/adminTokenSlice";
import { adminLogin } from "../API/adminRoutes";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(
    (state: RootState) => state.adminAuth.isLoggedIn
  );

  const token = localStorage.getItem("admintoken");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(adminLoginValidationSchema),
  });

  useEffect(() => {
    if (token) {
      dispatch(loginSuccess());
    }
    if (isLoggedIn === true) {
      navigate("/admin-dashboard"); //to homePage
    }
  }, [navigate]);

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

  const submitHandler = async (formData: LoginRequest) => {
    console.log(formData, "ckckckck");

    adminLogin(formData)
      .then((response) => {
        const admin = response.admin;
        const token = response.token;
        dispatch(setToken(token));
        dispatch(loginSuccess());

        notify("Login success", "success");
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 2000);
      })
      .catch((error: any) => {
        console.log(error, "?");

        notify(error.message, "error");
      });
  };
  return (
    <div>
      <div className="w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="w-11/12 max-w-md bg-teal-500 flex flex-col p-6 justify-between items-center rounded-lg h-[70vh] shadow-2xl">
          <h1 className="text-4xl text-white font-semibold mb-4 pt-4 ">
            StayHub.com
          </h1>

          <div className="w-full flex flex-col space-y-4">
            <div className="w-full flex flex-col mb-4">
              <h3 className="text-3xl font-semibold mb-2 text-white  ">
                Admin Login
              </h3>
              <p className="text-base text-white">
                Welcome Back, Please enter the credentials.
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
                  placeholder="Password"
                />
                {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              <div className="w-full flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-white">
                  <button
                    className="underline underline-offset-2"
                    type="button"
                  >
                    Forgot password?
                  </button>
                </p>
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  type="submit"
                  className="w-full bg-white font-semibold text-teal-500 rounded-md p-4 text-center"
                >
                  Login
                </button>
              </div>
            </form>

            <div className="w-full mb-4">
              <p className="text-sm font-normal text-white pb-4">
                <Link to="/registerAdmin">Don't have an account?</Link>
                <button className="font-semibold underline underline-offset-2"></button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
