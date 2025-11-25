import { v4 as uuidv4 } from "uuid";
import { CreateMessageDto, Message } from "../types/message";
import { addMessageToStore, getMessagesFromStore } from "../store/messageStore";
import { appEventEmitter, EVENTS } from "../events/eventEmitter";

export const createMessage = (data: CreateMessageDto): Message => {
  const newMessage: Message = {
    id: uuidv4(),
    user: data.user,
    message: data.message,
    createdAt: new Date(),
  };

  addMessageToStore(newMessage);
  appEventEmitter.emit(EVENTS.MESSAGE_CREATED, newMessage);

  return newMessage;
};

export const listMessages = (filters: any) => {
  return getMessagesFromStore(filters);
};
