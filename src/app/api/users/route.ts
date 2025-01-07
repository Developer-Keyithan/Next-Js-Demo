import { NextRequest, NextResponse } from 'next/server';
import DBconnect from '../../../../lib/db';
import User from '../../../../lib/Models/User';

export const GET = async () => {
    try {
        await DBconnect();

        const body = await User.find();

        return NextResponse.json(body, { status: 200 });
    } catch (error) {
        console.error("Error fetching body:", error);

        return NextResponse.json({ message: "Failed to fetch body." }, { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
        await DBconnect();

        const newUser = await req.json();
        console.log("User to save:", newUser);

        const createUser = await User.insertMany(newUser);

        return NextResponse.json({ createUser }, { status: 200 });
    } catch (error: any) {
        console.error("Error saving body:", error.message);
        return NextResponse.json(
            { message: "Failed to save body.", error: error.message },
            { status: 500 }
        );
    }
};


// export const PATCH = async (req: Request, res: NextResponse) {
//     try {
//         await DBconnect();

//         const { searchParams } = new URL(req.url);
//         const id = searchParams.get('id');

//         const update = await req.json();
//         console.log("User to update:", update);

//         const updatedDevice = await User.findByIdAndUpdate(id, update);

//         return NextResponse.json({ updatedDevice }, { status: 201 });
//     } catch (error: any) {
//         return NextResponse.json({ message: "Failed to fetch body." }, { status: 500 });
//     }
// }

export const DELETE = async (req: NextRequest) => {
    try {
        await DBconnect();

        const id = req.nextUrl.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }
        const device = await User.findByIdAndDelete(id);

        if (!device) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User deleted successfully', device }, { status: 200 });
    } catch (error) {
        console.error('Error deleting device:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};