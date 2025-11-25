import { Message, MessageFilter } from "../types/message";

const messages: Message[] = [];

export const addMessageToStore = (message: Message): void => {
  messages.push(message);
};

export const getMessagesFromStore = (filter: MessageFilter) => {
  let filtered = messages.filter((msg) => {
    const userMatch = filter.user ? msg.user.includes(filter.user) : true;
    const contentMatch = filter.message
      ? msg.message.includes(filter.message)
      : true;
    return userMatch && contentMatch;
  });

  const page = filter.page || 1;
  const limit = filter.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return {
    total: filtered.length,
    page,
    limit,
    data: filtered.slice(startIndex, endIndex),
  };
};
