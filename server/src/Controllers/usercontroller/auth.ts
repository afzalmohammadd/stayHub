import User from "../../Models/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { Request, Response } from 'express'

export const Register = async (req: Request, res: Response): Promise<any> => {
  try {

    const { Name, Email, Phone, Password } = req.body as {
      Name: string;
      Email: string;
      Phone: string;
      Password: string;
    };

    const existUser = await User.findOne({ Email })

    if (existUser) {   
      return res.status(400).json({ msg: "Email already exists" })
    }
 
    const salt = await bcrypt.genSalt()

    const passwordHash = await bcrypt.hash(Password, salt)

    const newUser = new User({
      Name,
      Email,
      Password: passwordHash,
      Phone,
    });

    const SaveUser = await newUser.save()

    res.status(201).json({ msg: "User registered successfully", user: SaveUser })
  } catch (error) {
    
    console.error(error)
   
    res.status(500).json({ error: "Internal server error" })
  }
}


export const Login = async (req: Request, res: Response): Promise<any> => {
    try {
      const { Email, Password } = req.body
  
      const user = await User.findOne({ Email: Email })
  
      if (!user) {
        return res.status(400).json({ Login: false, msg: "User does not exist" })
      }
  
      if (user.block) {
        return res.status(400).json({ Login: false, msg: "User is blocked" })
      }
  
      const passMatch = await bcrypt.compare(Password, user.Password)
  
      if (!passMatch) {
        return res.status(400).json({ Login: false, msg: "Invalid credentials" })
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: '1h'});
  
      res.status(200).json({ msg: "User Login successful", user: user ,token :token })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  }

  
