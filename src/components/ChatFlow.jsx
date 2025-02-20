// ChatHistory.jsx
import React from "react";
import { useStore } from "@/store/chat";
import MessageItem from "./card/Message";

export default function ChatHistory() {
  const currentChat = useStore((state) => state.getCurrentChat());

  if (!currentChat) return null;

  return (
    <div className="flex flex-col gap-4">
      {currentChat.messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}
