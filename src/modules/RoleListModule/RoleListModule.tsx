import { List, ListItem } from "@mui/material";
import { useGlobalStore } from "../../state/GlobalStore";
import "./RoleListModule.scss";
import LeftChatComponent from "../../components/LeftChatComponent/LeftChatComponent";
import DeleteChatComponent from "../../components/DeleteChatComponent/DeleteChatComponent";
import { useEffect } from "react";
import RoleItem from "../../components/RoleItem/RoleItem";
import { UserRoles } from "../../shared/types/UserRolesEnum";
import AddRoleComponent from "../../components/AddRoleComponent/AddRoleComponent";

interface Props {
  mobile?: boolean;
}

const RoleListModule = ({ mobile = false }: Props) => {
  const { roles, currentRole, fetchRoles, currentChatId, getNames, users } =
    useGlobalStore();

  useEffect(() => {
    if (currentChatId != "") {
      fetchRoles(currentChatId);
    }
  }, [currentChatId, fetchRoles]);

  useEffect(() => {
    if (roles.length != 0) {
      getNames(roles);
    }
  }, [getNames, roles]);
  return (
    <div className="RoleListModule">
      <AddRoleComponent mobile={mobile} />
      <List className="RoleListModule_RoleList">
        <div className="RoleListModule_RoleItems">
          {roles.map((item) => (
            <ListItem key={item.id} className="RoleListItem">
              <RoleItem role={item} user={users[item.userId]} />
            </ListItem>
          ))}
        </div>
      </List>
      <div className="RoleButtons">
        <LeftChatComponent />
        {currentRole == UserRoles.Owner ? <DeleteChatComponent /> : <></>}
      </div>
    </div>
  );
};

export default RoleListModule;
