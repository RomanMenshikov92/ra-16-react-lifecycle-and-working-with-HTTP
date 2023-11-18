import React from "react";
import { MessagePropsList } from "./interface/InterfaceAnonymousChat";

export const ListChild: React.FC<MessagePropsList> = ({ chatContainerRef, messages, userId }) => {
  return (
    <>
      <ul style={{ height: "400px", overflowY: "auto" }} ref={chatContainerRef} className="anonymous-chat__messages anonymous-chat-list-reset">
        {messages.map((message) => (
          <li key={message.id} className={`anonymous-chat__message ${message.userId === userId ? "my-message" : "other-message"}`}>
            {message.content}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListChild;
