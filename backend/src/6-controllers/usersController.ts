import { NextFunction, Request, Response, Router } from "express";
import userLogic from "../5-logic/userLogic";
import { verifyAdmin, verifyLogged } from "../3-middleware/verifyLogged";
import { getLogger } from "../3-middleware/winston-logger";
import { updateUser } from "../4-models/userModel";

export const router = Router();

const log = getLogger("usersControllers");

router.get('/users', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userLogic.getUsers();
        log.info("get all users")
        res.json(users);
    } catch (error) {
        next(error);
    }
})

router.get('/users/:_id', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _id = req.params._id;
        const user = await userLogic.getUser(_id);
        log.info("get user with id: " + _id);
        res.json(user);
    } catch (error) {
        next(error);
    }
})

router.post('/users/memory-game/:_id', verifyLogged, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bestTime = req.body;
        bestTime._id = req.params._id;
        const message = await userLogic.updateBestTimeOfMemoryGame(bestTime);
        log.info(message);
        res.json(message);
    } catch (error) {
        next(error);
    }
});


router.patch('/users/update', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user: updateUser = req.body;
        await userLogic.updateUser(user);
        res.status(201).json("Updated user");

    } catch (error: any) {
        next(error);
    }
})

export default router;