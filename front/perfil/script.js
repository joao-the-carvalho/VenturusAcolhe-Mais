document.addEventListener('DOMContentLoaded', function() {
    // Função para o botão de alterar foto
    const photoButtons = document.querySelectorAll('.change-photo-btn');
    photoButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Botão "Alterar foto de perfil" clicado');
            // Implementação real abriria um seletor de arquivos
        });
    });
    
    // Função para o botão de editar
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Botão "Editar" clicado');
            // Implementação real abriria um formulário de edição
        });
    });
});