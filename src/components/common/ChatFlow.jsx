import React, { useEffect, useRef } from "react";
import { useStore } from "@/store/chat";
import Message from "../card/Message";

const ChatFlow = () => {
  const currentChat = useStore((state) => state.getCurrentChat());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  if (!currentChat) return null;

  return (
    <div className="flex flex-col gap-4">
      {currentChat.messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatFlow;
