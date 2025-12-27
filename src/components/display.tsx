import './display.css';

type Message = {
  role: "user" | "gemini";
  content: string;
  timestamp: Date;
};

type DisplayProps = {
  messages: Message[];
  isLoading?: boolean;
};

function Display({ messages, isLoading }: DisplayProps) {
  return (
    <div className="chat-container">
      {messages.length === 0 && !isLoading ? (
        <div className="empty-chat">
          <p>Geminiに質問してみましょう！✨</p>
        </div>
      ) : (
        <div className="messages-list">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role === "user" ? "my-message" : "other-message"}`}
            >
              <div className="message-avatar">
                {message.role === "user" ? "👤" : "✨"}
              </div>
              <div className="message-content">
                <div className="message-role">
                  {message.role === "user" ? "あなた" : "Gemini"}
                </div>
                <div className="message-text">{message.content}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export type { Message };
export default Display;