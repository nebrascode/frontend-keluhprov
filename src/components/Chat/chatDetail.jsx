import { IoIosArrowRoundBack } from "react-icons/io";
import { FiPaperclip } from "react-icons/fi";
import { IoMicOutline } from "react-icons/io5";
import { TiLocationArrowOutline } from "react-icons/ti"
import { Link } from "react-router-dom";


const chats = [
  {
    id: 1,
    name: "Maulana Abraham",
    message: "Hai, ada yang bisa dibantu?",
    time: "09:25 AM",
    type: "received",
    avatar: "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833572.jpg?w=1380&t=st=1719190583~exp=1719191183~hmac=7819e8c7185b15718b2af21b949eb1e15bf056546b3ecc1498b0bac3902fb435",
  },
  {
    id: 2,
    name: "You",
    message: "Hello! Maulana Abraham",
    time: "09:25 AM",
    type: "sent",
    avatar: "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833572.jpg?w=1380&t=st=1719190583~exp=1719191183~hmac=7819e8c7185b15718b2af21b949eb1e15bf056546b3ecc1498b0bac3902fb435",
  },
];

const ChatItem = ({ chat }) => {
  const messageClass = chat.type === 'received' ? 'bg-yellow-100 text-left' : 'bg-yellow-200 text-right ml-auto';
  const containerClass = chat.type === 'received' ? 'justify-start' : 'justify-end';

  return (
    <div className={`flex ${containerClass} items-end my-2`}>
      {chat.type === 'received' && <img src={chat.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-2" />}
      <div>
        <div className={`p-2 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl shadow ${messageClass}`}>
          {chat.message}
        </div>
        <div className="text-gray-500 text-xs mt-1">
          {chat.time}
        </div>
      </div>
      {chat.type === 'sent' && <img src={chat.avatar} alt="avatar" className="w-10 h-10 rounded-full ml-2" />}
    </div>
  );
};

const ChatDetail = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="bg-main-color text-white text-3xl font-bold p-2.5">Chat</div>
      <div className="text-lg p-3 flex items-center">
        <Link to={"/chat-user"} className="mr-4 text-3xl">
          <IoIosArrowRoundBack />
        </Link>
        <img src="https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833572.jpg?w=1380&t=st=1719190583~exp=1719191183~hmac=7819e8c7185b15718b2af21b949eb1e15bf056546b3ecc1498b0bac3902fb435" alt="avatar" className="w-12 h-12 rounded-full mr-4" />
        <div className='ml-[300px] flex-col'>
          <div className='text-black text-xs font-medium  leading-3'>Maulana Abraham</div>
          <div className="text-neutral-500 text-xs font-medium  leading-3 mt-1">Active now</div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="p-4 h-96 overflow-y-auto">
        <div className="text-center text-sm mb-4">Today</div>
        {chats.map(chat => (
          <ChatItem key={chat.id} chat={chat} />
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