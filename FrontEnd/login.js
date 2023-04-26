let formLogin = document.querySelector(".form-login"); // Récupération de l'élément HTML ayant la classe "form-login" dans une variable
let testBtnLogin = document.querySelector(".test-btn-login"); // Récupération de l'élément HTML ayant la classe "test-btn-login" dans une variable
let loginConnexion = document.querySelector("#login-connexion"); // Récupération de l'élément HTML ayant l'identifiant "login-connexion" dans une variable
let MessageError = document.querySelector("#error-message-connexion"); // Récupération de l'élément HTML ayant l'identifiant "error-message-connexion" dans une variable

function sendFormConnexion(e) { // Définition de la fonction sendFormConnexion avec l'événement e en paramètre
  e.preventDefault(); // Empêche la soumission du formulaire
  let emailValue = document.querySelector("#email").value; // Récupération de la valeur du champ email dans une variable
  let passwordValue = document.querySelector("#password").value; // Récupération de la valeur du champ password dans une variable
  let user = { // Définition d'un objet user contenant les valeurs des champs email et password
    email: emailValue,
    password: passwordValue,
  };

  fetch(`http://localhost:5678/api/users/login`, { // Envoi d'une requête POST à l'URL spécifiée avec l'objet user dans le corps de la requête
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  })
    .then((response) => { // Traitement de la réponse de la requête
      if (response.ok === false) { // Si la réponse indique une erreur
        MessageError.textContent = "Erreur d'utilisateur ou de mot de passe, veuillez réessayer"; // Affichage d'un message d'erreur dans l'élément HTML ayant l'identifiant "error-message-connexion"
      } else { // Sinon
        response.json().then((data) => { // Conversion de la réponse en JSON et traitement des données retournées
          MessageError.textContent = "Connexion établie, redirection..."; // Affichage d'un message de succès dans l'élément HTML ayant l'identifiant "error-message-connexion"
          MessageError.style.color = "green"; // Modification de la couleur du texte de l'élément HTML ayant l'identifiant "error-message-connexion" en vert
          let token = data.token; // Récupération du token dans les données retournées
          localStorage.setItem("token Sophie Bluel", token); // Stockage du token dans le localStorage avec une clé spécifiée
          location.href= "./index.html"; // Redirection vers une autre page HTML
        });
      }
    })
    .catch((err) => { // Gestion des erreurs de la requête
      MessageError.textContent = "Erreur d'API ou de connexion"; // Affichage d'un message d'erreur dans l'élément HTML ayant l'identifiant "error-message-connexion"
    });
}

loginConnexion.addEventListener("submit", sendFormConnexion); // Ajout d'un écouteur d'événement sur la soumission du formulaire qui appelle la fonction sendFormConnexion