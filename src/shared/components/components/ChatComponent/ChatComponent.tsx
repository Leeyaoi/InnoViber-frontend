import RoundPicture from "../../UI/RoundPicture/RoundPicture";
import DefaultLabel from "../../UI/DefaultLabel/DefaultLabel";
import "./ChatComponent.scss";

interface Props {
  chatName?: string;
  lastMessage?: string;
}

const ChatComponent = ({
  chatName = "Default Chat",
  lastMessage = "Be first to write",
}: Props) => {
  return (
    <div className="MainPage_ChatList_ChatBlock">
      <RoundPicture />
      <div className="MainPage_ChatList_ChatBlock_ChatInfo">
        <DefaultLabel text={chatName} />
        <DefaultLabel text={lastMessage} smaller={true} />
      </div>
    </div>
  );
};

export default ChatComponent;
