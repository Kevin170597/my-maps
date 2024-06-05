import mongoose, { connect } from "mongoose";
import { MONGO_URL } from "$env/static/private";

const mongoConnection = {
    isConnected: 0
};

export const dbConnect = async () => {
    if (mongoConnection.isConnected === 1) {
        return;
    }

    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;
        if (mongoConnection.isConnected === 1) {
            return;
        }

        await mongoose.disconnect();
    }
    await connect(MONGO_URL ?? '', { dbName: 'my-maps' });
    mongoConnection.isConnected = 1;
    console.log("connected to MongoDB");
};

export const dbDisconnect = async () => {
    if (mongoConnection.isConnected === 0) return;

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
    console.log("disconnected to MongoDB");
};