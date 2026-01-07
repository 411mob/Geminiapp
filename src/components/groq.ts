interface Message {
  role: "user" | "assistant";
  content: string;
}

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function callGroq(message: Message[]):Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error("GROQ APIキーが設定されていません。");
  }

  const groqMessages = message.map(msg => ({
    role: msg.role === "user" ? "user" : "assistant",
    content: msg.content,
  }));

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      messages: groqMessages,
      model: "mixtral-8x7b-32768",
      stream: false,
      temperature: 0.7,
    })
  });

  if (!response.ok) {
    throw new Error(`GROQ APIエラー: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
