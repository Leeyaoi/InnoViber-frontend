import { MessageStatus } from "./MessageStatus";

declare module "MessageType";

type MessageType = {
  id: string;
  date: string;
  text: string;
  status: MessageStatus;
  userId: string;
  chatId: string;
};

export default MessageType;
