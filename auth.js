let isLoginMode = true;

function openLogin() {
    const modal = document.getElementById('authModal');
    if(modal) {
        modal.classList.add('open');
        isLoginMode = true;
        updateAuthUI();
    }
}

function closeLogin() {
    const modal = document.getElementById('authModal');
    if(modal) modal.classList.remove('open');
}

function updateAuthUI() {
    const title = document.getElementById('authTitle');
    const btn = document.getElementById('authActionBtn');
    const link = document.getElementById('authSwitch');
    
    if (isLoginMode) {
        title.textContent = "Authorization";
        btn.textContent = "Sign In";
        btn.onclick = performLogin;
        link.textContent = "New here? Register";
    } else {
        title.textContent = "Registration";
        btn.textContent = "Sign Up";
        btn.onclick = performRegister;
        link.textContent = "Already have an account? Sign In";
    }
}

function switchAuthMode() {
    isLoginMode = !isLoginMode;
    updateAuthUI();
}

function performLogin() {
    const loginInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-pass');
    
    const login = loginInput.value;
    const pass = passInput.value;
    
    if(!login || !pass) { 
        alert("Please fill all fields"); 
        return; 
    }

    const user = window.LocalDB.loginUser(login, pass);
    if (user) {
        closeLogin();
        updateLoginButton();
        location.reload(); 
    } else {
        alert('Invalid credentials!');
    }
}

function performRegister() {
    const loginInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-pass');
    
    const login = loginInput.value;
    const pass = passInput.value;
    
    if(!login || !pass) { 
        alert("Please fill all fields"); 
        return; 
    }

    const user = window.LocalDB.registerUser(login, pass);
    if (user) {
        // Успішна реєстрація - автоматично логінимо
        closeLogin();
        updateLoginButton();
        location.reload();
    } else {
        alert('User with this login already exists!');
    }
}

function updateLoginButton() {
    const user = window.LocalDB.getCurrentUser();
    const btn = document.getElementById('loginBtn');
    
    if (user) {
        btn.textContent = user.login;
        // ЗМІНА: ТЕПЕР ПЕРЕХОДИТЬ В ПРОФІЛЬ
        btn.onclick = () => {
            window.location.href = 'profile.html';
        };
    } else {
        btn.textContent = 'Login';
        btn.onclick = openLogin;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateLoginButton();
    const switchLink = document.getElementById('authSwitch');
    if(switchLink) switchLink.onclick = switchAuthMode;
});