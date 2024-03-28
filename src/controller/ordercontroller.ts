import { Request,Response } from "express";
import { Sequelize } from 'sequelize';
import Order from '../model/order';

export const createOrder=async(req:Request,res:Response)=>{
    try
    {
        const { id,user_id,amount}= req.body;
        const order=await Order.create({id,user_id,amount});
        res.status(201).json(Order);
    }
    catch(err)
    {
     console.error('Error creating order:',console.error);
     res.status(500).json({message:"Internal server error"});
    }
};