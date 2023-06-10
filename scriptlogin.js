//att

function iniciarBanco() {
  const firebaseConfig = {
    apiKey: "AIzaSyBl_9KalJEsPjByiO7MC_pHkvqHR8xyhuY",
    authDomain: "mecd-project.firebaseapp.com",
    projectId: "mecd-project",
    storageBucket: "mecd-project.appspot.com",
    messagingSenderId: "210905329240",
    appId: "1:210905329240:web:ae1579ea9fb2ad218ce42d",
    measurementId: "G-RPBV1LXF0P"
  };

  firebase.initializeApp(firebaseConfig);


document.addEventListener("DOMContentLoaded", function () {
  // Verifica se o usuário está autenticado.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // O usuário está logado
      console.log("Usuário está logado");
      // Permite que o usuário continue na mesma página

    } else {
      // O usuário não está logado
      console.log("Usuário não está logado");
      // Redireciona o usuário para a página de login (ADMlogin.html) ou a página inicial (index.html)
      if (window.location.href.indexOf("ADMlogin.html") === -1) {
        window.location.href = "ADMlogin.html";
      }
    }
  });

  document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário.

    // Obtendo os valores do formulário,
    var username = document.getElementById("login__username").value;
    var password = document.getElementById("login__password").value;

    // Autenticação com o Firebase
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(function (userCredential) {
      // Login bem-sucedido
      var user = userCredential.user;
      console.log("Usuário autenticado com sucesso:", user);
      // Redireciona o usuário para a página de administração (adm.html)
      window.location.href = "adm.html";
    })
    .catch(function (error) {
      // Erro ao fazer login
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Erro ao fazer login:", errorMessage);
      alert("Nome de usuário ou senha inválidos!");
    });  
  });
});

}