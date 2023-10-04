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
    projets.forEach((projet) => {
      genererFigure(projet);
    });
    categories.forEach(category => {
      generateFilter(category);
    });
  }

main()