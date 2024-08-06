import TextField from "@mui/material/TextField";
import { Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import "./CreateChatModal.scss";
import { useGlobalStore } from "../../state/GlobalStore";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}

const AddChatFormComponent = ({ isOpen, setIsOpen }: Props) => {
  const { createChat, currentUserId } = useGlobalStore();
  const [textInput, setTextInput] = useState("");

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTextInput(event.target.value);
  };

  return (
    <Modal
      className="ModalCreateChat"
      open={isOpen}
      onClose={handleClose}
      disableRestoreFocus
    >
      <div className="ModalCreateChat_Content">
        <Typography variant="h1">Create chat</Typography>
        <Typography id="ModalCreateChat_Content_Text">Chat name</Typography>

        <TextField
          id="ModalCreateChat_Content_NameInput"
          label="Please enter new chat name"
          variant="outlined"
          value={textInput}
          onChange={handleTextInputChange}
          fullWidth
          autoFocus
          required
        />
        <Button
          id="ModalCreateChat_Button_Submit"
          variant="outlined"
          onClick={(event) => {
            event.preventDefault();
            if (textInput != "") {
              createChat(textInput, currentUserId);
            }
            handleClose();
            setTextInput("");
          }}
        >
          Add Chat
        </Button>
      </div>
    </Modal>
  );
};

export default AddChatFormComponent;
