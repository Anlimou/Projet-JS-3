
// const btnEditAdmin = document.querySelector("#btn-edit");
// const navAdmin = document.querySelector("#nav-admin");
// const token = localStorage.getItem("token Sophie Bluel");
// const loginLogoutLink = document.querySelector(".login-logout-link");

// // temps  de validité du token pour faire apparaître ou non les fonctionnalités d'admin
// if (token) {
//     var tokenData = jwt_decode(token);
//     var tokenExpiracy = tokenData.exp - Date.now() / 1000;
// }

// if (token && tokenExpiracy >= 0) {
//     openModalBtn.classList.remove("display-none");
//     navAdmin.style.display = "flex";
//     loginLogoutLink.innerHTML = "logout";
  
//     loginLogoutLink.addEventListener('click', (e) => {
//       e.preventDefault();
//       location.reload();
//       localStorage.removeItem("token Sophie Bluel")
//     })
    
//   } else {
//     openModalBtn.classList.add("display-none");
//     navAdmin.style.display = "none";
//     loginLogoutLink.innerHTML = "login";
//   }