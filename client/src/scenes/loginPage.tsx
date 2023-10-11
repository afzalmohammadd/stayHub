import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../Redux/Reducer/Reducer';
import { LoginRequest } from '../types/PayloadInterface';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { userLoginValidationSchema } from '../util/validation';
import { useEffect } from 'react';
import { loginSuccess } from '../Redux/slice/User/userLoginAuthSlice';
import { userLogin } from '../API/userRoutes';
import { setToken } from '../Redux/slice/User/tokenSlice';
import { toast } from 'react-toastify';




const LoginPage = () => {
  console.log("entering to loginPage");
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoggedIn = useSelector(
    (state:RootState) => state.userAuth.isLoggedIn
  )

  const token = localStorage.getItem("token")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(userLoginValidationSchema),
  });
  

  useEffect(()=>{
    if(token){
      dispatch(loginSuccess())
    }
    if(isLoggedIn === true){
      navigate("/homepage") //to homePage
    }
  }, [navigate] )

  const notify = (msg: string, type: string) =>
  type === "error"
    ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
    : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

  const submitHandler = async (formData: LoginRequest) => {
    userLogin(formData)
    .then((response)=> {
      const token = response.token
      dispatch(setToken(token))
      dispatch(loginSuccess())

      notify("Login success", "success");
      setTimeout(()=>{
        navigate("/homepage") //to home
      },2000)
    })
    .catch((error:any) => {
      
      notify(error.message,"error")
    })
  }

  return (
    <div>
      <h1>Login page</h1>
      <h1></h1>
    </div>
  )
}

export default LoginPage
