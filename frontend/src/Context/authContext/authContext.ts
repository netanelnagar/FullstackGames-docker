import { Dispatch, SetStateAction, createContext } from "react";

interface IUser{
    username:string;
    memoryGame: {
        bestTime: number;
        updated?: string;
    };
    imageName?: string;
    _id?:string;
}

//add type to user context
export const authContext = createContext<{user: null | IUser, setUser: Dispatch<SetStateAction<object | null>>}|null>(null)