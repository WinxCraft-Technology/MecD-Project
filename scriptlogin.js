function gerarToken() {
  var timestamp = new Date().getTime(); // Obtém o timestamp atual
  var token = "token_" + timestamp; // Gera um token usando o timestamp
  return token;
}

function isAutenticado() {
  var token = localStorage.getItem("token");
  return token !== null && token.startsWith("token_");
}

// Verifica se o usuário está autenticado.
if (!isAutenticado()) {
  if (window.location.href.indexOf("ADMlogin.html") === -1) {
    window.location.href = "ADMlogin.html";
  }
}

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário.

    // Obtendo os valores do formulário,
    var username = document.getElementById("login__username").value;
    var password = document.getElementById("login__password").value;

    // Verificando o nome de usuário e a senha predefinidos.
    var usernameP = "admpaulomecd";
    var passwordP = "administracaomecdpaulo";

    if (username === usernameP && password === passwordP) {
      var token = gerarToken();
      localStorage.setItem("token", token);
      window.location.href = "adm.html";
    } else {
      alert("Nome de usuário ou senha inválidos!");
    }
  });
