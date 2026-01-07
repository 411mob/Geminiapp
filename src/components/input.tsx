import { useState } from "react";
import './input.css';

type InputComponentProps = {
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
};

function InputComponent({ onSendMessage, isLoading }: InputComponentProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-container">
      <div className="message-input">
        <input
          type="text"
          placeholder="Groqに質問してみよう..."
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          value={inputValue}
          disabled={isLoading}
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