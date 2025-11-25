import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { postMessage, getMessages } from "./controllers/messageController";
import { appEventEmitter, EVENTS } from "./events/eventEmitter";
import { handleEmailTrigger } from "./events/handlers";
import { authenticate } from "./middleware/auth";

const app = express();

app.use(cors());
app.use(bodyParser.json());

appEventEmitter.on(EVENTS.MESSAGE_CREATED, handleEmailTrigger);

app.use(authenticate);

app.post("/add-message", postMessage);
app.get("/messages", getMessages);

export default app;
