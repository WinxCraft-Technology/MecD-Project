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


var totalFiltros;

function listarFiltros() {
  console.log("B")
  document.getElementById("editarMecanismo").style.display = "none";
  document.getElementById("addMecanismo").style.display = "block";
  const db = firebase.firestore();

  // Obtém a referência para a div 'resultado'
  const divResultado = document.getElementById("lista_filtros");

  // Limpa o conteúdo da div 'resultado'
  divResultado.innerHTML = "";

  // Obtém a lista de documentos
  db.collection("filtros")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Cria a label com o nome do documento
        const label = document.createElement("label");
        label.textContent = doc.id;
        divResultado.appendChild(label);

        // Cria o select para as coleções
        const select = document.createElement("select");
        var id = doc.id.replace(" ", "_");
        select.id = id
        select.className = "filtro-select"
        divResultado.appendChild(select);

        // Obtém as coleções do documento
        db.collection("filtros")
          .doc(doc.id)
          .get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              const data = docSnapshot.data();
              // Itera sobre as coleções
              const optionDefault = document.createElement("option");
              optionDefault.value = "Sem Filtro";
              optionDefault.textContent = "Sem Filtro";
              select.appendChild(optionDefault);
              Object.keys(data).forEach((key) => {
                if ([key] != "filtropai" && [key] != "dataupload") {
                  const option = document.createElement("option");
                  option.value = data[key];
                  option.textContent = data[key];
                  select.appendChild(option);
                }
              });
            }
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          });
      });
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
    });
}

function adicionarMecanismo() {
  const nome = document.getElementById("input_nomeMecanismo_add").value;
  const db = firebase.firestore();

  const selects = document.querySelectorAll('.filtro-select');
  selects.forEach((select) => {
    const categoriaSelecionada = select.value;
    const id = select.id.replace("_", " ");

    const dados = {
      [id]: categoriaSelecionada
    }

    db.collection("mecanismos")
      .doc(nome)
      .set(dados, {
        merge: true
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  });
}

// Variável para controlar se a função editarMecanismo está em uso ou não
let editarMecanismoEmUso = false;

function editarMecanismo() {
  console.log("A")
  document.getElementById("editarMecanismo").style.display = "block";
  document.getElementById("addMecanismo").style.display = "none";

  const db = firebase.firestore();

  const select_mecanismo = document.getElementById("select_nomeMecanismo_edit");
  const divResultado = document.getElementById("filtros_editar");
  select_mecanismo.innerHTML = "";

  // Limpa o conteúdo da div 'filtros_editar'
  divResultado.innerHTML = "";

  db.collection("mecanismos")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const option = document.createElement("option");
        option.value = doc.id;
        option.textContent = doc.id;

        select_mecanismo.appendChild(option);
      });
    });

  // Marca a função editarMecanismo como em uso
  editarMecanismoEmUso = true;
}

// Adiciona o evento de alteração apenas uma vez
const select_mecanismo = document.getElementById("select_nomeMecanismo_edit");
select_mecanismo.addEventListener("change", handleSelectChange);

function handleSelectChange(event) {
  if (!editarMecanismoEmUso) {
    return;
  }

  const divResultado = document.getElementById("filtros_editar");
  // Limpa o conteúdo da div 'resultado'
  divResultado.innerHTML = "";

  const db = firebase.firestore();

  // Obtém a lista de documentos
  db.collection("filtros")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Cria a label com o nome do documento
        const label = document.createElement("label");
        label.textContent = doc.id;
        divResultado.appendChild(label);

        // Cria o select para as coleções
        const select = document.createElement("select");
        var id = doc.id.replace(" ", "_");
        select.id = id;
        select.className = "filtro-selectEdit";
        divResultado.appendChild(select);

        // Obtém as coleções do documento
        db.collection("filtros")
          .doc(doc.id)
          .get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              const data = docSnapshot.data();
              // Itera sobre as coleções
              const optionDefault = document.createElement("option");
              optionDefault.value = "Sem Filtro";
              optionDefault.textContent = "Sem Filtro";
              select.appendChild(optionDefault);
              Object.keys(data).forEach((key) => {
                if ([key] != "filtropai" && [key] != "dataupload") {
                  const option = document.createElement("option");
                  option.value = data[key];
                  option.textContent = data[key];
                  select.appendChild(option);
                }
              });
            }
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          });
      });
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
    });
}

// Função para limpar a tela quando a função editarMecanismo não está mais em uso
function limparTela() {
  if (!editarMecanismoEmUso) {
    // Limpar os elementos relevantes na tela
    document.getElementById("editarMecanismo").style.display = "none";
    // ...
  }
}



function enviarEditarmecanismo() {
  const nome = document.getElementById("input_nomeMecanismo_edit").value;
  const db = firebase.firestore();

  const select = document.getElementById("select_nomeMecanismo_edit");
  const valorSelecionado = select.value;
  const documentoRef = db.collection('mecanismos').doc(valorSelecionado);

  documentoRef
    .delete()
    .then(() => {
      console.log('Documento apagado com sucesso.');
    })
    .catch((error) => {
      console.error('Erro ao apagar o documento:', error);
    });

  const selects = document.querySelectorAll('.filtro-selectEdit');
  selects.forEach((select) => {
    const categoriaSelecionada = select.value;
    const id = select.id.replace("_", " ");

    const dados = {
      [id]: categoriaSelecionada
    }

    db.collection("mecanismos")
      .doc(nome)
      .set(dados, {
        merge: true
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  });
}

function deletarMecanismo() {
  const db = firebase.firestore();

  const select = document.getElementById("select_nomeMecanismo_edit");
  const valorSelecionado = select.value;
  const documentoRef = db.collection('mecanismos').doc(valorSelecionado);

  documentoRef
    .delete()
    .then(() => {
      console.log('Documento apagado com sucesso.');
    })
    .catch((error) => {
      console.error('Erro ao apagar o documento:', error);
    });
}






// Função para mostrar o modal de adicionar filtro
function mostrarModalAdicionarFiltro() {
  var modalAdicionarFiltro = document.querySelector(".adicionarfiltros");
  modalAdicionarFiltro.style.display = "block";

  var modalEditarFiltros = document.querySelector(".editarfiltros");
  modalEditarFiltros.style.display = "none";
}

// Função para mostrar o modal de editar filtros
function mostrarModalEditarFiltros() {
  var modalAdicionarFiltro = document.querySelector(".adicionarfiltros");
  modalAdicionarFiltro.style.display = "none";

  var modalEditarFiltros = document.querySelector(".editarfiltros");
  modalEditarFiltros.style.display = "block";
}

// Função para ocultar todos os modais
function fecharModais() {
  var modalAdicionarFiltro = document.querySelector(".adicionarfiltros");
  modalAdicionarFiltro.style.display = "none";

  var modalEditarFiltros = document.querySelector(".editarfiltros");
  modalEditarFiltros.style.display = "none";
}

// Evento de clique no botão "Adicionar Filtro"
var btnAddFiltro = document.getElementById("addFiltro");
btnAddFiltro.addEventListener("click", mostrarModalAdicionarFiltro);

// Evento de clique no botão "Editar Filtros"
var btnEditarFiltro = document.getElementById("editarFiltro");
btnEditarFiltro.addEventListener("click", mostrarModalEditarFiltros);

// Evento de clique no botão de fechar do modal
var btnFecharModal = document.getElementsByClassName("close");
for (var i = 0; i < btnFecharModal.length; i++) {
  btnFecharModal[i].addEventListener("click", fecharModais);
}





// Função para mostrar o modal de confirmação de exclusão de filtro
function mostrarModalConfirmacaoExclusao() {
  var modalExclusao = document.getElementById("modalExclusao");
  modalExclusao.style.display = "block";
}

// Função para ocultar o modal de confirmação de exclusão de filtro
function fecharModalConfirmacaoExclusao() {
  var modalExclusao = document.getElementById("modalExclusao");
  modalExclusao.style.display = "none";
}



// Função para verificar se o nome do filtro foi digitado corretamente
function verificarNomeFiltro() {
  var nomeFiltroInput = document.getElementById("nomeFiltroInput");
  var nomeFiltro = nomeFiltroInput.value.trim();

  if (nomeFiltro === "Nome do Filtro") {
    var btnDeletarFiltro = document.getElementById("btnDeletarFiltro");
    btnDeletarFiltro.disabled = false;
  } else {
    var btnDeletarFiltro = document.getElementById("btnDeletarFiltro");
    btnDeletarFiltro.disabled = true;
  }
}

// Evento de clique no botão "Deletar Filtro"
var btnDeletarFiltro = document.getElementById("deletarFiltro");
btnDeletarFiltro.addEventListener("click", mostrarModalConfirmacaoExclusao);

// Evento de clique no botão de cancelar do modal de confirmação de exclusão de filtro
var btnCancelModalExclusao = document.getElementById("btnCancelModalExclusao");
btnCancelModalExclusao.addEventListener("click", fecharModalConfirmacaoExclusao);

// Evento de digitação no input do nome do filtro
var nomeFiltroInput = document.getElementById("nomeFiltroInput");
nomeFiltroInput.addEventListener("input", verificarNomeFiltro);