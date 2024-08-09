import MessageType from "./MessageType";

declare module "ChatType";

type ChatType = {
  id: string;
  name: string;
  lastMessage: MessageType;
  lastActivity: string | null;
};

export default ChatType;
