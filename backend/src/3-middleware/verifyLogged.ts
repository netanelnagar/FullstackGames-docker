import { NextFunction, Request, Response } from "express";
import auth from "../2-utils/auth"
import { AuthorizationError } from "../4-models/errorModel";

export async function verifyLogged(req:Request, res:Response, next: NextFunction){
    try {
        const isLogged = await auth.verifyLogged(req);
        if(!isLogged) throw new AuthorizationError("Unauthorized user");

        next();
    } catch (error) {
        next(error);
    }
}


export async function verifyAdmin(req:Request, res:Response, next: NextFunction){
    try {
        const isAdmin = await auth.verifyAdmin(req);
        if(!isAdmin) throw new AuthorizationError("Unauthorized user");
        next();
    } catch (error) {
        next(error);
    }
}


