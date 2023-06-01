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

  addOption();
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
var numOpcao = 1;

function addOption() {
  var divResultado = document.getElementById("novasOptions")

  const div = document.createElement("div")
  divAtual = "divopc" + numOpcao
  div.id = divAtual
  divResultado.appendChild(div)
  var divReferencia = document.getElementById(divAtual)

  const input = document.createElement("input");
  input.id = "opc" + numOpcao;
  input.type = "text"
  input.placeholder = "Insira o conteúdo da opção. Exemplo: Externo/Interno"
  divReferencia.appendChild(input);

  const buttonElement = document.createElement("button");
  buttonElement.type = "button";
  buttonElement.id = "button" + "opc" + numOpcao;
  buttonElement.className = "deletebutton"
  buttonElement.innerHTML = "Deletar";

  buttonElement.addEventListener("click", function (event) {
    const botaoClicado = event.target;
    const idBotao = botaoClicado.id;
    const substring = idBotao.substring(9);
    const posicaoInt = parseInt(substring);
    const apagar = document.getElementById("divopc" + posicaoInt);
    apagar.remove();
    console.log(posicaoInt)

    numOpcao--
    for (let i = posicaoInt + 1; i <= numOpcao; i++) {
      const posAtual = i - 1;
      const alterarInput = document.getElementById("opc" + i);
      const alterarDiv = document.getElementById("divopc" + i);
      const alterarBotao = document.getElementById("buttonopc" + i);

      alterarInput.id = "opc" + posAtual;
      alterarDiv.id = "divopc" + posAtual;
      alterarBotao.id = "buttonopc" + posAtual;
    }

    console.log(numOpcao)
  });

  divReferencia.appendChild(buttonElement);

  numOpcao++
  console.log(numOpcao)
  total = numOpcao - 1
}



//Exibe a lista com os filtros criados, para selecioanr um

function adminEditar() {
  // Referência para o Firestore
  var db = firebase.firestore();

  // Referência para o elemento select
  var selectElement = document.getElementById("nameEdit");
  selectElement.innerHTML = ""
  var optionElement = document.createElement("option");
  optionElement.value = "Lista de Filtros";
  optionElement.textContent = "Lista de Filtros";
  optionElement.selected = "true";
  optionElement.disabled = "true";
  selectElement.appendChild(optionElement);

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


// Exibir nos inputs os valores atuais dos campos

var totalOpcoesEdit = 0;
var numOpcaoEdit = totalOpcoesEdit + 1

document.getElementById("nameEdit").addEventListener("change", function () {
  const optionsEdit = document.getElementById("optionsEdit");
  optionsEdit.innerHTML = "";

  const db = firebase.firestore();
  const collection = db.collection("filtros");

  const select = document.getElementById("nameEdit");
  const valorSelecionado = select.value;

  collection.doc(valorSelecionado).get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const propriedades = Object.keys(data)
          .filter(prop => prop.startsWith("opc"))
          .sort();

        propriedades.forEach((prop, index) => {
          const inputId = prop + "E";
          const inputValue = data[prop];

          const divElement = document.createElement("div");
          const idDiv = "div" + inputId;
          divElement.id = idDiv;
          optionsEdit.appendChild(divElement);

          const inputElement = document.createElement("input");
          inputElement.type = "text";
          inputElement.id = inputId;
          inputElement.value = inputValue;
          const addInDiv = document.getElementById(idDiv);
          addInDiv.appendChild(inputElement);

          const buttonElement = document.createElement("button");
          buttonElement.type = "button";
          buttonElement.id = "button" + inputId;
          buttonElement.className = "deletebutton"
          buttonElement.innerHTML = "Deletar";

          buttonElement.addEventListener("click", function (event) {
            const botaoClicado = event.target;
            const idBotao = botaoClicado.id;
            const substring = idBotao.substring(9);
            const posicaoInt = parseInt(substring);
            const apagar = document.getElementById("divopc" + posicaoInt + "E");
            apagar.remove();

            for (let i = posicaoInt + 1; i <= totalOpcoesEdit; i++) {
              const posAtual = i - 1;
              const alterarInput = document.getElementById("opc" + i + "E");
              const alterarDiv = document.getElementById("divopc" + i + "E");
              const alterarBotao = document.getElementById("buttonopc" + i + "E");

              alterarInput.id = "opc" + posAtual + "E";
              alterarDiv.id = "divopc" + posAtual + "E";
              alterarBotao.id = "buttonopc" + posAtual + "E";
            }

            totalOpcoesEdit--;
          });

          addInDiv.appendChild(buttonElement);
        });

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
  totalOpcoesEdit++;
  const optionsEdit = document.getElementById("optionsEdit");

  const divElement = document.createElement("div");
  const idDiv = "divopc" + totalOpcoesEdit + "E";
  divElement.id = idDiv;
  optionsEdit.appendChild(divElement);

  const input = document.createElement("input");
  input.id = "opc" + totalOpcoesEdit + "E";
  input.type = "text";
  input.placeholder = "Insira o conteúdo da opção. Exemplo: Externo/Interno";
  const addInDiv = document.getElementById(idDiv);
  addInDiv.appendChild(input);

  const buttonElement = document.createElement("button");
  buttonElement.type = "button";
  buttonElement.id = "buttonopc" + totalOpcoesEdit + "E";
  buttonElement.className = "deletebutton"
  buttonElement.innerHTML = "Deletar";

  buttonElement.addEventListener("click", function (event) {
    const botaoClicado = event.target;
    const idBotao = botaoClicado.id;

    const substring = idBotao.substring(9);
    const posicaoInt = parseInt(substring);

    const apagar = document.getElementById("divopc" + posicaoInt + "E");
    apagar.remove();

    for (let i = posicaoInt + 1; i <= totalOpcoesEdit; i++) {
      const posAtual = i - 1;
      const alterarInput = document.getElementById("opc" + i + "E");
      const alterarDiv = document.getElementById("divopc" + i + "E");
      const alterarBotao = document.getElementById("buttonopc" + i + "E");

      alterarInput.id = "opc" + posAtual + "E";
      alterarDiv.id = "divopc" + posAtual + "E";
      alterarBotao.id = "buttonopc" + posAtual + "E";
    }

    totalOpcoesEdit--;
  });

  addInDiv.appendChild(buttonElement);
}



function editarFiltro() {
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

  for (let i = 1; i <= totalOpcoesEdit; i++) {
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


function deletarFiltro() {
  const selectElement = document.getElementById('nameEdit');
  const valorSelecionado = selectElement.options[selectElement.selectedIndex].value;

  const db = firebase.firestore();
  const documentoRef = db.collection('filtros').doc(valorSelecionado);

  documentoRef
    .delete()
    .then(() => {
      console.log('Documento apagado com sucesso.');
    })
    .catch((error) => {
      console.error('Erro ao apagar o documento:', error);
    });
}

