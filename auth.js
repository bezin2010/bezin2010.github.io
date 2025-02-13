document.addEventListener('DOMContentLoaded', function() {
  // Se estivermos na página de login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const year = document.getElementById('year').value;
      const turma = document.getElementById('class').value;
      const remember = document.getElementById('rememberMe').checked;
      
      // Salva os dados do usuário (simulação via LocalStorage)
      const user = { username, password, year, turma };
      localStorage.setItem('user', JSON.stringify(user));
      if (remember) {
        localStorage.setItem('remember', 'true');
      } else {
        localStorage.removeItem('remember');
      }
      // Redireciona para o feed
      window.location.href = 'feed.html';
    });
  }

  // Logout – disponível em todas as páginas protegidas
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    });
  }

  // Opcional: redirecionar para login se não estiver logado
  // (Você pode inserir uma lógica de proteção nas páginas, se desejar)
});