let testImg = document.querySelector(".test-img");
let divSearchBtns = document.querySelector(".Recherche");
let selectCatPostform = document.querySelector("#category-postform");
let eraseBtn = document.querySelector(".erase-btn");
let gallery = document.querySelector(".gallery");
let divHiddenBody = document.querySelector(".div-hidden-body");
let token = localStorage.getItem("token Sophie Bluel");
let modalGallery = document.querySelector(".div-gallery-modal");
let navAdmin = document.querySelector("#nav-admin");
let btnEditAdmin = document.querySelector("#btn-edit");
let loginLogoutLink = document.querySelector(".login-logout-link");

//  décoder un token JWT et de calculer sa durée de validité restante.
if (token) {
  var tokenData = jwt_decode(token);
  var tokenExpiracy = tokenData.exp - Date.now() / 1000;
}

let urlGet = "http://localhost:5678/api/works";
let urlGetCategories = "http://localhost:5678/api/categories";

appelApi1();
// appel de l'API 
function appelApi1() {
  fetch(urlGet)
    .then((response) =>
      response.json().then((data) => {
        createCards(data);
        createModalCards(data);
      })
    )
    .catch((err) => {
      alert(err);
    });
}

function createCards(values) {
  values.map((val) => {
    let galleryCard = document.createElement("figure");
    galleryCard.setAttribute("index", val.id);
    galleryCard.setAttribute("category-id", val.category.id);
    galleryCard.classList.add("figure-portfolio");

    let galleryCardImg = document.createElement("img");
    galleryCardImg.setAttribute("crossorigin", "anonymous");
    galleryCardImg.src = val.imageUrl;

    let galleryCardTxt = document.createElement("figcaption");
    galleryCardTxt.textContent = val.title;

    galleryCard.appendChild(galleryCardImg);
    galleryCard.appendChild(galleryCardTxt);

    gallery.appendChild(galleryCard);
  });
}

fetchCategories(urlGetCategories);

function fetchCategories(url) {
  fetch(url)
    .then((response) =>
      response.json().then((data) => {
        const arrayOptions2 = [{ id: 0, name: "Tous" }, ...data];
        createSelectCat(data);
        createCatBtns(arrayOptions2);
      })
    )
    .catch((err) => {
      alert(err);
    });
}



function createCatBtns(arrayCategories) {
  arrayCategories.map((elem) => {
    let btnCat = document.createElement("button");
    btnCat.value = elem.id;
    btnCat.textContent = elem.name;
    btnCat.className = "btn-cat";
    divSearchBtns.appendChild(btnCat);
    
    if (btnCat.value == 0) {
      btnCat.classList.add("active-cat");
    }
    btnCat.addEventListener("click", () => {
      filterFromCards(btnCat);
    });
  });
}

function createSelectCat(values) {
  values.map((val) => {
    let selectDomOption = document.createElement("option");
    selectDomOption.textContent = val.name;
    selectDomOption.value = val.id;
    selectDomOption.setAttribute("index-category", val.id);
    selectCatPostform.appendChild(selectDomOption);
  });
}

// Section MODAL début
let body = document.querySelector("body");
let modalDiv = document.querySelector("#modal");
let divGalleryModal = document.querySelector(".div-gallery-modal");
let btnShowModal = document.querySelector(".modify-span");
let eraseGallery = document.querySelector(".txt-erase-gallery");
let btnCloseModal = document.querySelector(".btn-close");
let openModal = document.querySelectorAll("#btn-edit, .modify-span");

function createModalCards(values2) {
  values2.map((val2) => {
    let modalDivCard = document.createElement("figure");
    modalDivCard.setAttribute("index", val2.id);

    let modalDivCardImg = document.createElement("img");
    modalDivCardImg.setAttribute("crossorigin", "anonymous");
    modalDivCardImg.src = val2.imageUrl;

    let modalDivCardTxt = document.createElement("figcaption");
    modalDivCardTxt.textContent = "éditer";

    let modalDivCardBtn = document.createElement("button");
    modalDivCardBtn.classList.add("btn-delete");
    modalDivCardBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    modalDivCard.appendChild(modalDivCardImg);
    modalDivCard.appendChild(modalDivCardTxt);
    modalDivCard.appendChild(modalDivCardBtn);

    divGalleryModal.appendChild(modalDivCard);
  });
}

body.addEventListener("click", () => {
  modalDiv.style.visibility = "hidden";
  divHiddenBody.classList.add("display-none");
});

btnCloseModal.addEventListener("click", () => {
  modalDiv.style.visibility = "hidden";
  divHiddenBody.classList.add("display-none");
});

modalDiv.addEventListener("click", (e) => {
  e.stopPropagation();
});

//Si mon token existe et que son délai n'est pas dépassé, mon bouton "cliquez ici apparaît ainsi que ma navbar d'administrateur "
if (token && tokenExpiracy >= 0) {
  btnShowModal.classList.remove("display-none");
  navAdmin.style.display = "flex";
  loginLogoutLink.innerHTML = "logout";

  loginLogoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    location.reload();
    localStorage.removeItem("token Sophie Bluel")
  })
  
} else {
  btnShowModal.classList.add("display-none");
  navAdmin.style.display = "none";
  loginLogoutLink.innerHTML = "login";
}

openModal.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.stopPropagation();
    modalDiv.style.visibility = "visible";

    divHiddenBody.classList.remove("display-none");
  });
});

let selectionnedCatVal = 0;

function filterFromCards(btnCat) {
  let btnCatValue = parseInt(btnCat.value);
  selectionnedCatVal = btnCatValue;

  const btnsCategories = document.querySelectorAll('.btn-cat');
  btnsCategories.forEach((btn) => {
    if(btn.className.includes("active-cat")) {
      btn.classList.remove("active-cat");
    }
  });
  btnCat.classList.add("active-cat");

  filterFinal();
  // J'ai décompose ma fonction de filtrage en 2 car quand je créait un élément en étant dans un filtre, l'élément s'affichait dans tout les filtres.
  // Je rappel donc filterFinal() quand je créer un objet avec POST
}

function filterFinal() {
  let figurePortfolio2 = document.querySelectorAll(".figure-portfolio");

  // J'ai utilisé cette méthode plutôt que filter() car filter ne fonctionne pas avec une nodeList
  figurePortfolio2.forEach((elem) => {
    elem.classList.remove("display-none");

    if (selectionnedCatVal !== 0) {
      if (parseInt(elem.getAttribute("category-id")) !== selectionnedCatVal) {
        elem.classList.add("display-none");
      }
    }
  });
}
