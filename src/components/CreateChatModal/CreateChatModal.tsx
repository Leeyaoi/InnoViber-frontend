import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Button, FormControl, Modal } from "@mui/material";
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
    <Modal className="ModalCreateChat" open={isOpen} onClose={handleClose}>
      <div className="ModalCreateChat_Content">
        <DialogTitle>Create chat</DialogTitle>
        <FormControl>
          <DialogContent>
            <DialogContentText id="ModalCreateChat_Content_Text">
              Chat name
            </DialogContentText>
            <TextField
              className="ModalCreateChat_Content_NameInput"
              helperText="Please enter new chat name"
              variant="standard"
              value={textInput}
              onChange={handleTextInputChange}
              fullWidth
              autoFocus
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              id="ModalCreateChat_Button_Submit"
              onClick={(event) => {
                event.preventDefault();
                createChat(textInput, currentUserId);
                handleClose();
                setTextInput("");
              }}
            >
              Add Chat
            </Button>
          </DialogActions>
        </FormControl>
      </div>
    </Modal>
  );
};

export default AddChatFormComponent;
