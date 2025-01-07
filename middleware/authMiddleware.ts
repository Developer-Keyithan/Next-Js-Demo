import { NextResponse } from 'next/server';
import { verifyToken } from '../lib/auth';

export async function authMiddleware(req: any) {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const user = verifyToken(token);

    if (!user) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    req.user = user;

    return NextResponse.next();
}
