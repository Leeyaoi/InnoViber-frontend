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
    loading,
    getNames,
    users,
  } = useGlobalStore();

  const messagesEnd: RefObject<HTMLDivElement> = createRef();

  useEffect(() => {
    if (!loading && messages.length != 0) {
      messagesEnd.current?.scrollIntoView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  useEffect(() => {
    if (currentChatId != "") {
      console.log("fetching messages");
      fetchMessages(currentChatId);
    }
  }, [currentChatId, fetchMessages]);

  useEffect(() => {
    if (messages.length != 0) {
      getNames(messages);
    }
  }, [getNames, messages]);

  const scrollEvent = (e: SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.scrollTop == 0 && !loading) {
      getMoreMessages(currentChatId);
    }
  };

  useEffect(() => {
    if (messages.length != 0) {
      console.log("fetching names");
      getNames(messages);
    }
  }, [getNames, messages]);

  return (
    <div className="Messages_List" onScroll={scrollEvent}>
      {messages.map((item, index) => {
        if (item.userId != currentUserId) {
          return (
            <OthersMessage
              message={item}
              key={item.id}
              userName={
                item.userId in users
                  ? users[item.userId].nickName
                  : "Other User"
              }
            />
          );
        } else {
          return <UsersMessage message={item} key={item.id} />;
        }
      })}
      <div id="downDiv" ref={messagesEnd}></div>
    </div>
  );
};

export default MessagesList;
