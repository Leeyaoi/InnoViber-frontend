declare module "RoleType";

type RoleType = {
  id: string;
  chatId: string;
  userId: string;
  role: UserRoles;
  lastActivity: string | null;
};
