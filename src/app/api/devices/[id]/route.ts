import { NextRequest, NextResponse } from 'next/server';
import DBconnect from '../../../../../lib/db';
import Device from '../../../../../lib/Models/Device';

export const PATCH = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;
    const data = await request.json();

    if (!id || !data) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    try {
        await DBconnect();

        const updatedDevice = await Device.findByIdAndUpdate(id, data, { new: true });

        if (!updatedDevice) {
            return NextResponse.json({ error: 'Device not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Device updated successfully', device: updatedDevice });
    } catch (error: any) {
        console.error('Error updating device:', error);

        return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
    }
};

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> => {
    try {
        await DBconnect();

        const { id } = params;
        const data = await req.json();

        if (!id || !data) {
            return NextResponse.json({ error: 'Invalid request: Device ID or data is missing' }, { status: 400 });
        }

        const updatedDevice = await Device.findByIdAndUpdate(id, data, { new: true });

        if (!updatedDevice) {
            return NextResponse.json({ error: 'Device not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Device updated successfully', device: updatedDevice }, { status: 200 });
    } catch (error) {
        console.error('Error updating device:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> => {
    try {
        await DBconnect();

        const { id } = params;

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

export const GET = async (req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> => {
    try {
        await DBconnect();

        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: 'Device ID is required' }, { status: 400 });
        }

        const device = await Device.findById(id);

        if (!device) {
            return NextResponse.json({ error: 'Device not found' }, { status: 404 });
        }

        return NextResponse.json({ device }, { status: 200 });
    } catch (error) {
        console.error('Error fetching device:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};