import { NextRequest, NextResponse } from 'next/server';
import DBconnect from '../../../../lib/db';
import Device from '../../../../lib/Models/Device';

export const GET = async () => {
    try {
        await DBconnect();

        const body = await Device.find();

        return NextResponse.json(body, { status: 200 });
    } catch (error) {
        console.error("Error fetching body:", error);

        return NextResponse.json({ message: "Failed to fetch body." }, { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
        await DBconnect();

        const newDevice = await req.json();
        console.log("Device to save:", newDevice);

        const savedDevice = await Device.insertMany(newDevice);

        return NextResponse.json({ savedDevice }, { status: 200 });
    } catch (error: any) {
        console.error("Error saving body:", error.message);
        return NextResponse.json(
            { message: "Failed to save body.", error: error.message },
            { status: 500 }
        );
    }
};