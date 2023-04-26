let btnToDataForm = document.querySelector(".btn-post-data");
let formaAjouProject = document.querySelector(".form-ajout-project");
let btnAjout = document.querySelector(".btn-post-data");
let btnBack = document.querySelector(".btn-back-modal");

let divInsideModalDelete = document.querySelector(".div-inside-modal-delete");
let divInsideModalPost = document.querySelector(".div-inside-modal-post ");

let imgDataForm = document.querySelector("#image-postform");
let titleDataForm = document.querySelector("#title-postform");
let categoryDataForm = document.querySelector("#category-postform");
let  btnLabel = document.querySelector('#btn-label');
let btnValide = document.querySelector(".btn-valide-postform");
let responsePostRequest = document.querySelector(".response-post-request");


//  gérer l'affichage d'un formulaire modal pour ajouter des données et
//  de revenir à un formulaire modal précédent, et également de récupérer l'image sélectionnée par l'utilisateur.

btnAjout.addEventListener("click", () => {
  divInsideModalDelete.classList.add("display-none");
  divInsideModalPost.classList.remove("display-none");
  btnBack.classList.remove("display-none");
});

btnBack.addEventListener("click", () => {
  divInsideModalDelete.classList.remove("display-none");
  divInsideModalPost.classList.add("display-none");
  btnBack.classList.add("display-none");
});

let imgToDisplay = document.querySelector(".image-from-input");

imgDataForm.addEventListener("change", () => readURL(imgDataForm));

//  fonction qui permet d'afficher l'image sélectionnée dans le  champ de formulaire en l'affichant dans une balise img et
//  en ajoutant une classe CSS pour en modifier la taille.

function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      const dataImgToPost = e.target.result;
      imgToDisplay.src = dataImgToPost;
      imgToDisplay.classList.add("img-h100-abs");
    };
    reader.readAsDataURL(input.files[0]);
    btnLabel.classList.add("display-none");
  }
};

// selection de tout les elements du dom
let allInputs = document.querySelectorAll(
  "#image-postform, #title-postform, #category-postform"
);

// ajoute un événement "input" à chaque élément de la liste "allInputs", et vérifie si tous les éléments de la liste ont une valeur.
//  Si c'est le cas, la classe "btn-unvalide" est supprimée du bouton "btnValide", sinon elle est ajoutée

allInputs.forEach((input) => {
  input.addEventListener("input", () => {

    if (
      allInputs[0].value.length > 0 &&
      allInputs[1].value.length > 0 &&
      allInputs[2].value.length > 0
    ) {
      btnValide.classList.remove("btn-unvalide");
    } else {
      btnValide.classList.add("btn-unvalide");
    }
  });
});

//  Ecoute de l'événement "submit" sur un formulaire nommé "formaAjouProject" et empêche le comportement par défaut de l'envoi du formulaire.
//  Ensuite, il récupère les données du formulaire (une image, un titre et une catégorie) et les stocke dans des variables. 
//  Enfin,  appelle une fonction nommée "callForm" avec ces variables comme arguments
formaAjouProject.addEventListener("submit", (e) => {
  e.preventDefault();

  let urlToPost = imgDataForm.files[0];

  let titleDataFormVal = titleDataForm.value;
  let categoryDataFormVal = categoryDataForm.value;

  callForm(urlToPost, titleDataFormVal, categoryDataFormVal);
});

// la  fonction envoie la requête POST à l'API  . La requête est envoyée avec un token d'authentification 
// et si elle réussit, une réponse positive est affichée dans la page.
//  Si la requête échoue, un message d'erreur est également affiché. 
// Si la requête réussit, un nouveau projet est créé avec les données renvoyées par l'API et est ajouté à la liste des projets dans la page.

function callForm(file, title, categoryVal) {
  let formData = new FormData();

  formData.append("title", title);
  formData.append("image", file);
  formData.append("category", categoryVal);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((res) => res.json())

    .then((data) => {
      responsePostRequest.textContent = "Données envoyées avec succès";
      responsePostRequest.style.color = "green";


      setTimeout(() => {

        divInsideModalPost.classList.add("display-none");
        divInsideModalDelete.classList.remove("display-none");
        responsePostRequest.textContent = "";

        imgToDisplay.src = "./assets/icons/image-regular.svg";
        imgToDisplay.classList.remove("img-h100-abs");
        btnLabel.classList.remove("display-none");

        imgDataForm.value = "";
        titleDataForm.value = "";
        categoryDataForm.value = "1";
        btnValide.classList.add("btn-unvalide");
        btnBack.classList.add("display-none");
        createProject(data.title, data.imageUrl, data.id, data.categoryId);
        filterFinal();
      }, 1000);
    })

    .catch((err) => {
      responsePostRequest.textContent =
        "Erreur dans l'envoie de données, vérifier que vous êtes bien connecté en tant qu'administrateur";
      responsePostRequest.style.color = "red";
      setTimeout(() => {
        responsePostRequest.textContent = "";
      }, 1000);
    });
}



//  fonction prend en paramètres un titre, une image, un ID et une catégorie,
//  puis crée un élément HTML figure contenant une image et un élément figcaption avec le titre, 
// et l'ajoute à la galerie . Ensuite, elle crée également un élément figure contenant une image,
//  un élément figcaption avec le texte "éditer" et un bouton de suppression, et l'ajoute à la modal
function createProject(title, img, id, categoryId) {  

  //Création des cards dans gallery
  let addProjectGallery = document.createElement('figure');
  addProjectGallery.setAttribute("index", id);
  addProjectGallery.setAttribute("category-id", categoryId);
  addProjectGallery.classList.add("figure-portfolio")

  let addProjectGalleryImg = document.createElement('img');
  addProjectGalleryImg.setAttribute("crossorigin", "anonymous");
  addProjectGalleryImg.src = img;

  let addProjectGalleryFigcaption = document.createElement('figcaption');
  addProjectGalleryFigcaption.textContent = title;

  addProjectGallery.appendChild(addProjectGalleryImg);
  addProjectGallery.appendChild(addProjectGalleryFigcaption);

  gallery.appendChild(addProjectGallery);



  //création des cards dans  la modale
  let addPostedModalCard = document.createElement("figure");
  addPostedModalCard.setAttribute('index', id);

  let addPostedModalImg = document.createElement("img");
  addPostedModalImg.setAttribute("crossorigin", "anonymous");
  addPostedModalImg.src = img;

  let addPostedModalFigcaption = document.createElement('figcaption');
  addPostedModalFigcaption.textContent = "éditer";

  let addPostedModalBtn = document.createElement("button");
  addPostedModalBtn.classList.add("btn-delete");
  addPostedModalBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

  addPostedModalCard.appendChild(addPostedModalImg);
  addPostedModalCard.appendChild(addPostedModalFigcaption);
  addPostedModalCard.appendChild(addPostedModalBtn);

  divGalleryModal.appendChild(addPostedModalCard);
}

