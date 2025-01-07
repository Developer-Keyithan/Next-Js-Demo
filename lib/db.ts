import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

const DBconnect = async () => {
    const databaseStatus = mongoose.connection.readyState;

    if (databaseStatus === 0) {
        console.log("Database disconnected");
    }
    
    if (databaseStatus === 1) {
        console.log("Database connected successfully");
    }
    
    if (databaseStatus === 2) {
        console.log("Connecting to the database...");
    }

    try {
        await mongoose.connect(MONGO_URI!, {
            dbName: 'NextJSAPI',
            bufferCommands: true
        });
        console.log("Successfully connected to the database.");
    } catch (error: any) {
        console.error("MongoDB connection error:", error);
        throw new Error("MongoDB connection error:", error);
    }
};

export default DBconnect;
