// Seleccionar elementos del DOM
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');

// Función para mostrar mensajes
function showMessage(text, isError = true) {
  message.textContent = text;
  message.style.color = isError ? '#e74c3c' : '#2ecc71';
}

// Registro de usuario
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    try {
      const response = await fetch('http://your_host/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        showMessage(data.message, false);
      } else {
        showMessage(data.message);
      }
    } catch (error) {
      showMessage('Error al registrar el usuario.');
    }
  });
}

// Inicio de sesión
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const response = await fetch('http://your_host/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        showMessage(data.message, false);
      } else {
        showMessage(data.message);
      }
    } catch (error) {
      showMessage('Error al iniciar sesión.');
    }
  });
}
