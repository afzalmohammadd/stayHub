import React, { useEffect } from 'react';
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { googleLogin } from '../../API/userRoutes';
import { setToken } from '../../Redux/slice/User/tokenSlice';
import { loginSuccess } from '../../Redux/slice/User/userLoginAuthSlice';
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from '../../Redux/slice/User/userDetailsSlice';
import { Link, useNavigate } from "react-router-dom";
import { RootState } from '../../Redux/Reducer/Reducer';

const GoogleLoginComponent: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector(
        (state: RootState) => state.userAuth.isLoggedIn
      );
    const token = localStorage.getItem("token")

    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        if (typeof credentialResponse.credential === "string") {
            const decoded = jwt_decode(credentialResponse.credential)
            console.log(decoded, "52525225252")
            
            googleLogin(decoded)
            
                .then((response) => {
                    console.log("stp",decoded);
                    
                    const user = response.user;
                    const token = response.token;
                    dispatch(setToken(token));
                    dispatch(loginSuccess());
                    const userDetailsData = {
                        name: user.Name,
                        email: user.Email,
                        phone: user.Phone,
                    };
                    dispatch(setUserDetails(userDetailsData));

                    navigate("/");
                })
                .catch((error) => {
                    console.log("Error during Google login:", error);
                    // Handle the error as needed
                });
        }
    }

    const handleError = () => {
        console.log("Login Failed");
    }

    return (
        <div>
            <GoogleOAuthProvider clientId='286927096637-kat6aognhbkffjtsiticpu4v38d6rdfr.apps.googleusercontent.com'>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                />
            </GoogleOAuthProvider>
        </div>
    );
};

export default GoogleLoginComponent;
