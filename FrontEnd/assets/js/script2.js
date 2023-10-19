async function fetchWorks() {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      const data = await response.json();
      return data;
    } 
    catch (error) {
      console.log("Une erreur s'est produite lors de la récupération des données :", error);
      throw new Error('La requête a échoué');
    }
  }
  
  async function fetchCategories() {
    try {
      const response = await fetch("http://localhost:5678/api/categories");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Une erreur s'est produite lors de la récupération des données :", error);
      throw new Error('La requête a échoué');
    }
  }
  
  // Je crée la fonction 
  function genererFigure(projet) {
    // Je crée un nouvel élément <figure>
    let figureElement = document.createElement('figure');
  
    // Je crée un nouvel élément <img> avec les attributs src et alt
    let imgElement = document.createElement('img');
    imgElement.src = projet.imageUrl;
    imgElement.alt = projet.title;
  
    // Je crée un nouvel élément <figcaption> avec le titre du projet
    let figcaptionElement = document.createElement('figcaption');
    figcaptionElement.textContent = projet.title;
  
    // J'ajoute les éléments à l'élément <figure>
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);
  
    // J'ajoute enfin l'élément <figure> à la class .gallery
    let containerElement = document.querySelector('.gallery');
    containerElement.appendChild(figureElement);
  }
  
  function generateFilter(category) {
    // Sélectionner le conteneur des filtres
    const filtersContainer = document.querySelector('.filters');
    // Créer un bouton pour chaque catégorie
    const button = document.createElement('button');
    button.classList.add('btn-filter');
    button.textContent = category.name;
    filtersContainer.appendChild(button);

  // button 
    button.addEventListener('click', function() {
      const filterButtons = document.querySelectorAll('.btn-filter');
      filterButtons.forEach(btn => {
        btn.classList.remove('data-active');
      })
      button.classList.add('data-active');
    });
  }
  
  async function main() {
    const projets = await fetchWorks();
    const categories = await fetchCategories();
    categories.unshift({ id: 'all', name: 'Tous' });
    projets.forEach((projet) => {
      genererFigure(projet);
    });
    categories.forEach(category => {
      generateFilter(category);
    });
  }

  
  /* Code for modal  */ 

document.addEventListener("DOMContentLoaded", function() {
  // Vérifiez si le token existe dans le localStorage
  const token = localStorage.getItem("token");

  // Si le token existe, affichez la modal
  if (token) {
    const modal = document.getElementById("modal");

    modal.style.display = "block";

    // Supprimez le token du localStorage pour qu'il ne soit pas réaffiché lors de la prochaine visite
    localStorage.removeItem("token");
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const loginLink = document.getElementById('nav-login');
  
    // Fonction pour gérer la soumission du formulaire de connexion
    async function handleLoginFormSubmit(event) {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      const loginData = {
        email: email,
        password: password
      };
  
      try {
        const response = await fetch('http://localhost:5678/api/users/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la connexion');
        }
  
        const data = await response.json();
        const token = data.token;
  
        // Enregistrer le token dans le localStorage
        localStorage.setItem('token', token);
  
        // Rediriger vers index.html
        window.location.href = 'index.html';
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        errorMessage.removeAttribute('hidden');
      }
    }
  
    // Gérer la soumission du formulaire de connexion
    if (loginForm) {
      loginForm.addEventListener('submit', handleLoginFormSubmit);
    }
  
    // Gérer le clic sur le lien "Logout"
    loginLink.addEventListener('click', function(event) {
      event.preventDefault();
  
      // Effacer le token du localStorage
      localStorage.removeItem('token');
  
      // Rediriger vers login.html
      window.location.href = 'login.html';
    });
  
    // Vérifier si l'utilisateur est connecté au chargement de la page
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;
  
    // Mettre à jour l'affichage du lien "Logout"
    if (isLoggedIn) {
      loginLink.style.display = 'inline';
      loginLink.textContent = 'Logout';
    } else {
      loginLink.style.display = 'inline';
      loginLink.textContent = 'Login';
    }
  });
  document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const loginLink = document.getElementById('nav-login');
  
    // Fonction pour gérer la soumission du formulaire de connexion
    async function handleLoginFormSubmit(event) {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      const loginData = {
        email: email,
        password: password
      };
  
      try {
        const response = await fetch('http://localhost:5678/api/users/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la connexion');
        }
  
        const data = await response.json();
        const token = data.token;
  
        // Enregistrer le token dans le localStorage
        localStorage.setItem('token', token);
  
        // Rediriger vers index.html
        window.location.href = 'index.html';
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        errorMessage.removeAttribute('hidden');
      }
    }
  
    // Gérer la soumission du formulaire de connexion
    if (loginForm) {
      loginForm.addEventListener('submit', handleLoginFormSubmit);
    }
  
    // Gérer le clic sur le lien "Logout"
    loginLink.addEventListener('click', function(event) {
      event.preventDefault();
  
      // Effacer le token du localStorage
      localStorage.removeItem('token');
  
      // Rediriger vers login.html
      window.location.href = 'login.html';
    });
  
    // Vérifier si l'utilisateur est connecté au chargement de la page
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;
  
    // Mettre à jour l'affichage du lien "Logout"
    if (isLoggedIn) {
      loginLink.style.display = 'inline';
      loginLink.textContent = 'Logout';
    } else {
      loginLink.style.display = 'inline';
      loginLink.textContent = 'Login';
    }
  });

main()



});




