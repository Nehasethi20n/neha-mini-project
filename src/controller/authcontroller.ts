import { Request, Response } from "express";
import * as dotenv from 'dotenv'

import { Sequelize } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/user';

export const login=async (req:Request, res:Response)=>{
    const{email, password}= req.body;
    try{
        const user=await User.findOne({ where: { email } });
        if(!user) {
            return res.sendStatus(404);
        }

            if(await bcrypt.compare(password, user.password)) {
                const accessToken=jwt.sign({"email":user.email},process.env.ACCESS_TOKEN,{expiresIn:'30s'});
            }
            else{
                res.sendStatus(403);
            }
        }
        catch(error)
        {
            console.log("Error in Login", error);
            res.status(500).send('Server error');
        }
    };

