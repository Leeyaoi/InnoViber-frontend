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
    names,
  } = useGlobalStore();

  const messagesEnd: RefObject<HTMLDivElement> = createRef();

  useEffect(() => {
    if (!loading && messages.length != 0) {
      messagesEnd.current?.scrollIntoView();
      console.log("scrolling");
    }
  }, [loading, messages.length, messagesEnd]);

  useEffect(() => {
    if (currentChatId != "") {
      console.log("fetching messages");
      fetchMessages(currentChatId);
    }
  }, [currentChatId, fetchMessages]);

  const scrollEvent = (e: SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.scrollTop == 0 && !loading) {
      console.log("getting more messages");
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
              userName={names[index]}
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
