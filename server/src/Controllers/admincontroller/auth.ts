import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt'
import Admin from '../../Models/admin'
import jwt from "jsonwebtoken"

export const adminReg = async (req:Request,res:Response):Promise<any> => {
    try {

      console.log("entering the admin registration function ");
      console.log(req.body);
      
        const {  email, password } = req.body as {     
          email: string;
          password: string;
        };

        console.log(email,password);
        
        
        const existAdmin = await Admin.findOne({ email })
    
        if (existAdmin) {   
          return res.status(400).json({ message: "Email already exists" })
        }
        
     
        const salt = await bcrypt.genSalt(10)
    
        const passwordHash = await bcrypt.hash(password, salt)
    
        const newAdmin = new Admin({
          email: email,
          Password: passwordHash
        });

        console.log(newAdmin,"kikikikik");
        
    
        const SaveAdmin = await newAdmin.save()
    
        res.status(201).json({ message: "admin registered successfully", admin: SaveAdmin })
      } catch (error) {
        
        console.error(error)
       
        res.status(500).json({ error: "Internal server error" })
      }
}


export const adminLogin = async (req: Request, res: Response): Promise<any> => {
  
    try {
      console.log("entering to the admin login function");
      
        const { email, password } = req.body
    
        const admin = await Admin.findOne({ email: email })
    
        if (!admin) {
          return res.status(400).json({ Login: false, message: "Admin does not exist" })
        }
    
        const passMatch = await bcrypt.compare(password, admin.Password)
    
        if (!passMatch) {
          return res.status(400).json({ Login: false, message: "Invalid credentials" })
        }

        const admintoken = jwt.sign({ adminId:admin._id },process.env.JWT_SECRET as string, {
          expiresIn: '1h'})
    
        res.status(200).json({ message: "Admin Login successful", admin: admin , admintoken:admintoken });
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" });
        console.log("err");
        
      }
}
