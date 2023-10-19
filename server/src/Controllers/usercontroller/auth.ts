import User from "../../Models/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { Request, Response } from 'express'

export const Register = async (req: Request, res: Response): Promise<any> => {
  console.log("entering to the Registration");
  
  try {

    const { name, email, phone, password } = req.body as {
      name: string;
      email: string;
      phone: string;
      password: string;
    };

    console.log(req.body);
    console.log(password);
    
    

    const existUser = await User.findOne({ email })

    if (existUser) {   
      return res.status(400).json({ message: "Email already exists" })
    }
 
    const salt = await bcrypt.genSalt(10); 
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      Name :name,
      Email :email,
      Password: passwordHash,
      Phone : phone,
    });

    const SaveUser = await newUser.save()

    res.status(201).json({ message: "User registered successfully", user: SaveUser })
    console.log("user registration succesfull S");
    
  } catch (error) {
    
    console.error("gasfjkl",error)
   
    res.status(500).json({ error: "Internal server error" })
  }
}


export const Login = async (req: Request, res: Response): Promise<any> => {
  console.log("entering logginpage of user");
  
    try {
      console.log(req.body);
      
      const { email, password } = req.body
  
      const user = await User.findOne({ Email: email })
      console.log(user);
      
      if (!user) {
        return res.status(400).json({ Login: false, message: "User not found" })
      }

      if (user.block) {
        return res.status(400).json({ Login: false, message: "User is blocked" })
      }
      console.log("1",password,"  2",user.Password);
      console.log(user.Password);
      
      
      const passMatch = await bcrypt.compare(password, user.Password)
  
      if (!passMatch) {
        console.log("password inc");
        
        return res.json({ Login: false, message: "Email and password is incorrect" })
        
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: '1h'});
  
      res.status(200).json({ message: "User Login successful", user: user ,token :token })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  }

  export const GoogleLogin = async (req: Request, res: Response): Promise<any> => {
    console.log("entering Google-loggin of user");
    
      try {
        console.log(req.body);
        
        const { email,name } = req.body
    
        const user = await User.findOne({ Email: email })
        console.log(user);
        
        if (!user) {
          const { name, email} = req.body as {
            name: string;
            email: string;
          }
          
          const newUser = new User({
            Name: name,
            Email: email
          })

          const SaveUser = await newUser.save()

          res.status(201).json({ message: "User registered successfully ", user: SaveUser })
          console.log("user registration succesfull (Google)");
        }else{
          if (user.block) {
            return res.status(400).json({ Login: false, message: "User is blocked" })
          }
    
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h'});
      
          res.status(200).json({ message: "User Google-Login successful", user: user ,token :token })
        }
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
      }
    }
  
