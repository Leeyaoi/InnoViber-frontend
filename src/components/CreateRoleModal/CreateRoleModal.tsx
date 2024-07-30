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
import { UserType } from "../../shared/types/UserType";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateRoleModal = ({ open, setOpen }: Props) => {
  const { getSuggestedUsers, createRole, currentChatId } = useGlobalStore();
  const [value, setValue] = useState<string | null>("");
  const [inputValue, setInputValue] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState<UserType[]>([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async () => {
    const user = await getSuggestedUsers(value ?? "");

    if (user.length == 1) {
      createRole({
        chatId: currentChatId,
        userId: user[0].auth0Id,
        role: UserRoles.Member,
        id: "",
      });
    }
    handleClose();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOptionsDelayed = useCallback(
    debounce(
      async (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setSuggestedUsers([]);
        if (event.target.value != "") {
          setSuggestedUsers(await getSuggestedUsers(event.target.value));
        }
      },
      500
    ),
    []
  );

  return (
    <Modal
      open={open}
      onClose={async () => await handleClose()}
      className="CreateRoleModal_bg"
    >
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
