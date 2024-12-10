import ChatItemList from "./chatItemList"
import chats from "./chatsData";

const ChatList = () => {
  return (
    <div className="w-full bg-main-lighter rounded-lg shadow-lg overflow-hidden ">
      <div className="bg-main-color text-white text-3xl font-bold p-2.5">Chat</div>
      <div>
        {chats.map(chat => (
          <ChatItemList key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;