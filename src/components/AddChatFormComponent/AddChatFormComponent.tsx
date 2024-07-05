import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Button, FormControl } from "@mui/material";
import "./AddChatFormComponent.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}

const AddChatFormComponent = ({ isOpen, setIsOpen }: Props) => {
  const handleClose = (
    event: object,
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason != "backdropClick") {
      setIsOpen(false);
    }
    console.log(event);
  };

  return (
    <Dialog
      className="ModalCreateChat"
      aria-labelledby="modal-title"
      open={isOpen}
      onClose={(event, reason) => handleClose(event, reason)}
    >
      <div className="ModalCreateChat_Content">
        <DialogTitle>Create chat</DialogTitle>
        <FormControl>
          <DialogContent>
            <DialogContentText className="ModalCreateChat_Content_Text">
              Chat name
            </DialogContentText>
            <TextField
              className="ModalCreateChat_Content_NameInput"
              helperText="Please enter new chat name"
              variant="standard"
              fullWidth
              autoFocus
              required
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" className="ModalCreateChat_Button_Submit">
              Add Chat
            </Button>
          </DialogActions>
        </FormControl>
      </div>
    </Dialog>
  );
};

export default AddChatFormComponent;
