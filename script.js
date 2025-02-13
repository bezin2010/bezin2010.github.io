// Função para alternar entre as páginas
function switchPage(pageId) {
    // Remove a classe 'active' de todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Adiciona a classe 'active' à página selecionada
    const selectedPage = document.getElementById(pageId);
    selectedPage.classList.add('active');
}