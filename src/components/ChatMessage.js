import React from "react";
import { Message } from "semantic-ui-react";

const ChatMessage = ({ message }) => {
  const isServerMessage = message.type === 0;
  return (
    <Message info={isServerMessage} size="tiny">
      {!isServerMessage
        ? <Message.Header>
            {message.user.nickName}
          </Message.Header>
        : null}
      <p>
        {message.content}
      </p>
    </Message>
  );
};

export default ChatMessage;
