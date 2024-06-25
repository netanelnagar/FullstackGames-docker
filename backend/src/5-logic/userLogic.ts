import { UploadedFile } from "express-fileupload";
import { getLogger } from "../3-middleware/winston-logger";
import { SourceNotFoundError } from "../4-models/errorModel";
import { IUser, updateUser, userModel } from "../4-models/userModel";
import path from "path";
import { v4 as uuidv4 } from "uuid";





const log = getLogger("userLogic");



async function getUsers(): Promise<IUser[]> {

    const users = await userModel.find().exec();

    const usersArray: IUser[] = users.map(user => user.toObject());

    for (const user of usersArray) {
        delete user.password;
        console.log("object", user)
    }

    return usersArray;

}

async function getUser(_id: string): Promise<IUser> {

    const user = await userModel.findById(_id).exec();

    if (!user) { throw new SourceNotFoundError(`id ${_id} not found`); }

    return user;

}


async function updateBestTimeOfMemoryGame(newTime: { _id: string, time: number }): Promise<string> {

    const user = await userModel.findById(newTime._id).exec();

    if (!user) { throw new SourceNotFoundError(`id ${newTime._id} not found`); }

    console.log(user.memoryGame)

    const date = new Date();

    const strDate = date.toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" });

    const update = { memoryGame: { bestTime: newTime.time, updated: strDate } };

    if (user.memoryGame.bestTime > newTime.time) {

        await userModel.findByIdAndUpdate(newTime._id, update).exec()
        return "best time updated"
    }

    return "best time no updated, it's not a best time"
}

async function updateUser(user: updateUser) {

    const userInDB = await userModel.findById(user._id);

    if (!userInDB) { throw new SourceNotFoundError("user not found "); }

    if (user.username) {
        userInDB.username = user.username
    }

    if (user.image) {
        log.info("user uploaded image");

        const ext = path.extname(user.image.name)
        //give uid for image name  
        const imageName = uuidv4() + ext;

        await user.image.mv("./src/1-assets/images/" + imageName);

        delete user.image;

        //fix to correct url
        user.imageName = imageName;

    }

    await userInDB.save()

}




export default {
    getUsers,
    getUser,
    updateBestTimeOfMemoryGame,
    updateUser,
}