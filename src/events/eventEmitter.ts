import { EventEmitter } from "events";

class AppEventEmitter extends EventEmitter {}
export const appEventEmitter = new AppEventEmitter();

export const EVENTS = {
  MESSAGE_CREATED: "message.created",
};
