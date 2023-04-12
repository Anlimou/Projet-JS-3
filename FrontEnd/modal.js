let modal = document.getElementById("Modal");
let openModalBtn = document.getElementById("Mybtn");
let closeModalBtn = document.querySelector(".close-motal");
let btnRetour = document.querySelector(".back-modal");let btnAjout = document.getElementById("btn-ajout");
let ctnModaleGalery = document.getElementById("ctn-modalgalary");
let ctnAjoutProjet = document.getElementById("Ajout-projet");


openModalBtn.addEventListener("click",function(){
  modal.style.display =" block" 
});

closeModalBtn.addEventListener("click",function(){
  modal.style.display =" none" 
});



btnAjout.addEventListener("click",function(){

  ctnAjoutProjet.style.display ="block";
  closeModalBtn.style.display = "block";
  btnRetour.style.display =" block";
  ctnModaleGalery.style.display ="none";
});


// retour à la galerie

btnRetour.addEventListener("click", function() {
  ctnModaleGalery.style.display ="block";
  closeModalBtn.style.display = "block";
  btnRetour.style.display =" none ";
  ctnAjoutProjet.style.display ="none";
});







// closeModalBtn.addEventListener("click",function(){
//   modal.style.display =" none" 
// })

// closeModalBtn.addEventListener("click", function() {
//     modal.style.display = "none !important";
//   });
  
// window.addEventListener("click", function(event) {
// if (event.target == modal) {
//       modal.style.display = "none !important";
// }
// });




// let Mymodal = document.getElementById("myModal");
// let btnopenModal =document.getElementById("Mybtn");

// btn.onclick = function() {
//     Mymodal.style.display = "block;
// }