import './App.css'
import InputComponent from './components/input'
import Display, { type Message } from './components/display'
import { useState } from 'react'
import { sendMessageToGemini } from './components/groq'

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    // ユーザーのメッセージを追加
    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Geminiに送信
    setIsLoading(true);
    try {
      const response = await sendMessageToGemini(content);
      const geminiMessage: Message = {
        role: "gemini",
        content: response.text || "応答を取得できませんでした",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, geminiMessage]);
    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage: Message = {
        role: "gemini",
        content: "エラーが発生しました。もう一度お試しください。",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>✨ Gemini チャット</h1>
      <Display messages={messages} isLoading={isLoading} />
      <InputComponent onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  )
}

export default App