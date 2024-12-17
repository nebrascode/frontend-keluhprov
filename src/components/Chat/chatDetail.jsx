import { IoIosArrowRoundBack } from "react-icons/io";
import { FiPaperclip } from "react-icons/fi";
import { IoMicOutline } from "react-icons/io5";
import { TiLocationArrowOutline } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ChatBubble from "./chatBubble";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatDetail = () => {
  const { id } = useParams(); // ID room dari URL parameter
  const [messages, setMessages] = useState([]); // Menyimpan pesan dari room
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomName, setRoomName] = useState(""); // Menyimpan nama room
  const [profile, setProfile] = useState(""); // Avatar room
  const [newMessage, setNewMessage] = useState(""); // Input pesan baru

  useEffect(() => {
    fetchChatDetail();
    fetchRoomName();
  }, [id]);

  // Fetch messages berdasarkan ID room
  const fetchChatDetail = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/v1/rooms/${id}/messages`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data); // Menyimpan pesan
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch detail nama room berdasarkan ID
  const fetchRoomName = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/api/v1/rooms/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const room = response.data; // Data room langsung dari response
      setRoomName(room.Name);
      setProfile(`https://via.placeholder.com/48?text=${getInitials(room.Name)}`);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fungsi mendapatkan inisial dari nama room
  const getInitials = (name) => {
    if (!name) return "NA";
    const words = name.split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  };

  // Fungsi untuk mengirim pesan baru
  const sendMessage = async () => {
    if (!newMessage.trim()) return; // Cegah pengiriman pesan kosong
    try {
      const token = sessionStorage.getItem("token");
      const payload = {
        RoomID: id,
        SenderID: 1, // ID admin, bisa diganti sesuai implementasi
        SenderType: "admin",
        Message: newMessage,
      };
      const response = await axios.post(
        `http://localhost:8000/api/v1/rooms/${id}/messages`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages((prevMessages) => [...prevMessages, response.data]); // Tambahkan pesan baru ke daftar
      setNewMessage(""); // Reset input pesan
    } catch (err) {
      console.error("Error sending message:", err.message);
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
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="bg-main-color text-white text-3xl font-bold p-2.5">Chat</div>
      <div className="text-lg p-3 flex items-center">
        <Link to={"/chat-user"} className="mr-4 text-3xl">
          <IoIosArrowRoundBack />
        </Link>
        {/* Avatar Inisial */}
        <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-200 rounded-full mr-4">
          <span className="font-medium text-gray-600">{getInitials(roomName)}</span>
        </div>
        {/* Nama Room */}
        <div className="text-dark-2 font-bold">{roomName}</div>
      </div>

      {/* Chat Messages */}
      <div className="p-4 h-96 overflow-y-auto">
        <div className="text-center text-sm mb-4">Today</div>
        {messages.map((chat) => (
          <ChatBubble
            key={chat.ID}
            message={chat.Message}
            time={new Date(chat.CreatedAt).toLocaleTimeString()}
            senderType={chat.SenderType}
            chat={chat}
          />
        ))}
      </div>

      {/* Message Input */}
      <div className="flex items-center p-4">
        <button className="hover:text-gray-500">
          <FiPaperclip />
        </button>
        <input
          type="text"
          className="flex-grow ml-4 p-2 border-none"
          placeholder="Type a Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)} // Update state saat input berubah
        />
        <div className="flex gap-2 text-xl">
          <button className="hover:text-gray-500">
            <IoMicOutline />
          </button>
          <button
            className="hover:text-gray-500"
            onClick={sendMessage} // Kirim pesan saat tombol diklik
          >
            <TiLocationArrowOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
