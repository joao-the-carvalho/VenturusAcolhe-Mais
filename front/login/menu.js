document.addEventListener('DOMContentLoaded', function() {
    const btnPsicologo = document.getElementById('btnPsicologo');
    const btnPaciente = document.getElementById('btnPaciente');
    const crpField = document.getElementById('crpField');
    
    // Definindo a variável padrão para o tipo de usuário
    let tipoUsuario = 'paciente'; // padrão

    // Manipulando o clique do botão Psicólogo
    btnPsicologo.addEventListener('click', () => {
        tipoUsuario = 'psicologo'; // Altera o tipo de usuário para Psicólogo
        btnPsicologo.classList.add('active'); // Adiciona a classe active ao botão Psicólogo
        btnPaciente.classList.remove('active'); // Remove a classe active do botão Paciente
        crpField.style.display = 'block'; // Exibe o campo CRP
    });

    // Manipulando o clique do botão Paciente
    btnPaciente.addEventListener('click', () => {
        tipoUsuario = 'paciente'; // Altera o tipo de usuário para Paciente
        btnPaciente.classList.add('active'); // Adiciona a classe active ao botão Paciente
        btnPsicologo.classList.remove('active'); // Remove a classe active do botão Psicólogo
        crpField.style.display = 'none'; // Esconde o campo CRP
    });

    // Função para o login
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', async function() {
        const email = document.querySelector('input[type="email"]').value;
        const password = document.querySelector('input[type="password"]').value;
        
        if (!email || !password) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        try {
            // Envia a requisição de login para o backend
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    senha: password,
                    tipoUsuario: tipoUsuario, // Envia o tipo de usuário
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Se o login for bem-sucedido, redireciona ou faz outra ação
                alert('Login realizado com sucesso!');
                // Redirecionar ou fazer algo mais...
            } else {
                // Caso o login falhe
                alert(data.mensagem || 'Erro ao tentar fazer login');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao tentar fazer o login');
        }
    });

    // Alternar visibilidade da senha
    function togglePasswordVisibility() {
        const passwordInput = document.getElementById('passwordInput');
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
    }

    // Anexar a função ao botão de alternar
    document.querySelector('.toggle-password')?.addEventListener('click', togglePasswordVisibility);
});
