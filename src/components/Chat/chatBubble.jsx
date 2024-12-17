const ChatBubble = ({ chat }) => {
    // Menentukan apakah pesan dari user atau admin
    const isUser = chat.SenderType === "user";

    // Menentukan alignment bubble
    const containerClass = isUser ? "justify-start" : "justify-end";
    const bubbleClass = isUser ? "chat-start " : "chat-end";
    const colorBubble = isUser ? "bg-main-lighter" : "bg-light-2"

    return (
        <div className={`flex ${containerClass} items-end my-2`}>
            <div>
                {/* Chat Bubble */}
                <div className={`chat ${bubbleClass}`}>
                   <div className={`chat-bubble  text-black ${colorBubble} text-light`}> {chat.Message}</div>
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
