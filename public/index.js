document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    link.addEventListener('mouseover', () => {
      link.style.color = '#62fd14';
    });
    link.addEventListener('mouseout', () => {
      link.style.color = '#f0f0f0';
    });
  });

  // Désactiver la sélection du texte
  document.addEventListener('selectstart', (event) => {
    event.preventDefault();
  });

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  const kuraTitle = document.querySelector('header h1');
  const heroTitle = document.querySelector('#hero h2');
  const heroText = document.querySelector('#hero p');
  const aboutSection = document.querySelector('#about');
  const restContent = document.querySelectorAll('#skills, #projects, #contact, #future');

  setTimeout(() => {
    kuraTitle.style.opacity = 1;
  }, 200);

  setTimeout(() => {
    heroTitle.style.opacity = 1;
  }, 500);

  setTimeout(() => {
    aboutSection.style.opacity = 1;
  }, 800);

  setTimeout(() => {
    restContent.forEach(section => {
      section.style.opacity = 1;
    });
  }, 1000);

  // Gestion du menu déroulant
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
  });
});
