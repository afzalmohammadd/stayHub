import User from "../../Models/user";
import { sentOtp, verifyOtp } from "../../utils/twillio/twillio";
import bcrypt from "bcrypt";
import { IUser } from "../../Models/user";



import { Request, Response } from 'express';

export const MobileVerification = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Entering mobileverification in server");
        const phoneNumber = req.body.phone;

        const user = await User.findOne({ Phone: phoneNumber }).exec();
        if (user) {
            console.log("Found the user");
            const numericPhoneNumber: number = parseInt(phoneNumber);
            const result = await sentOtp( numericPhoneNumber)
            console.log("otp recieved succesfully");
            res.json({ verified: true, phone:phoneNumber})
            
            
            
        } else {

            console.log("User does not exist with this phone");
            res.json({ verified: false });
        }
    } catch (error) {
        // Handle errors here, and respond with an error status
        console.error('Error during mobile verification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const otpVerifyingForPass = async (req: Request, res: Response): Promise<void> => {
    try {
        const otp = req.body.otp;
        const phone = req.body.phone;

        console.log(otp, "otp");
        console.log(phone, "phone");

        const status = await verifyOtp(phone, otp);

        if (status) {
            console.log("otp verification succesfully");
            res.json({ verified: true})
            
        } else {
            console.log("otp verification failed");
            res.json({ verified: false})
        }
    } catch (error) {
        console.error("error--->",error);
    }
};

export const AuthReset = async (req: Request, res: Response): Promise<void> => {
    try {
        const { password, phone } = req.body;

        const user = await User.findOne({ Phone: phone });

        if (user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const updatedUser = await User.findByIdAndUpdate(user._id, { Password: hashedPassword }, { new: true });

            if (updatedUser) {
                res.json({ verified: true });
            } else {
                res.status(500).json({ error: "Password update failed" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("error--->", error);
        res.status(500).json({ error: "Server error" });
    }
};