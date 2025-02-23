document.addEventListener('DOMContentLoaded', () => {
  // Gestion des liens et effets divers (inchangés)
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    link.addEventListener('mouseover', () => { link.style.color = '#46c406'; });
    link.addEventListener('mouseout', () => { link.style.color = '#f0f0f0'; });
  });
  document.addEventListener('contextmenu', (event) => { event.preventDefault(); });
  
  const kuraTitle = document.querySelector('header h1');
  const heroTitle = document.querySelector('#hero h2');
  const heroText = document.querySelector('#hero p');
  const aboutSection = document.querySelector('#about');
  const restContent = document.querySelectorAll('#skills, #projects, #contact, #future');
  
  setTimeout(() => { kuraTitle.style.opacity = 1; }, 200);
  setTimeout(() => { heroTitle.style.opacity = 1; }, 500);
  setTimeout(() => { aboutSection.style.opacity = 1; }, 800);
  setTimeout(() => { restContent.forEach(section => { section.style.opacity = 1; }); }, 1000);

  // Fonction pour déterminer la priorité de l'activité
  function getActivityPriority(activity) {
    switch (activity.type) {
      case 1: // STREAMING
        return 1;
      case 0: // PLAYING
        return 2;
      case 2: // LISTENING
        return 3;
      case 3: // WATCHING
        return 4;
      default:
        return 100;
    }
  }
  
  // Fonction de mise à jour dynamique du temps écoulé
  function updateElapsedTime() {
    const elements = document.querySelectorAll("[data-start-timestamp]");
    elements.forEach(el => {
      const startTimestamp = parseInt(el.getAttribute("data-start-timestamp"), 10);
      if (!startTimestamp) return;
      const elapsedMs = Date.now() - startTimestamp;
      const seconds = Math.floor(elapsedMs / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      let displayTime = `${seconds % 60} sec`;
      if (minutes > 0) displayTime = `${minutes % 60} min ${displayTime}`;
      if (hours > 0) displayTime = `${hours} h ${displayTime}`;
      el.textContent = displayTime;
    });
  }
  
  // Mettre à jour toutes les secondes
  setInterval(updateElapsedTime, 1000);
  
  // Récupération des données depuis l'API et rendu de l'activité principale
  fetch('/api/discord/discord-data')
    .then(response => response.json())
    .then(data => {
      // Met à jour les informations de l'utilisateur
      const avatarElement = document.getElementById('discord-avatar');
      avatarElement.src = data.avatar;
      avatarElement.alt = `${data.username}'s Avatar`;
      document.getElementById('discord-username').textContent = data.username;
      const statusElement = document.getElementById('discord-status');
      statusElement.className = 'discord-status'; // Reset class
      statusElement.classList.add(data.status);
      
      // Affiche l'activité principale dans #discord-activity
      const activityContainer = document.getElementById('discord-activity');
      activityContainer.innerHTML = ''; // Clear previous content
      
      if (data.activities && data.activities.length > 0) {
        // Sélectionner l'activité principale selon la priorité
        const mainActivity = data.activities.reduce((prev, curr) => {
          return getActivityPriority(curr) < getActivityPriority(prev) ? curr : prev;
        }, data.activities[0]);
        
        // Créer le conteneur de l'activité
        const activityDiv = document.createElement('div');
        activityDiv.className = 'activity';
        
        // Image de l'activité
        const activityImage = document.createElement('img');
        let activityImageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuACeEdWEb10KHu14BkBAxBF2WoN9ycwxllg&s'; // Image par défaut

          if (mainActivity.assets && mainActivity.assets.largeImage) {
            if (mainActivity.name === 'Spotify') {
              // Si l'activité est Spotify, utiliser l'URL Spotify
              const spotifyImageID = mainActivity.assets.largeImage.replace('spotify:', '');
              activityImageSrc = `https://i.scdn.co/image/${spotifyImageID}`;
            } else if (mainActivity.application_id) {
              // Sinon, utiliser l'URL Discord pour les autres activités
              activityImageSrc = `https://cdn.discordapp.com/app-assets/${mainActivity.application_id}/${mainActivity.assets.largeImage}.png`;
            }
          }
        
        
        activityImage.src = activityImageSrc;
        activityImage.alt = mainActivity.name;
        activityImage.className = 'activity-image';
        
        // Détails de l'activité
        const activityDetails = document.createElement('div');
        activityDetails.className = 'activity-details';
        
        const activityName = document.createElement('p');
        activityName.className = 'activity-name';
        activityName.textContent = mainActivity.name;
        
        const activityState = document.createElement('p');
        activityState.className = 'activity-state';
        activityState.textContent = mainActivity.state || 'Pas de détails';
        
        // Afficher les détails supplémentaires si disponibles
        if (mainActivity.details) {
          const activityExtra = document.createElement('p');
          activityExtra.className = 'activity-extra';
          activityExtra.textContent = mainActivity.details;
          activityDetails.appendChild(activityExtra);
        }
        
        // Élément pour le temps écoulé (mis à jour dynamiquement)
        const elapsedTimeEl = document.createElement('p');
        elapsedTimeEl.className = 'activity-elapsed';
        if (mainActivity.start_timestamp) {
          elapsedTimeEl.setAttribute("data-start-timestamp", Date.parse(mainActivity.start_timestamp));
          elapsedTimeEl.textContent = "Calcul en cours...";
        }
        
        // Assemblage
        activityDetails.appendChild(activityName);
        activityDetails.appendChild(activityState);
        activityDetails.appendChild(elapsedTimeEl);
        activityDiv.appendChild(activityImage);
        activityDiv.appendChild(activityDetails);
        activityContainer.appendChild(activityDiv);
      } else {
        activityContainer.textContent = 'Aucune activité';
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
});
