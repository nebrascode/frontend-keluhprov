/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

  const ChatItemList = ({ chat }) => {
    return (
      <Link to={"/chat-user/:id"}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <img src={chat.avatar} alt="avatar" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <div className="font-bold">{chat.name}</div>
              <div className="text-gray-600">{chat.message}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-600">{chat.time}</div>
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