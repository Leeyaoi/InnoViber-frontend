declare module "ChatType";

type ChatType = {
  id: string;
  name: string;
  lastMessageText: string | undefined;
  lastMessageUserId: string | undefined;
  lastMessageDate: string | undefined;
};

export default ChatType;
