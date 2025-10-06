(function(){
  const chatBox = document.getElementById("chat-box");
  const input = document.getElementById("user-input");
  let chatHistory = [];

  // Gửi lời chào khi load trang
  window.addEventListener("DOMContentLoaded", () => {
    sendWelcomeMessage();
  });

  function sendWelcomeMessage() {
    const welcomeText = "Đây là chatbot Nguyễn Du – sẵn sàng trò chuyện về văn học và nhân tình thế thái.";
    addMessage("bot", welcomeText);
  }

  // Gửi tin nhắn lên backend
  window.sendMessage = async function(){
    const text = input.value.trim();
    if(!text) return;

    addMessage("user", text);
    input.value="";

    chatHistory.push({ role:"user", parts:[{text}] });

    try {
      const response = await fetch("http://localhost:3001/chat", {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();

      // Nếu backend trả về reply
      if(data.reply){
        addMessage("bot", data.reply);
        chatHistory.push({ role:"model", parts:[{ text:data.reply }] });
      } else {
        addMessage("bot", "Backend không trả lời được.");
      }

    } catch(err){
      console.error(err);
      addMessage("bot","Lỗi kết nối với server.");
    }
  }

  // Thêm tin nhắn vào chat box
  function addMessage(sender,text){
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${sender}`;
    msgDiv.innerHTML = `<div class="bubble">${text}</div>`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
})();
