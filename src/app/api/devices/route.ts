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


export const PATCH = async (req: Request, res: NextResponse) {
    try {
        await DBconnect();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        const update = await req.json();
        console.log("Device to update:", update);

        const updatedDevice = await Device.findByIdAndUpdate(id, update);

        return NextResponse.json({ updatedDevice }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: "Failed to fetch body." }, { status: 500 });
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        await DBconnect();

        const id = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'Device ID is required' }, { status: 400 });
        }
        const device = await Device.findByIdAndDelete(id);

        if (!device) {
            return NextResponse.json({ error: 'Device not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Device deleted successfully', device }, { status: 200 });
    } catch (error) {
        console.error('Error deleting device:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
