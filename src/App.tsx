import './App.css'
import InputComponent from './components/input'
import Display, { type Message } from './components/display'
import { useState } from 'react'
import { callGroq } from './components/groq'

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    setIsLoading(true);
    try {
      const groqMessages: Array<{ role: "user" | "assistant"; content: string }> = messages.map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      }));
      groqMessages.push({ role: "user", content });
      
      const response = await callGroq(groqMessages);

      const assistantMessage: Message = {
        role: "assistant",
        content: response || "応答を取得できませんでした",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Groq API error", error);

      const errorMessage: Message = {
        role: "assistant",
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
      <h1>✨ Groq チャット</h1>
      <Display messages={messages} isLoading={isLoading} />
      <InputComponent onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  )
}

export default App