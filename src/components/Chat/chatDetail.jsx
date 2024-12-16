import { IoIosArrowRoundBack } from "react-icons/io";
import { FiPaperclip } from "react-icons/fi";
import { IoMicOutline } from "react-icons/io5";
import { TiLocationArrowOutline } from "react-icons/ti"
import { Link, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ChatBubble from "./chatBubble";
import axios from "axios";
import { useEffect, useState } from "react";
import foto1 from '../../assets/profile/foto1.png'

const ChatDetail = () => {
  const { id } = useParams();
  const [ messages, setMessages ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    fetchChatDetail();
  }, [id]);

  const fetchChatDetail = async () => {
    setLoading(true); // Set loading menjadi true sebelum mulai fetch data
    try {
      const token = sessionStorage.getItem("token"); // Ambil token dari sessionStorage
      const response = await axios.get(`http://localhost:8000/api/v1/rooms/${id}/messages`, {
        headers: {
          "Content-Type": "application/json", // Tipe konten
          Authorization: `Bearer ${token}`, // Header Authorization
        },
      });
      setMessages(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message); // Jika error, simpan pesan error
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
        <img src={foto1} alt="avatar" className="w-12 h-12 rounded-full mr-4" />
        <div className='ml-[300px] flex-col'>
          <div className='text-black text-xs font-medium  leading-3'>nama</div>
          <div className="text-neutral-500 text-xs font-medium  leading-3 mt-1">Active now</div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="p-4 h-96 overflow-y-auto">
        <div className="text-center text-sm mb-4">Today</div>
        {messages.map(chat => (
          <ChatBubble
            key={chat.ID}
            message={chat.Message}
            time={new Date(chat.CreatedAt).toLocaleTimeString()}
            senderType={chat.SenderType}
            chat={chat} />
        ))}
      </div>

      {/* Message Input */}
      <div className="flex items-center p-4">
        <button className="hover:text-gray-500">
          <FiPaperclip />
        </button>
        <input type="text" className="flex-grow ml-4 p-2 border-none" placeholder="Type a Message" />
        <div className="flex gap-2 text-xl">
          <button className="hover:text-gray-500">
            <IoMicOutline />
          </button>
          <button className="hover:text-gray-500">
            <TiLocationArrowOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;