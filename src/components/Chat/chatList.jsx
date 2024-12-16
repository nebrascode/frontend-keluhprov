import { useEffect, useState } from "react";
import ChatItemList from "./chatItemList";
import { CircularProgress } from "@mui/material";
import axios from "axios";

const ChatList = () => {
  const [data, setData] = useState([]); // State untuk data chat
  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState(null); // State untuk error
  const [readChats, setReadChats] = useState([]); // Menyimpan ID chat yang sudah dibaca

  useEffect(() => {
    fetchChatList(); // Fetch data saat komponen pertama kali dirender
  }, []);

  const fetchChatList = async () => {
    setLoading(true); // Set loading menjadi true sebelum mulai fetch data
    try {
      const token = sessionStorage.getItem("token"); // Ambil token dari sessionStorage
      const response = await axios.get("http://localhost:8000/api/v1/rooms", {
        headers: {
          "Content-Type": "application/json", // Tipe konten
          Authorization: `Bearer ${token}`, // Header Authorization
        },
      });
  
      // Format data yang diterima dari API agar sesuai dengan yang dibutuhkan
      const formattedData = response.data.map((room) => {
        // Hitung jumlah pesan yang belum dibaca oleh admin
        const unreadMessages = room.Messages.filter((message) => {
          // Anggap pesan yang terakhir dikirim oleh user yang belum dibaca admin
          return message.SenderType === "user" && !readChats.includes(room.ID + "-" + message.ID);
        });
  
        return {
          id: room.ID,
          name: room.Name,
          avatar: "https://via.placeholder.com/48", // Gambar avatar placeholder
          message: room.Messages.length > 0 
            ? room.Messages[room.Messages.length - 1].Message 
            : "No messages yet", // Ambil pesan terakhir atau "No messages yet"
          time: room.Messages.length > 0
            ? new Date(room.Messages[room.Messages.length - 1].CreatedAt).toLocaleTimeString()
            : "", // Format waktu pesan terakhir
          unreadCount: unreadMessages.length, // Hitung jumlah pesan yang belum dibaca
        };
      });
  
      setData(formattedData); // Simpan data yang sudah diformat
    } catch (err) {
      setError(err.message); // Jika error, simpan pesan error
    } finally {
      setLoading(false); // Set loading menjadi false setelah selesai
    }
  };
  

  const handleChatOpen = (chatId) => {
    if (!readChats.includes(chatId)) {
      setReadChats([...readChats, chatId]); // Tambahkan chat ke daftar yang sudah dibaca
    }
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
          <ChatItemList key={chat.id} 
          chat={chat} 
          onChatOpen={() => handleChatOpen(chat.id)}/>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
