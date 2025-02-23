document.addEventListener('DOMContentLoaded', function () {
  const title = document.title;
  let index = 0;
  let isDeleting = false;
  let speedAppear = 300; // Vitesse d'apparition (ajoutez une lettre)
  let speedDelete = 100;  // Vitesse de suppression (supprime une lettre)
  let deleteDelay = 100;  // Intervalle de suppression pour rendre l'effet plus fluide

  function updateTitle() {
      if (isDeleting) {
          document.title = title.substring(0, index);
          index--;
          if (index === 0) {
              isDeleting = false;
              setTimeout(updateTitle, deleteDelay); // Pause avant de recommencer à afficher
          } else {
              setTimeout(updateTitle, speedDelete); // Supprime une lettre par intervalle
          }
      } else {
          document.title = title.substring(0, index + 1);
          index++;
          if (index === title.length) {
              isDeleting = true;
              setTimeout(updateTitle, 1000); // Pause avant de commencer à effacer
          } else {
              setTimeout(updateTitle, speedAppear); // Ajoute une lettre par intervalle
          }
      }
  }

  updateTitle(); // Démarre l'animation dès le chargement de la page
});

window.onload = () => {
  const titre = document.querySelector('.titre-points');
  
  // Mettre à jour la taille du titre si la fenêtre change
  const updatePoints = () => {
    const titreRect = titre.getBoundingClientRect();
    const numberOfPoints = 200;

    // Supprimer les anciens points
    const existingPoints = document.querySelectorAll('.point');
    existingPoints.forEach(point => point.remove());

    for (let i = 0; i < numberOfPoints; i++) {
      // Créer un point
      const point = document.createElement('div');
      point.classList.add('point');
      
      // Taille fixée pour avoir des points très fins
      const size = 3; // Point de 1px
      point.style.width = `${size}px`;
      point.style.height = `${size}px`;

      // Position aléatoire autour du titre (dans ses limites)
      const xPos = Math.random() * titreRect.width;
      const yPos = Math.random() * titreRect.height;
      
      // Positionner le point par rapport au titre
      point.style.left = `${titreRect.left + xPos}px`;
      point.style.top = `${titreRect.top + yPos}px`;

      // Animation aléatoire : durée, retard et vitesse
      const animationDuration = Math.random() * 2 + 2; // entre 2s et 4s
      const animationDelay = Math.random() * 2; // Retard entre 0s et 2s
      point.style.animationDuration = `${animationDuration}s`;
      point.style.animationDelay = `${animationDelay}s`;

      // Ajouter le point au DOM
      document.body.appendChild(point);
    }
  };

  // Initialiser les points dès le chargement
  updatePoints();

  // Mettre à jour les points à chaque changement de taille de la fenêtre
  window.addEventListener('resize', updatePoints);
};
