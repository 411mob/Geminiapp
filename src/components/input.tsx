import { useState } from "react";
import './input.css';

type InputComponentProps = {
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
};

function InputComponent({ onSendMessage, isLoading }: InputComponentProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [isComposing, setIsComposing] = useState(false);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-container">
      <div className="message-input">
        <textarea
          placeholder="Groqに質問してみよう... (Shift+Enter で改行)"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          value={inputValue}
          disabled={isLoading}
          rows={10}
        />
        <button 
          className="send-btn" 
          onClick={handleSend} 
          disabled={!inputValue.trim() || isLoading}
        >
          {isLoading ? "送信中..." : "送信"}
        </button>
      </div>
    </div>
  );
}

export default InputComponent;