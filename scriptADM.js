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
  // Obtém a referência da coleção no Firestore
  var db = firebase.firestore();
}




// Abrir/Fechar modal de adicionar filtros
document.getElementById("addFiltro").addEventListener("click", function () {
  document.getElementById("modal").style.display = "block";

});

document.getElementsByClassName("close")[0].addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
});

// Editar Filtro
document.getElementById("editarFiltro").addEventListener("click", function () {
  document.getElementById("modalEdit").style.display = "block";

  adminEditar();
})

document.getElementsByClassName("closeEdit")[0].addEventListener("click", function () {
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
      .set(filtro, {
        merge: true
      })
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
  label.textContent = "Opção " + numOpcao + ":";
  divResultado.appendChild(label);

  const input = document.createElement("input");
  input.id = "opc" + numOpcao;
  input.type = "text"
  input.placeholder = "Insira o conteúdo da opção. Exemplo: Externo/Interno"
  divResultado.appendChild(input);

  numOpcao++
  total = numOpcao - 1
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
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var nomeDocumento = doc.id;

        // Criar um elemento option
        var optionElement = document.createElement("option");
        optionElement.value = nomeDocumento;
        optionElement.textContent = nomeDocumento;

        // Adicionar o option ao select
        selectElement.appendChild(optionElement);
      });
    })
    .catch(function (error) {
      console.log("Erro ao buscar os valores:", error);
    });
}


// Exibir nnos inputs os valores atuais dos campos
var totalOpcoesEdit = 0;
var numOpcaoEdit = totalOpcoesEdit + 1

document.getElementById("nameEdit").addEventListener("change", function () {
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

          buttonElement.addEventListener("click", function (event) {
            var botaoClicado = event.target;
            var idBotao = botaoClicado.id;

            var substring = idBotao.substring(9);
            var posicaoInt = parseInt(substring)

            var apagar = document.getElementById("divopc" + posicaoInt + "E")

            apagar.remove()

            for (i = posicaoInt + 1; i <= totalOpcoesEdit; i++) {
              var posAtual = i - 1
              console.log("A")
              var alterarInput = document.getElementById("opc" + i + "E")
              var alterarDiv = document.getElementById("divopc" + i + "E")
              var alterarBotao = document.getElementById("buttonopc" + i + "E")

              alterarInput.id = "opc" + posAtual + "E"
              alterarDiv.id = "divopc" + posAtual + "E"
              alterarBotao.id = "buttonopc" + posAtual + "E"

            }

            totalOpcoesEdit--
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

function addOptionEdit() {
  totalOpcoesEdit++
  var optionsEdit = document.getElementById("optionsEdit")

  var divElement = document.createElement("div")
  var idDiv = "divopc" + totalOpcoesEdit + "E"
  divElement.id = idDiv
  optionsEdit.appendChild(divElement)

  const input = document.createElement("input");
  input.id = "opc" + totalOpcoesEdit + "E";
  input.type = "text"
  input.placeholder = "Insira o conteúdo da opção. Exemplo: Externo/Interno"
  var addInDiv = document.getElementById(idDiv)
  addInDiv.appendChild(input);

  var buttonElement = document.createElement("button");
  buttonElement.type = "button";
  buttonElement.id = "buttonopc" + totalOpcoesEdit + "E";
  buttonElement.innerHTML = "Deletar";
  

  buttonElement.addEventListener("click", function (event) {
    var botaoClicado = event.target;
    var idBotao = botaoClicado.id;

    var substring = idBotao.substring(9);
    var posicaoInt = parseInt(substring)

    var apagar = document.getElementById("divopc" + posicaoInt + "E")

    apagar.remove()

    for (i = posicaoInt + 1; i <= totalOpcoesEdit; i++) {
      var posAtual = i - 1
      console.log("A")
      var alterarInput = document.getElementById("opc" + i + "E")
      var alterarDiv = document.getElementById("divopc" + i + "E")
      var alterarBotao = document.getElementById("buttonopc" + i + "E")

      alterarInput.id = "opc" + posAtual + "E"
      alterarDiv.id = "divopc" + posAtual + "E"
      alterarBotao.id = "buttonopc" + posAtual + "E"

    }

    totalOpcoesEdit--
  });

  addInDiv.appendChild(buttonElement);
}


// Enviar alterações pro banco de dados
function EditarFiltro() {

  const selectElement = document.getElementById('nameEdit');

  // Obtenha o valor selecionado
  const valorSelecionado = selectElement.options[selectElement.selectedIndex].value;

  const db = firebase.firestore();

  // Defina o caminho do documento que deseja apagar
  const documentoRef = db.collection('filtros').doc(valorSelecionado);

  // Apague as informações do documento
  documentoRef
    .delete()
    .then(() => {
      console.log('Documento apagado com sucesso.');
    })
    .catch((error) => {
      console.error('Erro ao apagar o documento:', error);
    });


  for (let i = 1; i <= total; i++) {
    const opcao = "opc" + i + "E";
    const campo = "opc" + i;
    const valor = document.getElementById(opcao).value;

    const filtro = {
      [campo]: valor
    };

    // Insira os novos dados no documento
    documentoRef
      .set(filtro, {
        merge: true
      })
      .then(() => {
        console.log('Novos dados inseridos com sucesso.');
      })
      .catch((error) => {
        console.error('Erro ao inserir os novos dados:', error);
      });
  }

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