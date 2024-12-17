/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ChatItemList = ({ chat }) => {
  const getInitials=(name)=>{
    if(!name) return "NA";

    const words =name.split(" ");

    if(words,length===1) 
      return words[0][0].toUpperCase();
    
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  return (
    <Link to={`/chat-user/${chat.id}`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">

          {/* Avatar Inisial */}
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full mr-2 ">
            <span className="font-medium text-gray-600">
              {getInitials(chat.name)}
            </span>
          </div>

          <div>
            <div className="font-bold">{chat.name}</div>
            <div className="text-gray-600">{chat.message}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-600">{chat.time}</div>
          {chat.unreadCount > 0 && (
            <div className="flex justify-center items-center bg-red-500 text-white rounded-full w-6 h-6 mt-1">
              {chat.unreadCount}
            </div>
          )}
        </div>
      </div>
    </Link>

  );
};

export default ChatItemList