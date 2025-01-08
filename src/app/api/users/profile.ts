import { NextApiResponse } from 'next';
import { authMiddleware } from '../../../../middleware/authMiddleware';

const profileHandler = async (req: any, res: NextApiResponse) => {
    await authMiddleware(req); 

    const { user } = req;

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    return res.status(200).json({ message: 'User profile', user });
};

export default profileHandler;
