import {
  Autocomplete,
  Button,
  debounce,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import "./CreateRoleModal.scss";
import { useGlobalStore } from "../../state/GlobalStore";
import { useCallback, useState } from "react";
import { UserRoles } from "../../shared/types/UserRolesEnum";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateRoleModal = ({ open, setOpen }: Props) => {
  const {
    suggestedUsers,
    getSuggestedUsers,
    clearSuggestedUsers,
    createRole,
    currentChatId,
  } = useGlobalStore();
  const [value, setValue] = useState<string | null>("");
  const [inputValue, setInputValue] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    getSuggestedUsers(value ?? "");
    console.log(value);
    console.log(suggestedUsers);
    if (suggestedUsers.length == 1) {
      createRole({
        chatId: currentChatId,
        userId: suggestedUsers[0].auth0Id,
        role: UserRoles.Member,
        id: "",
      });
      handleClose();
    } else {
      handleClose();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOptionsDelayed = useCallback(
    debounce(
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        clearSuggestedUsers();
        if (event.target.value != "") {
          getSuggestedUsers(event.target.value);
        }
      },
      1000
    ),
    []
  );

  return (
    <Modal open={open} onClose={handleClose} className="CreateRoleModal_bg">
      <div className="CreateRoleModal">
        <Typography id="CreateRoleModal_Label" variant="h1">
          Write user name
        </Typography>
        <Autocomplete
          id="CreateRoleInput"
          freeSolo
          options={suggestedUsers.map((x) => x.name)}
          onChange={(e, newValue) => {
            const event = e as React.ChangeEvent<
              HTMLInputElement | HTMLTextAreaElement
            >;
            setValue(newValue);
            getOptionsDelayed(event);
          }}
          value={value}
          inputValue={inputValue}
          onInputChange={(e, newInputValue) => {
            const event = e as React.ChangeEvent<
              HTMLInputElement | HTMLTextAreaElement
            >;
            setInputValue(newInputValue);
            setValue(newInputValue);
            getOptionsDelayed(event);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button
          variant="outlined"
          id="CreateRoleModal_Button"
          onClick={handleClick}
        >
          Add user
        </Button>
      </div>
    </Modal>
  );
};

export default CreateRoleModal;
