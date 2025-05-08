document.addEventListener('DOMContentLoaded', function() {
    // Seleção do tipo de usuário
    const typeOptions = document.querySelectorAll('.type-option');
    
    typeOptions.forEach(option => {
        option.addEventListener('click', function() {
            typeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Funcionalidade do botão de login
    const loginBtn = document.getElementById('loginBtn');
    
    loginBtn.addEventListener('click', function() {
        const email = document.querySelector('input[type="email"]').value;
        const password = document.querySelector('input[type="password"]').value;
        const userType = document.querySelector('.type-option.active')?.dataset.type;
        
        if (!userType) {
            alert('Por favor, selecione um tipo de usuário (Psicólogo ou Paciente)');
            return;
        }
        
        if (!email || !password) {
            alert('Por favor, preencha todos os campos');
            return;
        }
        
        // Aqui você normalmente enviaria os dados para um servidor
        console.log('Tentativa de login:', { userType, email, password });
        alert('Login realizado com sucesso! (Simulação)');
    });

    // Link de cadastro
    const registerLink = document.getElementById('registerLink');
    
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Redirecionando para a página de cadastro...');
        // window.location.href = 'register.html'; // Descomente para realmente redirecionar
    });

    // Alternar visibilidade da senha
    function togglePasswordVisibility() {
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput) {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
        }
    }

    // Anexar a função ao botão de alternar
    document.querySelector('.toggle-password')?.addEventListener('click', togglePasswordVisibility);
});