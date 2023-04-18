let btnsDelete = document.querySelector('.btn-delete');

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
      const modalCard = e.target.parentElement;
      const indexCard = modalCard.getAttribute('index');
      
      fetch(`http://localhost:5678/api/works/${indexCard}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          modalCard.remove();
          const portfolioCards = document.querySelectorAll('.portfolio-card');
          portfolioCards.forEach(card => {
            if (card.getAttribute('index') === indexCard) {
              card.remove();
            }
          });
        } else {
          alert('Erreur lors de la suppression');
        }
      })
      .catch(error => console.error(error));
    }
  });