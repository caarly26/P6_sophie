/*fetch('http://localhost:5678/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'sophie.bluel@test.tld',
    password: 'S0phie'
  })
})
  .then(response => response.json())
  .then(data => {
    console.log('Connecté à l\'API avec succès');
    console.log('Réponse de l\'API:', data);
  })
  .catch(error => {
    console.log('Erreur de connexion à l\'API:', error);
  });*/

  document.addEventListener("DOMContentLoaded", function() {
    // Placez votre code JavaScript ici

    const loginform= document.getElementById("login-form")
    loginform.addEventListener("submit", async function(event) {
      event.preventDefault(); // Empêche le rechargement de la page

      console.log("authentification")
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const requestBody = {
        email: email,
        password: password
      };

      
        const response= await fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json" // Contrôle de l'en-tête Accept
          },
          body: JSON.stringify(requestBody)
        })
  
        const data= await response.json();
        console.log(data);
        if (!data.token){
          throw new Error("Identifiant ou mot de passe incorrect");
        }

        // Le token de connexion a été obtenu avec succès
           const token = data.token;

           // Effectuez les actions nécessaires en cas de connexion réussie
 
           // Par exemple, stockez le token dans le localStorage
           localStorage.setItem("token", token);
 
           // Redirigez vers la page "index.html"
          window.location.href = "index.html";
        
      })
  })        