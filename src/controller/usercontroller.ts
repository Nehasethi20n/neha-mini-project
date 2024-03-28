import { Request,Response } from "express";
import { Sequelize } from 'sequelize';
import User from '../model/user';

export const createUser=async(req:Request,res:Response)=>{
    try{
        const { firstname,lastname,email,password }= req.body;

        const existingUser=await User.findOne({where:{email}});
        if(existingUser){
            return res.status(400).json({message:"User already existes"});
        }

const newUser=await User.create({firstname,lastname,email,password });
return res.status(201).json({newUser});
    }
    catch(error)
    {
        console.error('Error creating user',error);
        return res.status(500).json({message: 'Server error'});
    }
    };