import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Button, FormControl } from "@mui/material";
import { useChatState } from "../../state/ChatSlice";
import { useState } from "react";
import "./CreateChatModal.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}

const AddChatFormComponent = ({ isOpen, setIsOpen }: Props) => {
  const createChat = useChatState((state) => state.createChat);
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
    <Dialog
      className="ModalCreateChat"
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          createChat(textInput);
          handleClose();
          setTextInput("");
        },
      }}
    >
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
            <Button type="submit" id="ModalCreateChat_Button_Submit">
              Add Chat
            </Button>
          </DialogActions>
        </FormControl>
      </div>
    </Dialog>
  );
};

export default AddChatFormComponent;
