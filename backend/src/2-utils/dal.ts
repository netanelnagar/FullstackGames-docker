import mongoose from "mongoose";
import { getLogger } from "../3-middleware/winston-logger";

const url = process.env.MONGO_ROOT_URL || 'mongodb://127.0.0.1:27017/';

const log = getLogger("dal");

export async function connectToMongo() {
    
    try {
        log.info(url)
        
        const db = await mongoose.connect(url);

        log.info(`connection to ${db.connections[0].name} on MongoDB`)
           
    } catch (error: any) {
        log.error(error?.message);
    }
}

