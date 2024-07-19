import { UserRoles } from "./UserRoles";

declare module "ChatRoleType";

type ChatRoleType = {
  id: string;
  role: UserRoles;
  userId: string;
  chatId: string;
};

export default ChatRoleType;
