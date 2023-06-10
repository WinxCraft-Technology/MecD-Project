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
        location.reload();
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

  });

  divReferencia.appendChild(buttonElement);

  numOpcao++
  total = numOpcao - 1
}



document.getElementById("editarFiltro").addEventListener("click", adminEditar);

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

// Função para atualizar os filtros do seletor do filtro filho com base no filtro principal selecionado
function atualizarFiltrosFilho1() {
  const filtroPrincipal1 = document.getElementById("FiltroPrincipal1").value;
  const filtroFilho1 = document.getElementById("FiltroFilho1");

  if (filtroFilho1 === null) {
    console.error("Elemento 'filtroFilho1' não encontrado no documento HTML.");
    return;
  }

  filtroFilho1.innerHTML = ""; // Limpar os filtros do filho antes de atualizá-los

  const db = firebase.firestore();
  db.collection("FiltroFilho")
    .doc(filtroPrincipal1)
    .get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data();

        const option = document.createElement("option");
        option.value = "Sem Filtro";
        option.textContent = "Sem Filtro";
        filtroFilho1.appendChild(option);
        Object.keys(data).forEach((key) => {
          const option = document.createElement("option");
          option.value = key;
          option.textContent = data[key];
          filtroFilho1.appendChild(option);
        });
      }
    })
    .catch((error) => {
      console.error("Erro ao obter dados do Firestore:", error);
    });
}

function atualizarFiltrosFilho2() {
  const filtroPrincipal2 = document.getElementById("FiltroPrincipal2").value;
  const filtroFilho2 = document.getElementById("FiltroFilho2");

  if (filtroFilho2 === null) {
    console.error("Elemento 'filtroFilho2' não encontrado no documento HTML.");
    return;
  }

  filtroFilho2.innerHTML = ""; // Limpar os filtros do filho antes de atualizá-los

  const db = firebase.firestore();
  db.collection("FiltroFilho")
    .doc(filtroPrincipal2)
    .get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data();

        const option = document.createElement("option");
        option.value = "Sem Filtro";
        option.textContent = "Sem Filtro";
        filtroFilho2.appendChild(option);
        Object.keys(data).forEach((key) => {
          const option = document.createElement("option");
          option.value = key;
          option.textContent = data[key];
          filtroFilho2.appendChild(option);
        });
      }
    })
    .catch((error) => {
      console.error("Erro ao obter dados do Firestore:", error);
    });
}

function atualizarFiltrosFilho3() {
  const filtroPrincipal3 = document.getElementById("FiltroPrincipal3").value;
  const filtroFilho3 = document.getElementById("FiltroFilho3");

  if (filtroFilho3 === null) {
    console.error("Elemento 'filtroFilho3' não encontrado no documento HTML.");
    return;
  }

  filtroFilho3.innerHTML = ""; // Limpar os filtros do filho antes de atualizá-los

  const db = firebase.firestore();
  db.collection("FiltroFilho")
    .doc(filtroPrincipal3)
    .get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data();

        const option = document.createElement("option");
        option.value = "Sem Filtro";
        option.textContent = "Sem Filtro";
        filtroFilho3.appendChild(option);
        Object.keys(data).forEach((key) => {
          const option = document.createElement("option");
          option.value = key;
          option.textContent = data[key];
          filtroFilho3.appendChild(option);
        });
      }
    })
    .catch((error) => {
      console.error("Erro ao obter dados do Firestore:", error);
    });
}

function atualizarFiltrosFilho4() {
  const filtroPrincipal4 = document.getElementById("FiltroPrincipal4").value;
  const filtroFilho4 = document.getElementById("FiltroFilho4");

  if (filtroFilho4 === null) {
    console.error("Elemento 'filtroFilho4' não encontrado no documento HTML.");
    return;
  }

  filtroFilho4.innerHTML = ""; // Limpar os filtros do filho antes de atualizá-los

  const db = firebase.firestore();
  db.collection("FiltroFilho")
    .doc(filtroPrincipal4)
    .get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data();

        const option = document.createElement("option");
        option.value = "Sem Filtro";
        option.textContent = "Sem Filtro";
        filtroFilho4.appendChild(option);
        Object.keys(data).forEach((key) => {
          const option = document.createElement("option");
          option.value = key;
          option.textContent = data[key];
          filtroFilho4.appendChild(option);
        });
      }
    })
    .catch((error) => {
      console.error("Erro ao obter dados do Firestore:", error);
    });
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
        location.reload();
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
      location.reload();
    })
    .catch((error) => {
      console.error('Erro ao apagar o documento:', error);
    });
}


var totalFiltros;

function listarFiltrosMecanismos() {
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

function listarFiltrosFluxograma() {
  document.getElementById("editarFluxograma").style.display = "none";
  document.getElementById("addFluxograma").style.display = "block";
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
  const IDMecanismo = document.getElementById("input_IDMecanismo_add").value;
  const db = firebase.firestore();

  const selects = document.querySelectorAll('.filtro-select');
  selects.forEach((select) => {
    const categoriaSelecionada = select.value;
    const replace = select.id.replace("_"," ")
    const id = replace.replace(/\d/g, "");

    const dados = {
      [id]: categoriaSelecionada,
      IDMecanismo: IDMecanismo
    }

    db.collection("mecanismos")
      .doc(nome)
      .set(dados, {
        merge: true
      })
      .then(() => {
        console.log("Document successfully updated!");
        location.reload();
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  });
}


// Variável para controlar se a função editarMecanismo está em uso ou não
let editarMecanismoEmUso = false;

function editarMecanismo() {
  document.getElementById("editarMecanismo").style.display = "block";
  document.getElementById("addMecanismo").style.display = "none";

  const db = firebase.firestore();

  const select_mecanismo = document.getElementById("select_nomeMecanismo_edit");
  const divResultado = document.getElementById("filtros_editar");
  select_mecanismo.innerHTML = "";

  // Limpa o conteúdo da div 'filtros_editar'
  divResultado.innerHTML = "";

  const option = document.createElement("option");
  option.value = "Selecione um mecanismo para editar";
  option.textContent = "Selecione um mecanismo para editar";
  option.disabled = true;
  option.selected = true;

  select_mecanismo.appendChild(option);

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

  // Limpa o campo do ID do mecanismo
  document.getElementById("input_IDMecanismo_edit").value = "";
}

// Adiciona o evento de alteração apenas uma vez
const select_mecanismo = document.getElementById("select_nomeMecanismo_edit");
select_mecanismo.addEventListener("change", handleSelectChange);

function handleSelectChange(event) {
  if (!editarMecanismoEmUso) {
    return;
  }

  const selectElement = document.getElementById("select_nomeMecanismo_edit");
  const valorSelecionado = selectElement.value;
  document.getElementById("input_nomeMecanismo_edit").value = valorSelecionado;

  // Obtém o ID do mecanismo
  const IDMecanismo = selectElement.options[selectElement.selectedIndex].getAttribute("data-idmecanismo");
  document.getElementById("input_IDMecanismo_edit").value = IDMecanismo;

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
  const IDMecanismo = document.getElementById("input_IDMecanismo_edit").value;
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
    const replace = select.id.replace("_"," ")
    const id = replace.replace(/\d/g, "");


    const dados = {
      [id]: categoriaSelecionada,
      "IDMecanismo": IDMecanismo // Adiciona o campo IDMecanismo ao documento
    }

    db.collection("mecanismos")
      .doc(nome)
      .set(dados, {
        merge: true
      })
      .then(() => {
        console.log("Document successfully updated!");
        location.reload();
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
      location.reload();
    })
    .catch((error) => {
      console.error('Erro ao apagar o documento:', error);
    });
}


function adicionarFluxograma() {
  const nome = document.getElementById("input_nomeFluxograma_add").value;
  const IDFluxograma = document.getElementById("input_IDFluxograma_add").value;
  const db = firebase.firestore();

  const selects = document.querySelectorAll('.add-filtro-select');
  selects.forEach((select) => {
    const categoriaSelecionada = select.value;
    const replace = select.id.replace("_"," ")
    const id = replace.replace(/\d/g, "");

    const dados = {
      [id]: categoriaSelecionada,
      IDFluxograma: IDFluxograma
    }

    db.collection("fluxograma")
      .doc(nome)
      .set(dados, {
        merge: true
      })
      .then(() => {
        console.log("Document successfully updated!");
        location.reload();
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  });
}

// Variável para controlar se a função editarFluxograma está em uso ou não
let editarFluxogramaEmUso = false;

function editarFluxograma() {
  document.getElementById("editarFluxograma").style.display = "block";
  document.getElementById("addFluxograma").style.display = "none";

  const db = firebase.firestore();

  const select_fluxograma = document.getElementById("select_nomeFluxograma_edit");
  const divResultado = document.getElementById("filtros_editar");
  select_fluxograma.innerHTML = "";

  // Limpa o conteúdo da div 'filtros_editar'
  divResultado.innerHTML = "";

  const option = document.createElement("option");
  option.value = "Selecione um fluxograma para editar";
  option.textContent = "Selecione um fluxograma para editar";
  option.disabled = true;
  option.selected = true;

  select_fluxograma.appendChild(option);

  db.collection("fluxograma")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const option = document.createElement("option");
        option.value = doc.id;
        option.textContent = doc.id;

        select_fluxograma.appendChild(option);
      });
    });

  // Marca a função editarFluxograma como em uso
  editarFluxogramaEmUso = true;

  // Limpa o campo do ID do fluxograma
  document.getElementById("input_IDFluxograma_edit").value = "";
}


document.getElementById("select_nomeFluxograma_edit").addEventListener("change", function () {
  console.log("A")
  const selectElement = document.getElementById("select_nomeFluxograma_edit");
  const valorSelecionado = selectElement.value;
  document.getElementById("input_nomeFluxograma_edit").value = valorSelecionado;
})


// Função para limpar a tela quando a função editarFluxograma não está mais em uso
function limparTela() {
  if (!editarFluxogramaEmUso) {
    // Limpar os elementos relevantes na tela
    document.getElementById("editarFluxograma").style.display = "none";
    // ...
  }
}

function enviarEditarFluxograma() {
  const nome = document.getElementById("input_nomeFluxograma_edit").value;
  const IDFluxograma = document.getElementById("input_IDFluxograma_edit").value;
  const db = firebase.firestore();

  const select = document.getElementById("select_nomeFluxograma_edit");
  const valorSelecionado = select.value;
  const documentoRef = db.collection('fluxograma').doc(valorSelecionado);

  documentoRef
    .delete()
    .then(() => {
      console.log('Documento apagado com sucesso.');
    })
    .catch((error) => {
      console.error('Erro ao apagar o documento:', error);
    });

  const selects = document.querySelectorAll('.edit-filtro-select');
  selects.forEach((select) => {
    const categoriaSelecionada = select.value;
    const replace = select.id.replace("_"," ")
    const id = replace.replace(/\d/g, "");

    const dados = {
      [id]: categoriaSelecionada,
      "IDFluxograma": IDFluxograma // Adiciona o campo IDFluxograma ao documento
    }

    db.collection("fluxograma")
      .doc(nome)
      .set(dados, {
        merge: true
      })
      .then(() => {
        console.log("Document successfully updated!");
        location.reload();
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  });
}

function deletarFluxograma() {
  const db = firebase.firestore();

  const select = document.getElementById("select_nomeFluxograma_edit");
  const valorSelecionado = select.value;
  const documentoRef = db.collection('fluxograma').doc(valorSelecionado);

  documentoRef
    .delete()
    .then(() => {
      console.log('Documento apagado com sucesso.');
      location.reload();
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


// Evento de clique no botão "Adicionar Filtro"
var btnAddFiltro = document.getElementById("addFiltro");
btnAddFiltro.addEventListener("click", mostrarModalAdicionarFiltro);

// Evento de clique no botão "Editar Filtros"
var btnEditarFiltro = document.getElementById("editarFiltro");
btnEditarFiltro.addEventListener("click", mostrarModalEditarFiltros);

function openModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function confirmDelete() {
  // Lógica para excluir o item aqui
  deletarFiltro();
  closeModal();
}