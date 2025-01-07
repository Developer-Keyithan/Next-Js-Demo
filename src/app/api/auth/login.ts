import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User from '../../../../lib/Models/User';
import { generateToken } from '../../../../lib/auth';

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user._id.toString());

        return res.status(200).json({ message: 'Login successful', token });
    }

    res.status(405).json({ error: 'Method Not Allowed' });
};

export default loginHandler;
