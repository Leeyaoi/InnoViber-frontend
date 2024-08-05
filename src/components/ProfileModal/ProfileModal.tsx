import { Avatar, Button, Modal, Typography } from "@mui/material";
import "./ProfileModal.scss";
import { UserType } from "../../shared/types/UserType";
import { useGlobalStore } from "../../state/GlobalStore";
import { useState } from "react";
import ChangeProfileModal from "../ChangeProfileModal/ChangeProfileModal";

interface Props {
  open: boolean;
  setOpen: (o: boolean) => void;
  user: UserType;
}

const ProfileModal = ({ open, setOpen, user }: Props) => {
  const { currentUserId } = useGlobalStore();

  const [openChange, setOpenChange] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpenChange(true);
  };

  return (
    <Modal open={open} onClose={handleClose} className="ProfileModal_bg">
      <div className="ProfileModal">
        <Typography>{user.nickName}</Typography>
        <Avatar
          src={user.userPhoto}
          slotProps={{ img: { referrerPolicy: "no-referrer" } }}
        />
        {user.auth0Id == currentUserId ? (
          <Typography>{user.email}</Typography>
        ) : (
          <></>
        )}
        <Typography>{user.name}</Typography>
        <Typography>{user.about}</Typography>
        {user.auth0Id == currentUserId ? (
          <>
            <Button
              variant="outlined"
              id="ChangeProfile_btn"
              onClick={handleClick}
            >
              Change profile data
            </Button>
            <ChangeProfileModal
              open={openChange}
              setOpen={setOpenChange}
              user={user}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
};

export default ProfileModal;
