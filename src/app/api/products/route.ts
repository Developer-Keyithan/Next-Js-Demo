import { NextResponse } from 'next/server';
import DBconnect from '../../../../lib/db';
import Product from '../../../../lib/Models/Device';

export const GET = async () => {
    try {
        await DBconnect();

        const products = await Product.find();

        return NextResponse.json({products}, {status: 200});
    } catch (error) {
        console.error("Error fetching products:", error);

        return NextResponse.json({message: "Failed to fetch products." }, { status: 500 });
    }
};

export const POST = async (req: any) => {
    try {
        await DBconnect();

        const body = await req.json();
        const { products } = body;

        const savedProducts = await Product.bulkSave(products); 

        return new Response(JSON.stringify(savedProducts), { status: 200 });
    } catch (error) {
        
    }
}

// export const PATCH = async 