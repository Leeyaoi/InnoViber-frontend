import { Avatar, Badge, Button, Modal, TextField } from "@mui/material";
import { UserType } from "../../shared/types/UserType";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import "./ChangeProfileModal.scss";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (o: boolean) => void;
  user: UserType;
}

const ChangeProfileModal = ({ open, setOpen, user }: Props) => {
  const [picture, setPicture] = useState(user.userPhoto);
  const [about, setAbout] = useState(user.about);
  const [name, setName] = useState(user.name);
  const [nickName, setNickName] = useState(user.nickName);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose} className="ChangeProfileModal_bg">
      <div className="ChangeProfileModal">
        <div id="ChangeProfile_Badge_Box">
          <Badge
            id="ChangeProfile_Badge"
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <>
                <label>
                  <input type="file" id="ChangeProfile_GetFileInput" />
                  <Avatar id="ChangeProfile_GetFileBtn">
                    <AddPhotoAlternateRoundedIcon />
                  </Avatar>
                </label>
              </>
            }
          >
            <Avatar
              id="ChangeProfile_Avatar"
              src={picture}
              slotProps={{ img: { referrerPolicy: "no-referrer" } }}
            />
          </Badge>
        </div>
        <div id="ChangeProfile_About_Box">
          <TextField
            fullWidth
            id="ChangeProfile_About"
            label="About"
            variant="outlined"
            multiline
            rows={4}
            inputProps={{ maxLength: 250 }}
            value={about}
            onChange={(event) => {
              setAbout(event.target.value);
            }}
          />
          <TextField
            fullWidth
            id="ChangeProfile_Name"
            label="Name"
            variant="outlined"
            inputProps={{ maxLength: 20 }}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            fullWidth
            id="ChangeProfile_NickName"
            label="Nick name"
            variant="outlined"
            inputProps={{ maxLength: 20 }}
            value={nickName}
            onChange={(event) => {
              setNickName(event.target.value);
            }}
          />
          <Button variant="outlined" id="SaveProfile_button">
            SAVE
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeProfileModal;
