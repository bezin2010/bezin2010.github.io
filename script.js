let loggedInUser = null;
let users = []; // Este é um "banco de dados" simples de usuários
let posts = []; // Simula o banco de dados de postagens
let chats = {}; // Armazena chats entre usuários

// Função de Login
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    loggedInUser = user;
    document.getElementById('user-name').textContent = user.name;
    showMainScreen();
  } else {
    alert('Usuário ou senha incorretos');
  }
}

// Função de Cadastro
function signUp() {
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;
  const name = document.getElementById('signUpName').value;
  const classroom = document.getElementById('signUpClassroom').value;

  // Verificar se o email já existe
  if (users.some(u => u.email === email)) {
    alert('Email já cadastrado');
    return;
  }

  // Adicionar novo usuário
  users.push({ email, password, name, classroom });
  alert('Cadastro realizado com sucesso!');
  showLogin();
}

// Função para mostrar a tela de login
function showLogin() {
  document.getElementById('login-screen').style.display = 'block';
  document.getElementById('signup-screen').style.display = 'none';
}

// Função para mostrar a tela de criação de conta
function showSignUp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('signup-screen').style.display = 'block';
}

// Função para mostrar a tela principal após o login
function showMainScreen() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('signup-screen').style.display = 'none';
  document.getElementById('main-screen').style.display = 'block';
}

// Função para sair (logout)
function logout() {
  loggedInUser = null;
  showLogin();
}

// Função para criar uma postagem
function createPost() {
  const text = document.getElementById('postText').value;
  const image = document.getElementById('postImage').files[0];

  // Criar um objeto de postagem
  const newPost = {
    user: loggedInUser.name,
    text,
    image: image ? URL.createObjectURL(image) : null,
    comments: []
  };

  posts.push(newPost);
  displayPosts();
}

// Exibir as postagens
function displayPosts() {
  const feed = document.getElementById('feed');
  feed.innerHTML = ''; // Limpa o feed

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
      <h4>${post.user}</h4>
      <p>${post.text}</p>
      ${post.image ? `<img src="${post.image}" alt="Post image" />` : ''}
      <button onclick="addComment(${posts.indexOf(post)})">Comentar</button>
      <div class="comments">
        ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
      </div>
    `;
    feed.appendChild(postElement);
  });
}

// Adicionar comentário a uma postagem
function addComment(postIndex) {
  const comment = prompt('Escreva seu comentário:');
  if (comment) {
    posts[postIndex].comments.push(comment);
    displayPosts();
  }
}

// Função para iniciar chat privado
function startChat() {
  const chatUser = document.getElementById('chatUser').value;

  if (!chatUser) {
    alert('Digite o nome de um usuário para iniciar o chat');
    return;
  }

  if (!chats[chatUser]) {
    chats[chatUser] = [];
  }

  const message = prompt('Digite sua mensagem:');
  if (message) {
    chats[chatUser].push({ user: loggedInUser.name, message });
    displayChat(chatUser);
  }
}

// Exibir mensagens de chat
function displayChat(user) {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.innerHTML = chats[user].map(msg => `<p>${msg.user}: ${msg.message}</p>`).join('');
}
