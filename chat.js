document.addEventListener('DOMContentLoaded', function() {
  const chatForm = document.getElementById('chatForm');
  const chatMessages = document.getElementById('chatMessages');
  // Simulação: todas as mensagens ficam armazenadas em LocalStorage
  let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

  function displayMessages() {
    chatMessages.innerHTML = '';
    messages.forEach(msg => {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'chat-message';
      msgDiv.textContent = `${msg.username}: ${msg.text} (${msg.timestamp})`;
      chatMessages.appendChild(msgDiv);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  displayMessages();

  if (chatForm) {
    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const chatInput = document.getElementById('chatInput');
      const text = chatInput.value;
      const user = JSON.parse(localStorage.getItem('user'));
      const newMsg = {
        username: user.username,
        text,
        timestamp: new Date().toLocaleTimeString()
      };
      messages.push(newMsg);
      localStorage.setItem('chatMessages', JSON.stringify(messages));
      displayMessages();
      chatInput.value = '';
    });
  }
});