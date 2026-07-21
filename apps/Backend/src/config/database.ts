import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
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
            logger.info(`MongoDB Connected: ${conn.connection.host}`);
            return conn;
        } catch (error: any) {
            logger.error(error, `MongoDB connection attempt failed`);
            retries -= 1;
            logger.warn(`Retries left: ${retries}`);
            
            if (retries === 0) {
                logger.error("Could not connect to MongoDB after maximum retries. Exiting...");
                process.exit(1);
            }
            
            logger.info(`Waiting ${delay / 1000} seconds before retrying...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

mongoose.connection.on('open', () => {
    logger.info('MongoDB Connection Pool Opened');
});

mongoose.connection.on('error', (error: any) => {
    logger.error(error, 'MongoDB Connection Error')
});

mongoose.connection.on('close', () => {
    logger.info('MongoDB Connection Closed');
});

mongoose.connection.on('reconnected', () => {
    logger.info('MongoDB Connection Reconnected');
});

const gracefulShutdown = async (signal: string, callback: () => void) => {
    try {
        await mongoose.connection.close();
        logger.info(`Mongoose disconnected through ${signal}`);
        callback();
    } catch (err) {
        logger.error(err, 'Error closing mongoose connection');
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
