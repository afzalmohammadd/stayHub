import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt'
import Admin from '../../Models/admin'

export const adminReg = async (req:Request,res:Response):Promise<any> => {
    try {

        const {  Email, Password } = req.body as {     
          Email: string;
          Password: string;
        };
    
        const existAdmin = await Admin.findOne({ Email })
    
        if (existAdmin) {   
          return res.status(400).json({ msg: "Email already exists" })
        }
     
        const salt = await bcrypt.genSalt()
    
        const passwordHash = await bcrypt.hash(Password, salt)
    
        const newAdmin = new Admin({
          Email,
          Password: passwordHash,
        });
    
        const SaveAdmin = await newAdmin.save()
    
        res.status(201).json({ msg: "User registered successfully", user: SaveAdmin })
      } catch (error) {
        
        console.error(error)
       
        res.status(500).json({ error: "Internal server error" })
      }
}


export const adminLogin = async (req: Request, res: Response): Promise<any> => {
  
    try {
        const { Email, Password } = req.body
    
        const admin = await Admin.findOne({ Email: Email })
    
        if (!admin) {
          return res.status(400).json({ Login: false, msg: "Admin does not exist" })
        }
    
        const passMatch = await bcrypt.compare(Password, admin.Password)
    
        if (!passMatch) {
          return res.status(400).json({ Login: false, msg: "Invalid credentials" })
        }
    
        res.status(200).json({ msg: "Admin Login successful", admin: admin })
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
      }
}
