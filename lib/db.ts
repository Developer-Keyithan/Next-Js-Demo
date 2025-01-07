import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

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
        await mongoose.connect(MONGO_URI, {
            dbName: 'NextJS-database'
        });
        console.log("Successfully connected to the database.");
    } catch (error) {
        console.error("Error connecting to the database:", (error as Error).message);
        process.exit(1);
    }
};

export default DBconnect;
