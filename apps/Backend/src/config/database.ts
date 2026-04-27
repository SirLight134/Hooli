import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async (retries = 5, delay = 5000) => {
    while (retries > 0) {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI || "", {
                maxPoolSize: 50,
                minPoolSize: 1,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            return conn; // Successfully connected, exit the loop
        } catch (error: any) {
            console.error(`MongoDB connection attempt failed: ${error.message}`);
            retries -= 1;
            console.log(`Retries left: ${retries}`);
            
            if (retries === 0) {
                console.error("Could not connect to MongoDB after maximum retries. Exiting...");
                process.exit(1);
            }
            
            // Wait for 'delay' milliseconds before trying again
            console.log(`Waiting ${delay / 1000} seconds before retrying...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

// Mongoose automatically provides a connection object that we can listen to
mongoose.connection.on('open', () => {
    console.log('MongoDB Connection Pool Opened');
});

mongoose.connection.on('error', (error: any) => {
    console.error(`MongoDB Connection Error: ${error.message}`)
});

mongoose.connection.on('close', () => {
    console.log('MongoDB Connection Closed');
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB Connection Reconnected');
});

const gracefulShutdown = async (signal: string, callback: () => void) => {
    try {
        await mongoose.connection.close();
        console.log(`Mongoose disconnected through ${signal}`);
        callback();
    } catch (err) {
        console.error('Error closing mongoose connection:', err);
        callback();
    }
}

// listen for process signals
process.on('SIGTERM', () => {
    gracefulShutdown('SIGTERM', () => {
        process.exit(0);
    })
})

process.on('SIGINT', () => {
    gracefulShutdown('SIGINT', () => {
        process.exit(0);
    })
})
export default dbConnect;
