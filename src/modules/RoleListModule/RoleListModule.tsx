import { List, ListItem } from "@mui/material";
import { useGlobalStore } from "../../state/GlobalStore";
import "./RoleListModule.scss";
import { useEffect } from "react";
import RoleItem from "../../components/RoleItem/RoleItem";

const RoleListModule = () => {
  const { roles, fetchRoles, currentChatId, getNames, users } =
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
      <List className="RoleListModule_RoleList">
        <div className="RoleListModule_RoleItems">
          {roles.map((item) => (
            <ListItem key={item.id} className="RoleListItem">
              <RoleItem role={item} user={users[item.userId]} />
            </ListItem>
          ))}
        </div>
      </List>
    </div>
  );
};

export default RoleListModule;