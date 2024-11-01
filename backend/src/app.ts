import express from "express";
import cors from "cors";
import usersRouter from "./6-controllers/usersController";
import filesRouter from "./6-controllers/filesControllers";
import authRouter from "./6-controllers/authControllers";
import { catchAllErrors } from "./3-middleware/catchAllErrors";
import { connectToMongo } from "./2-utils/dal";
import expressFile from "express-fileupload";
import { getLogger } from "./3-middleware/winston-logger";
import figlet from "figlet";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const log = getLogger("app");

log.info(
    `running in a ${process.env.MODE?.toUpperCase()} environment\n` +
    figlet.textSync(`${process.env.MODE?.toUpperCase()}`, {
        font: "Bulbhead"
    })
)

connectToMongo();

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})

const port = process.env.PORT || 3002;

const app = express();

app.use(limiter)

app.use(helmet({ crossOriginResourcePolicy: false, }));

app.use(express.json());

app.use(expressFile());

app.use(cors());

app.use('/api', usersRouter);
app.use('/api', filesRouter);
app.use('/api', authRouter);

app.use('*', (req, res, next) => {
    res.status(404).send(`Page ${req.originalUrl} not found`)
});

app.use(catchAllErrors);

app.listen(port, () => { log.info(`app listening on port ${port}`) });

