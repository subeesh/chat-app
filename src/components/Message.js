import React from "react";
import { Comment } from "semantic-ui-react";

const Message = props => {
  return (
    <Comment size="large">
      <Comment.Content>
        <Comment.Author>Anonymous</Comment.Author>
        <Comment.Metadata>
          <div>.</div>
        </Comment.Metadata>
        <Comment.Text>
          {props.message}
        </Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default Message;
