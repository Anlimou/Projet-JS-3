// Récupération des éléments du formulaire
let BtnAjout = document.getElementById('valider');


BtnAjout.addEventListener("click", (e) => {
  e.preventDefault();

fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        alert("Projet ajouté avec succès !");
        window.location.href = "/projets";
      } else {
        alert("Une erreur s'est produite.");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Une erreur s'est produite.");
    });
    
  let imageInput = document.getElementsByClassName('image-postform');
  let titreInput = document.getElementById('titre-ajout');
  let categInput = document.getElementById('categ-ajout');

  const formData = new FormData();

  formData.append("image", imageInput.files[0]);
  formData.append("titre", document.getElementById("titre-ajout").value);
  formData.append("categorie", document.getElementById("categ-ajout").value);

  
});
