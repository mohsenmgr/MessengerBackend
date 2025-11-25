import { Message } from "../types/message";

export const handleEmailTrigger = (payload: Message) => {
  setTimeout(() => {
    console.log(`email sent to ${payload.user} with ${payload.message}`);
  }, 1000);
};
