const ChatBubble = ({ chat }) => {
    // Menentukan apakah pesan dari user atau admin
    const isUser = chat.SenderType === "user";

    // Menentukan alignment bubble
    const containerClass = isUser ? "justify-start" : "justify-end";
    const bubbleClass = isUser ? "chat-start" : "chat-end";

    return (
        <div className={`flex ${containerClass} items-end my-2`}>
            {/* Avatar tampil hanya jika pesan diterima */}
            {isUser && (
                <img
                    src={chat.avatar || "https://via.placeholder.com/40"} // Default avatar jika tidak ada
                    alt="avatar"
                    className="w-10 h-10 rounded-full mr-2"
                />
            )}
            <div>
                {/* Chat Bubble */}
                <div className={`chat ${bubbleClass}`}>
                   <div className="chat-bubble bg-main-lighter text-black text-light"> {chat.Message}</div>
                </div>

                {/* Waktu Pesan */}
                <div className="text-gray-500 text-xs mt-1">
                    {new Date(chat.CreatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;
