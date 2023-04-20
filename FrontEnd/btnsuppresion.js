// demande le code se excuter apres le charement de la page
window.addEventListener('load', (event) => {
  // demande a l'ordi de recuppere le btn 
  let BtnDelete = document.querySelectorAll('.btn-delete');
  // avac forEach je lui dis je selectionné le bouton soie btn0 btn1...
  
    BtnDelete.forEach((btn,index)=>{
      btn.addEventListener('click', ()=>{
      let Id= btn.getAttribute('data-id');
      deleteData('',Id);

      console.log(btn.getAttribute('data-id'))  

      });
      

    })
    
    
 
});



// BtnDelete[0].addEventListener('click',() =>{
//  console.log(BtnDelete[0].innerHTML)
// })



  function deleteData(modalCardDel, indexCardDel) {
    fetch(`http://localhost:5678/api/works/${indexCardDel}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: `Bearer b`,
      },
    })
      .then((response) => {
        const figurePortfolio = document.querySelectorAll(".figure-portfolio");
        if (!response.ok) {
          alert(
            "Vous n'êtes pas autorisé à supprimer un élément, si vous avez les droits, veuillez vous reconnecter s'il vous plaît."
          );
          console.log(
            "Vous n'êtes pas autorisé à supprimer un élément, si vous avez les droits, veuillez vous reconnecter s'il vous plaît."
          );
        } else {
          console.log("requête supprimé effectuée");
          //Une autre solution est d'appeler mon API, qui appelle les fonctions createCards() et createModalCards() qui suppriment les anciennnes données avec un innertHTML = ""; et recréent mes cards avec un nouvel appel API ;
          // appelApi1();
          modalCardDel.remove();
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






// // // document.addEventListener('click', (e) => {
// //   if(e.target.className === "btn-delete") {
// //       console.log("OUI")
//       // let ctnModaleGalery = e.target.parentElement;
//       // let gallerymodal  = gallerymodal.getAttribute('gallerymodal');
      
//       // fetch(`http://localhost:5678/api/works/${gallerymodal}`, {
//       //   method: 'DELETE',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //     'Authorization': `Bearer ${token}`
//       //   }
//       // })
//       // .then(response => {
//       //   if (response.ok) {
//       //     gallerymodal.remove();
//       //     const portfolioCards = document.querySelectorAll('.portfolio-card');
//       //     portfolioCards.forEach(card => {
//       //       if (card.getAttribute('index') === gallerymodal) {
//       //         card.remove();
//       //       }
//       //     });
//       //   } else {
//       //     alert('Erreur lors de la suppression');
//       //   }
//       // })
//       // .catch(error => console.error(error));
//     }
//   });


  //   document.addEventListener('click', (e) => {
//     if (e.target.classList.contains('btn-delete')) {
//       const modalCard = e.target.parentElement;
//       const indexCard = modalCard.getAttribute('index');
      
//       fetch(`http://localhost:5678/api/works/${indexCard}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       })
//       .then(response => {
//         if (response.ok) {
//           modalCard.remove();
//           const portfolioCards = document.querySelectorAll('.portfolio-card');
//           portfolioCards.forEach(card => {
//             if (card.getAttribute('index') === indexCard) {
//               card.remove();
//             }
//           });
//         } else {
//           alert('Erreur lors de la suppression');
//         }
//       })
//       .catch(error => console.error(error));
//     }
//   });

//   console.log (btnsDelete);