// // Ecoute l'événement de clic sur l'élément "modalGallery"
// modalGallery.addEventListener('click', (e) => {
//   // Affiche l'élément sur lequel l'utilisateur a cliqué
//   if(e.target.className === "btn-delete") {
//      // Récupère l'index de la carte à supprimer
//   console.log(e.target.parentElement.getAttribute('index'));
//   let indexCard = parseInt(e.target.parentElement.getAttribute('index'));
//   let modalCard = e.target.parentElement;
//   // Appelle la fonction "deleteData" avec l'élément de la carte à supprimer et son index
//   deleteData(modalCard, indexCard)
//   }
// });

modalGallery.addEventListener('click', (e) => {
  if (e.target.className === "btn-delete") {
    const confirmDelete = confirm("Voulez-vous vraiment supprimer cet élément ?");
    if (confirmDelete) {
      console.log(e.target.parentElement.getAttribute('index'));
      let indexCard = parseInt(e.target.parentElement.getAttribute('index'));
      let modalCard = e.target.parentElement;
      deleteData(modalCard, indexCard);
    }
  }
});


// Fonction qui supprime les données de la carte sélectionnée

function deleteData(modalCardDel, indexCardDel) {
   // Envoie une requête de suppression à l'API avec l'index de la carte sélectionnée
  fetch(`http://localhost:5678/api/works/${indexCardDel}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      // Sélectionne toutes les figures du portfolio
      const figurePortfolio = document.querySelectorAll(".figure-portfolio");
      if (!response.ok) {
         // Affiche un message d'erreur si l'utilisateur n'a pas l'autorisation de supprimer la carte
        alert(
          "Vous n'êtes pas autorisé à supprimer un élément, si vous avez les droits, veuillez vous reconnnecter s'il vous plaît."
        );
        
      } else {
        
        modalCardDel.remove();
        // Parcourt toutes les figures du portfolio pour supprimer la carte correspondante
        figurePortfolio.forEach((elem) => {
          if (parseInt(elem.getAttribute("index")) === indexCardDel) {
            elem.remove();
          }
        });
      }
    })
    .catch(() => {
      alert("Erreur de connexion");
    });
};

