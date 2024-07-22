import { createRef, RefObject, SyntheticEvent, useEffect } from "react";
import { useGlobalStore } from "../../state/GlobalStore";
import OthersMessage from "../OthersMessage/OthersMessage";
import UsersMessage from "../UsersMessage/UsersMessage";
import "./MessagesList.scss";

const MessagesList = () => {
  const {
    messages,
    currentUserId,
    currentChatId,
    fetchMessages,
    getMoreMessages,
  } = useGlobalStore();

  const messagesEnd: RefObject<HTMLDivElement> = createRef();

  useEffect(() => {
    messagesEnd.current?.scrollIntoView();
  }, [messagesEnd]);

  useEffect(() => {
    console.log("fetching");
    if (currentChatId != "") {
      fetchMessages(currentChatId);
    }
  }, [currentChatId, fetchMessages]);

  const scrollEvent = (e: SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.scrollTop == 0) {
      console.log("getting more");
      getMoreMessages(currentChatId);
    }
  };

  return (
    <div className="Messages_List" onScroll={scrollEvent}>
      {messages.map((item) => {
        if (item.userId != currentUserId) {
          return <OthersMessage message={item} key={item.id} />;
        } else {
          return <UsersMessage message={item} key={item.id} />;
        }
      })}
      <div id="downDiv" ref={messagesEnd}></div>
    </div>
  );
};

export default MessagesList;
