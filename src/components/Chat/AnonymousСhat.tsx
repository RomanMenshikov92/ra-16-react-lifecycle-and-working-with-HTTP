import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./anonymouschat.css";
import { nanoid } from "nanoid";
import MessageProps from "./interface/InterfaceAnonymousChat";
import ListChild from "./ListChild";

export const AnonymousChat: React.FC = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const userId = localStorage.getItem("userId") || nanoid();
  const chatContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages(messages.length > 0 ? messages[messages.length - 1].id : 0);
    }, 2000);
    return () => clearInterval(interval);
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async (from: number) => {
    try {
      const response = await axios.get(`http://localhost:7080/messages?from=${from}`);
      setMessages((prevMessages) => [...prevMessages, ...response.data]);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      try {
        await axios.post("http://localhost:7080/messages", { id: 0, userId, content: newMessage });
        setNewMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <div className="anonymous-chat">
      <ListChild messages={messages} chatContainerRef={chatContainerRef} userId={userId}></ListChild>
      <div className="anonymous-chat__new-message">
        <textarea
          className="anonymous-chat__textarea anonymous-chat-input-reset"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ height: "100px", overflow: "overlay" }}
          placeholder="Введите сообщение для анонимного чата"
        ></textarea>
        <button className="anonymous-chat__btn-send anonymous-chat-btn-reset" onClick={sendMessage}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default AnonymousChat;
