// Insira suas informações de configuração do Firebase

function iniciarBanco(){
  var firebaseConfig = {
    apiKey: "AIzaSyBl_9KalJEsPjByiO7MC_pHkvqHR8xyhuY",
    authDomain: "mecd-project.firebaseapp.com",
    projectId: "mecd-project",
    storageBucket: "mecd-project.appspot.com",
    messagingSenderId: "210905329240",
    appId: "1:210905329240:web:ae1579ea9fb2ad218ce42d",
    measurementId: "G-RPBV1LXF0P"
  };
  
  // Inicialize o Firebase
  firebase.initializeApp(firebaseConfig);
}


// Função de login com e-mail e senha
function login() {
  var email = document.getElementById("login__username").value;
  var password = document.getElementById("login__password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (result) {
      // O usuário fez o login com sucesso
      var user = result.user;
      window.location.href = "adm.html";
    })
    .catch(function (error) {
      // Ocorreu um erro durante o login
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("E-mail e/ou senha incorreta");
    });
}