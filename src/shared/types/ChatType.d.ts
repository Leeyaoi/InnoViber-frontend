import MessageType from "./MessageType";

declare module "ChatType";

type ChatType = {
  id: string;
  name: string;
  lastMessage: MessageType;
};

export default ChatType;
