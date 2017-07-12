import React from "react";
import { Form, Button } from "semantic-ui-react";

const ChatInput = ({ handleChange, handleSubmit, message, placeholder }) => {
  return (
    <div>
      <Form reply onSubmit={handleSubmit}>
        <Form.TextArea
          name="message"
          placeholder={placeholder}
          value={message}
          onChange={handleChange}
        />
        <Button
          content="Send"
          labelPosition="left"
          icon="send"
          primary
          disabled={!message}
        />
      </Form>
    </div>
  );
};

export default ChatInput;
