/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ChatItemList from "./chatItemList";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const [data, setData] = useState([]); // State untuk data chat
  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState(null); // State untuk error
  const navigate = useNavigate(); // Untuk navigasi ke halaman detail chat

  useEffect(() => {
    fetchChatList(); // Fetch data saat komponen pertama kali dirender
  }, []);

  const fetchChatList = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/v1/rooms", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Format data agar sesuai dengan kebutuhan
      const formattedData = response.data.map((room) => {
        const unreadMessages = room.Messages.filter(
          (message) => message.SenderType === "user"
        );

        return {
          id: room.ID,
          name: room.Name,
          messages: room.Messages,
          lastMessage: room.Messages.length > 0
            ? room.Messages[room.Messages.length - 1].Message
            : "No messages yet",
          time: room.Messages.length > 0
            ? new Date(room.Messages[room.Messages.length - 1].CreatedAt).toLocaleTimeString()
            : "",
          unreadCount: unreadMessages.length,
        };
      });

      setData(formattedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChatOpen = (chatId) => {
    // Perbarui unreadCount menjadi 0 untuk chat yang di-klik
    const updatedData = data.map((chat) => {
      if (chat.id === chatId) {
        return { ...chat, unreadCount: 0 }; // Reset unreadCount
      }
      return chat;
    });

    setData(updatedData); // Update state data
    navigate(`/chat-user/${chatId}`); // Pindah ke halaman detail chat
  };

  if (loading) {
    return (
      <section className="flex w-full flex-col">
        <div className="lg:ml-80 py-3 px-2 min-h-[80dvh] overflow-y-auto">
          <main className="container mx-auto px-4 py-4">
            <CircularProgress color="primary" />
          </main>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex w-full flex-col">
        <div className="lg:ml-80 py-3 px-2 min-h-[80dvh] overflow-y-auto">
          <main className="container mx-auto px-4 py-4">
            <p>There was an error: {error}</p>
          </main>
        </div>
      </section>
    );
  }

  return (
    <div className="w-full bg-main-lighter rounded-lg shadow-lg overflow-hidden">
      <div className="bg-main-color text-white text-3xl font-bold p-2.5">Chat</div>
      <div>
        {data.map((chat) => (
          <ChatItemList
            key={chat.id}
            chat={{
              id: chat.id,
              name: chat.name,
              message: chat.lastMessage,
              time: chat.time,
              unreadCount: chat.unreadCount,
            }}
            onChatOpen={() => handleChatOpen(chat.id)} // Panggil handleChatOpen saat chat dibuka
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
