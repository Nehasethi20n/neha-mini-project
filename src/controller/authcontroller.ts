import { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/user';
const secret:string=process.env.ACCESS_TOKEN||'default-secret';

export const login=async (req:Request, res:Response)=>{
    const{email, password}= req.body;
    try{
        const user=await User.findOne({ where: { email } });
        if(!user) {
            return res.status(404).json({messsage:"User not found"});
        }

         const validPass=await bcrypt.compare(password, user.password);
        console.log(user.password);
        
            if(!validPass){ 
             
                return res.status(401).json({messsage:"Password not valid"});
            }
            const accessToken=jwt.sign({"email":user.email},secret,{expiresIn:'3600s',});
    
            return res.json(accessToken);
    }
        catch(error)
        {
            console.log("Error in Login", error);
            return res.status(500).send('Server error');
        }
    };

