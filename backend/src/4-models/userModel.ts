import { UploadedFile } from "express-fileupload";
import { Schema, model } from "mongoose";

export interface IUser {
    username: string;
    password?: string;
    role?: "admin" | "user";
    memoryGame: {
        bestTime: number;
        updated?: string;
    };
    salt?: string;
    image?: UploadedFile | undefined;
    imageName?: string;
    _id?: string;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "Please enter your username"],
        minlength: [5, "name must be at least 5 characters"],
        maxlength: [25, "name can't be more than 25 characters"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        trim: true,
    },
    salt: {
        type: String,
    },
    memoryGame: {
        bestTime: {
            type: Number,
            min: [1, "best time must be greater than 1"],
        },
        updated: {
            type: String,
        },
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: [true, "Have some errors in load role"],
    },
    imageName: {
        type: String,
    }
}, { versionKey: false });



export const userModel = model<IUser>('userModel', userSchema, 'users');



export type updateUser = {
    username?:string; 
    _id:string;
    image?: UploadedFile;
    imageName?: string;
}