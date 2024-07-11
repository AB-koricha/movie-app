document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
  
    if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
    }
  
    if (registerForm) {
      registerForm.addEventListener('submit', handleRegister);
    }
  
    checkLoginStatus();
  });
  
  function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    axios.get(`http://localhost:3000/users?username=${username}&password=${password}`)
      .then(response => {
        if (response.data.length > 0) {
          localStorage.setItem('user', JSON.stringify(response.data[0]));
          window.location.href = 'index.html';
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  }
  
  function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
  
    axios.get(`http://localhost:3000/users?username=${username}`)
      .then(response => {
        if (response.data.length > 0) {
          errorMessage.textContent = 'Username already exists';
        } else {
          axios.post('http://localhost:3000/users', { username, password })
            .then(response => {
              alert('Registration successful');
              window.location.href = 'login.html';
            })
            .catch(error => {
              console.error('Error registering:', error);
              errorMessage.textContent = 'Error registering user';
            });
        }
      })
      .catch(error => {
        console.error('Error checking username:', error);
        errorMessage.textContent = 'Error checking username';
      });
  }
  
  function checkLoginStatus() {
    const userStatus = document.getElementById('user-status');
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && userStatus) {
      userStatus.textContent = `Logged in as ${user.username}`;
    }
  }
  