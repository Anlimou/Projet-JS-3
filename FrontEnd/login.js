// const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('form-login');
const errorMessageConnexion = document.getElementById('error-message-connexion');

function sendFormConnexion(e) {
  e.preventDefault();
  
  const emailValue = document.querySelector("#email").value;
  const passwordValue = document.querySelector('#password') .value;
 
  
  const user = { 
    email: emailValue,
    password: passwordValue
  };
  
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user), 
  })
    .then((response) => {
      if (response.ok === false ) {
        errorMessageConnexion.textContent = "Erreur d'utilisateur ou de mot de passe, veuillez réessayer";
      }
       else {
        response.json().then((data) => {
          errorMessageConnexion.textContent = "Connexion établie, redirection...";
          errorMessageConnexion.style.color = "green";
          
          const token = data.token;
          localStorage.setItem('token', token);
          
          location.href = "./index.html";
        });
      }
    })
    .catch((err) => {
      errorMessageConnexion.textContent = "Erreur d'API ou de connexion";
    });
}

loginForm.addEventListener("submit", sendFormConnexion);
