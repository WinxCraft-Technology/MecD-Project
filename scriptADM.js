function iniciarBanco(){
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
  // Obtém a referência da coleção no Firestore
  var db = firebase.firestore();
}




// Abrir/Fechar modal de adicionar filtros
document.getElementById("addFiltro").addEventListener("click", function() {
  document.getElementById("modal").style.display = "block";
  
});

document.getElementsByClassName("close")[0].addEventListener("click", function() {
  document.getElementById("modal").style.display = "none";
});

// Editar Filtro
document.getElementById("editarFiltro").addEventListener("click", function() {
  document.getElementById("modalEdit").style.display = "block";

  adminEditar();
})

document.getElementsByClassName("closeEdit")[0].addEventListener("click", function() {
  document.getElementById("modalEdit").style.display = "none";
});


// Adicionar filtros novos no banco de dados

var total = 1;

function adicionarFiltro() {
  const nome = document.getElementById("name").value;
  const db = firebase.firestore();

  for (let i = 1; i <= total; i++) {
    const opcao = "opc" + i;
    const valor = document.getElementById(opcao).value;

    const filtro = {
      [opcao]: valor
    };

    db.collection("filtros")
      .doc(nome)
      .set(filtro, { merge: true })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }
}


// Criar uma nova opção ao criar um filtro
var numOpcao = 2;

function addOption() {
  var divResultado = document.getElementById("novasOptions")
  
  const label = document.createElement("label");
  label.textContent = "Opção "+numOpcao+":";
  divResultado.appendChild(label);

  const input = document.createElement("input");
  input.id = "opc"+numOpcao;
  input.type = "text"
  input.placeholder = "Insira o conteúdo da opção. Exemplo: Externo/Interno"
  divResultado.appendChild(input);

  numOpcao++
  total = numOpcao-1
}



//Exibe a lista com os filtros criados, para selecioanr um

function adminEditar() {
  // Referência para o Firestore
  var db = firebase.firestore();

  // Referência para o elemento select
  var selectElement = document.getElementById("nameEdit");
  selectElement.innerHTML = ""
  // Buscar os nomes dos documentos no Firestore
  db.collection("filtros")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var nomeDocumento = doc.id;

        // Criar um elemento option
        var optionElement = document.createElement("option");
        optionElement.value = nomeDocumento;
        optionElement.textContent = nomeDocumento;

        // Adicionar o option ao select
        selectElement.appendChild(optionElement);
      });
    })
    .catch(function(error) {
      console.log("Erro ao buscar os valores:", error);
    });
}


// Exibir nnos inputs os valores atuais dos campos
var totalOpcoesEdit = 0;

document.getElementById("nameEdit").addEventListener("change", function() {
  var optionsEdit = document.getElementById("optionsEdit");
  optionsEdit.innerHTML = "";
  var db = firebase.firestore();
  var collection = db.collection("filtros");

  var select = document.getElementById("nameEdit");
  var valorSelecionado = select.value;

  collection.doc(valorSelecionado).get()
    .then((doc) => {
      if (doc.exists) {
        var data = doc.data();
        var propriedades = [];

        for (var prop in data) {
          if (prop.startsWith("opc")) {
            propriedades.push(prop);
          }
        }

        propriedades.sort(); // Ordenar as propriedades

        for (var i = 0; i < propriedades.length; i++) {
          var prop = propriedades[i];
          var inputId = prop + "E";
          var inputValue = data[prop];

          var divElement = document.createElement("div")
          var idDiv = "div" + inputId
          divElement.id = idDiv
          optionsEdit.appendChild(divElement)
          

          var inputElement = document.createElement("input");
          inputElement.type = "text";
          inputElement.id = inputId;
          inputElement.value = inputValue;
          var addInDiv = document.getElementById(idDiv)

          addInDiv.appendChild(inputElement);

          
          var buttonElement = document.createElement("button");
          buttonElement.type = "button";
          buttonElement.id = "button" + inputId;
          buttonElement.innerHTML = "Deletar";

          buttonElement.addEventListener("click", function(event) {
            var botaoClicado = event.target;
            var idBotao = botaoClicado.id;
            console.log(idBotao)
          });

          addInDiv.appendChild(buttonElement);
        }

        totalOpcoesEdit = propriedades.length;
      } else {
        console.log("Documento não encontrado.");
      }
    })
    .catch((error) => {
      console.log("Erro ao obter o documento:", error);
    });
});


// Adicionar novo input
var numOpcaoEdit = totalOpcoesEdit+1
function addOptionEdit() { 
  totalOpcoesEdit++
  var optionsEdit = document.getElementById("optionsEdit")

  const input = document.createElement("input");
  input.id = "opc"+totalOpcoesEdit+"E";
  input.type = "text"
  input.placeholder = "Insira o conteúdo da opção. Exemplo: Externo/Interno"
  optionsEdit.appendChild(input);
}






/*document.getElementById('adm-filtros').addEventListener("change",function(){
    
})*/





// Obtenha uma referência ao serviço do Firebase Storage


// Adicione um manipulador de evento para o envio do formulário
/*
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  var storage = firebase.storage();
  
  // Obtenha o arquivo que o usuário selecionou
  var file = document.getElementById('file-input').files[0];
  
  // Crie uma referência ao arquivo no Firebase Storage
  var nome = document.getElementById("nome-mecanismo").value
  var storageRef = storage.ref().child('assets/PDFs/'+nome+'.pdf');
  
  // Carregue o arquivo no Firebase Storage
  var uploadTask = storageRef.put(file);
  
  // Escute o evento de progresso de upload
  uploadTask.on('state_changed', function(snapshot) {
    // Monitorar o progresso do upload...
  }, function(error) {
    console.error(error);
  }, function() {
    // Quando o upload estiver concluído, obtenha a URL de download do arquivo
    storageRef.getDownloadURL().then(function(url) {      
      console.log('Arquivo enviado com sucesso!');
    }).catch(function(error) {
      console.error(error);
    });
  });
});*/
