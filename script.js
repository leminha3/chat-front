const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
let chatHistory = [];

window.onload = () => {
  sendWelcomeMessage();
};

function sendWelcomeMessage() {
  const welcomeText = "Đây là chatbot Nguyễn Du – mô phỏng đại thi hào trong thời hiện đại, sẵn sàng trò chuyện về văn học và nhân tình thế thái.";

  addMessage("bot", welcomeText);
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  console.log("📤 Gửi câu:", text);  

  addMessage("user", text);
  input.value = "";

  const validHistory = chatHistory.filter(msg => msg.role === "user" || msg.role === "model");

  try {
    const response = await fetch("http://localhost:3001/chat", {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
  },
   body: JSON.stringify({ message: text })
});

    const data = await response.json();

    if (data.reply) {
      addMessage("bot", data.reply);

      chatHistory.push(
        { role: "user", parts: [{ text }] },
        { role: "model", parts: [{ text: data.reply }] }
      );
    } else {
      addMessage("bot", "Xin lỗi, ta chưa thể trả lời câu hỏi này.");
    }

  } catch (error) {
    console.error(error);
    addMessage("bot", "Xin lỗi, ta gặp chút trục trặc rồi...");
  }
}



function addMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}`;
  msgDiv.innerHTML = `<div class="bubble">${text}</div>`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

