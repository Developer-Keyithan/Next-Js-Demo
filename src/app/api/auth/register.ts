import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User from '../../../../lib/Models/User';

const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds

        // Create a new user with the hashed password
        const newUser = new User({
            name,
            email,
            password: hashedPassword,  // Store the hashed password
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    }

    res.status(405).json({ error: 'Method Not Allowed' });
};

export default registerHandler;
