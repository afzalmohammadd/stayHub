import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Reducer/Reducer";
import { LoginRequest } from "../types/PayloadInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { userLoginValidationSchema } from "../util/validation";
import { useEffect } from "react";
import { loginSuccess } from "../Redux/slice/User/userLoginAuthSlice";
import { userLogin } from "../API/userRoutes";
import { setToken } from "../Redux/slice/User/tokenSlice";
import { toast } from "react-toastify";
import { setUserDetails } from "../Redux/slice/User/userDetailsSlice";
import GoogleLoginComponent from "../components/User/googleLogin";

const LoginPage = () => {
  console.log("entering to loginPage");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(
    (state: RootState) => state.userAuth.isLoggedIn
  );

  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(userLoginValidationSchema),
  });

  useEffect(() => {
    if (token) {
      dispatch(loginSuccess());
    }
    if (isLoggedIn === true) {
      navigate("/"); 
    }
  }, [navigate]);

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

  const submitHandler = async (formData: LoginRequest) => {
    console.log(formData,"ckckckck")
    
    userLogin(formData)
      .then((response) => {
        const user = response.user
        const token = response.token;
        dispatch(setToken(token));
        dispatch(loginSuccess());
        const userDetailsData = {
          name: user.Name,
          email: user.Email,
          phone: user.Phone,
        };
        dispatch(setUserDetails(userDetailsData))
        console.log(userDetailsData,"lplplpllplplplplplplplplplplpl");
        

        notify("Login success", "success");
        setTimeout(() => {
          navigate("/"); //to home
        }, 2000);
      })
      .catch((error: any) => {
        console.log(error,"?");
      
        
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
              Log in and Let the Experience Begin
            </p>
          </div>
          <img
            src="Login.png"
            className="w-full h-full object-cover rounded-tl-3xl rounded-bl-3xl shadow-2xl "
            alt=""
          />
        </div>

        <div className="w-1/2 h-screen  bg-[#f5f5f5] flex flex-col p-20 justify-between items-center rounded-tr-3xl rounded-br-3xl shadow-2xl ">
          <h1 className="width-full text-4xl max-w[400px] mx-auto text-[#060606] font-semibold ">
            StayHub
          </h1>

          <div className="w-full flex flex-col ">
            <div className="w-full flex flex-col mb-2">
              <h3 className="text-3xl font-semibold mb-2">Login</h3>
              <p className="text-base mb-2">
                Welcome Back, Please enter your details.
              </p>
            </div>

            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="w-full flex flex-col">
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
                  {...register("password")}
                  className="w-full text-black py-2 my-2 bg-none border-b border-black outline-none focus:outline-none pl-2"
                  type="password"
                  placeholder="Password"
                />
                {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              <div className="w-full flex items-center justify-between">
                <p className="text-sm font-medium">
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
                  className="w-full bg-black my-2 font-semibold text-white rounded-md p-4 text-center flex items-center justify-center"
                >
                  Login
                </button>

                <button
                  className="w-full my-2 font-semibold text-black border-black border rounded-md p-4 text-center flex items-center justify-center"
                  type="button"
                >
                  <Link to="/SignupPage">Register</Link>
                </button>
              </div>
            </form>

            <div className="w-full flex items-center justify-center relative py-2">
              <div className="w-full h-[1px] bg-black"></div>
              <p className=" absolute text-black/80 bg-[#f5f5f5]">OR</p>
            </div>

            <div className="w-full my-2 rounded-md p-4 text-center flex items-center justify-center">
          <GoogleLoginComponent />
        </div>
          </div>

          <div className="w-full">
            <p className="text-sm font-normal text-black">
              Don't have an account?{" "}
              <button className="font-semibold underline underline-offset-2">
              <Link to="/SignupPage">Sign up</Link>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;