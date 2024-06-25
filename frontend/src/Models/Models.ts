export interface PlayingCard{
    image: any;
    imageName: string;
    watch: boolean;
    outTheGame: boolean;
}


export interface IUser {
    username: string;
    password?: string;
    role: "admin" | "user";
    memoryGame: {
        bestTime: number;
        updated?: string;
    };
    salt?: string;
    imageName?: string;
}