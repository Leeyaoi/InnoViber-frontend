import DefaultLabel from "../../UI/DefaultLabel/DefaultLabel";
import DefaultButton from "../../UI/DefaultButton/DefaultButton";
import "./AddChatComponent.scss";

const AddChatComponent = () => {
  return (
    <div className="MainPage_ChatList_AddChat">
      <DefaultButton value="+" />
      <DefaultLabel text="Add chat" />
    </div>
  );
};

export default AddChatComponent;
