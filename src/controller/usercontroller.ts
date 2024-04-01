import { Request, Response } from "express";
import { Sequelize } from 'sequelize';
import User from '../model/user';
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const secretKey='2a9322e3b32847c91bd8d9f7ade496f7fe14ef79b2e2d4dbf0cc53ebae20d3c32a7d4e9a8b6932513aef15309f11fafb39601f183b927d4d4ce4f167b8a4891c'

export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already existes" });
        }
    const hashedPwd=await bcrypt.hash(password,10);
    // console.log(hashedPwd);
    
    const newUser =User.create({ firstName, lastName, email,password:hashedPwd});
        return res.status(201).json({ newUser });
    }
    catch (error) {
        console.error('Error creating user', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const getUser = async (req: Request, res: Response) => {
	try {
		console.log('welcome');

		const userId = req.query.id;
		console.log(req.params);

		console.log(userId);
		const user = await User.findByPk(userId?.toString());

		console.log(user);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.json(user);
	} catch (error) {
		console.error('Error creating user', error);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const userId = req.query.id;
		const { firstName, lastName, email } = req.body;
		const user = await User.findByPk(userId?.toString());
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		await user.update({ firstName, lastName, email });
		res.json({ message: 'User details updated' });
	} catch (error) {
		console.error('Error updating user', error);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const userId = req.query.id;
		const user = await User.findByPk(userId?.toString());
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		await user.destroy();
		res.json({ message: 'User deleted' });
	} catch (error) {
		console.error('Error deleting user', error);
		return res.status(500).json({ message: 'Server error' });
	}
};
module.exports = { createUser, getUser, updateUser, deleteUser };
