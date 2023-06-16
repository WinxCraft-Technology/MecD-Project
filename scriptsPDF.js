// Função que inicializa o banco de dados quando a página carrega

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
  exibirDocumentos();
  criarSelects();
  getNumberOfItems();
}

// Adicionar evento de alteração a cada elemento do filtro
const selects = document.querySelectorAll('.filtro-select');
selects.forEach((select) => {
  select.addEventListener("change", atualizarLista);
  select.addEventListener("change", ativarFiltroFilho);
});

function exibirDocumentos() {
  const db = firebase.firestore();

  // Obtém a referência para a div 'resultado'
  const divReferencia = document.getElementById("resultado");

  // Limpa o conteúdo da div 'resultado'
  divReferencia.innerHTML = "";

  // Obtém a lista de documentos
  db.collection("filtros")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const div = document.createElement("div");
        const id = doc.id.replaceAll(" ", "_");
        div.className = id;
        div.id = "div" + id;
        divReferencia.appendChild(div);

        const label = document.createElement("label");
        label.textContent = doc.id;
        div.appendChild(label);

        const select = document.createElement("select");
        select.id = "select" + id;
        select.classList.add("filtro-select", id);
        select.addEventListener("change", atualizarLista);
        select.addEventListener("change", ativarFiltroFilho);
        div.appendChild(select);

        db.collection("filtros")
          .doc(doc.id)
          .get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              const data = docSnapshot.data();

              const optionDefault = document.createElement("option");
              optionDefault.value = "Sem Filtro";
              optionDefault.textContent = "Sem Filtro";
              select.appendChild(optionDefault);

              Object.keys(data).forEach((key) => {
                if (key !== "filtropai" && key !== "dataupload") {
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


async function atualizarLista() {
  const filtrosSelecionados = []; // Array para armazenar os filtros selecionados
  const botao = document.getElementById('btn-pdf');

  const selects = document.querySelectorAll('.filtro-select');
  selects.forEach((select) => {
    const categoriaSelecionada = select.value;
    const id2 = select.id.replaceAll("_", " ");
    const id = id2.replaceAll("select", "");

    filtrosSelecionados.push({
      campo: id, // ID do select que representa o campo do filtro
      valor: categoriaSelecionada
    });
  });

  const db = firebase.firestore();
  const mecanismosRef = db.collection("mecanismos");

  let filtroFinal = [];

  if (filtrosSelecionados.length > 0) {
    let query = mecanismosRef;

    filtrosSelecionados.forEach((filtro) => {
      if (filtro.valor != "Sem Filtro") {
        query = query.where(filtro.campo, "==", filtro.valor);
      }
    });

    const querySnapshot = await query.get();
    querySnapshot.forEach((doc) => {
      filtroFinal.push(doc.id);

      const selectElement = document.getElementById('lista'); // Obtém a referência do elemento <select> pelo id

      selectElement.addEventListener('change', function () {
        const selectedValue = this.value; // Obtém o valor selecionado

        db.collection("mecanismos")
          .doc(selectedValue)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const IDMecanismo = doc.data().IDMecanismo;

              botao.setAttribute('href', IDMecanismo);

            } else {
              console.log("Documento não encontrado");
            }
          })
          .catch((error) => {
            console.error("Erro ao obter documento: ", error);
          });
      });

    });

  }

  const lista = document.getElementById("lista");
  lista.innerHTML = ""; // Limpar a lista antes de atualizá-la

  const option = document.createElement("option");
  option.innerText = "Escolha um Filtro";
  lista.appendChild(option);
  filtroFinal.forEach((valor) => {
    const option = document.createElement("option");
    option.innerText = valor;
    lista.appendChild(option);
  });

  const numPDF = document.getElementById("lista");
  const attNumPDF = numPDF.getElementsByTagName("option").length;
  document.getElementById("num-pdf").innerHTML = attNumPDF - 1;
}

// Função para atualizar os filtros do seletor do filtro filho com base no filtro principal selecionado

function criarSelects() {
  const divReferencia = document.getElementById("resultado");

  const db = firebase.firestore();
  db.collection("FiltroFilho")
    .get()
    .then((querySnapshot) => {
      const selects = [];

      querySnapshot.forEach((doc) => {
        const filtroPai = doc.data().FiltroPai.replaceAll(" ", "_");
        const opcPai = doc.data().OpcPai.replaceAll(" ", "_");
        const divId = "div" + filtroPai;

        // Verifica se a div com o id já existe
        if (!document.getElementById(divId)) {
          // Cria a div com o id "div" + filtroPai
          const div = document.createElement("div");
          div.id = divId;
          divReferencia.appendChild(div);
        }

        const div2 = document.createElement("div");
        div2.className = "divFiltroFilho";

        const label = document.createElement("label");
        const id = opcPai.replaceAll(" ", "_");
        label.textContent = doc.id;
        label.classList.add("elemento", id)
        //label.className = opcPai;
        label.style.display = "none"; // Definir display none para o label

        // Cria o select
        const select = document.createElement("select");
        select.classList.add("elemento", id);
        select.addEventListener("change", atualizarLista);
        select.addEventListener("change", ativarFiltroFilho);
        select.style.display = "none"; // Definir display none para o select

        // Obter os valores do documento
        db.collection("FiltroFilho")
          .doc(doc.id)
          .get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              const data = docSnapshot.data();
              const optionDefault = document.createElement("option");
              optionDefault.value = "Sem Filtro";
              optionDefault.textContent = "Sem Filtro";
              select.appendChild(optionDefault);

              Object.keys(data).forEach((key) => {
                if (key !== "FiltroPai" && key !== "OpcPai") {
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

        // Adiciona o select e o label à div correspondente
        const divResultado = document.getElementById(divId);
        divResultado.appendChild(div2);
        div2.appendChild(label);
        div2.appendChild(select);

        selects.push(select);
      });
    })
    .catch((error) => {
      console.error("Erro ao obter os dados:", error);
    });
}

function ativarFiltroFilho() {
  var selects = document.getElementsByClassName("filtro-select");

  // Obter os valores selecionados de todos os selects
  var valoresSelecionados = Array.from(selects).map(function (select) {
    return select.value;
  });

  // Selecionar todos os elementos com a classe correspondente
  var elementos = document.getElementsByClassName("elemento");

  // Ocultar todos os elementos
  for (var i = 0; i < elementos.length; i++) {
    elementos[i].style.display = "none";
  }

  // Mostrar apenas os elementos correspondentes aos valores selecionados
  for (var i = 0; i < valoresSelecionados.length; i++) {
    var valorSelecionado = valoresSelecionados[i];
    var valor = valorSelecionado.replaceAll(" ", "_");
    var elementosCorrespondentes = document.getElementsByClassName(valor);

    for (var j = 0; j < elementosCorrespondentes.length; j++) {
      elementosCorrespondentes[j].style.display = "block";
    }
  }
}

function getNumberOfItems() {
  const db = firebase.firestore();
  const mecanismosRef = db.collection("mecanismos");

  mecanismosRef
    .get()
    .then((querySnapshot) => {
      const numberOfItems = querySnapshot.size;
      document.getElementById("num-pdf").innerHTML = numberOfItems.toString();

      const listaSelect = document.getElementById("lista");

      // Limpar as opções existentes
      listaSelect.innerHTML = "";

      // Adicionar a opção padrão
      const optionDefault = document.createElement("option");
      optionDefault.value = "";
      optionDefault.textContent = "Selecione um Mecanismo";
      listaSelect.appendChild(optionDefault);

      // Adicionar as opções com os nomes dos documentos
      querySnapshot.forEach((doc) => {
        const option = document.createElement("option");
        option.value = doc.id;
        option.textContent = doc.id;
        listaSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erro ao obter o número de itens:", error);
    });
}

function atualizarHrefBtnPdf() {
  const selectedValue = document.getElementById("lista").value;
  const botao = document.getElementById("btn-pdf");
  const db = firebase.firestore();

  if (selectedValue) {
      db.collection("mecanismos")
          .doc(selectedValue)
          .get()
          .then((doc) => {
              if (doc.exists) {
                  const data = doc.data();
                  if (data.IDMecanismo) {
                      botao.setAttribute("href", data.IDMecanismo);
                  } else {
                      console.log("Campo 'IDMecanismo' não encontrado no documento");
                      botao.removeAttribute("href");
                  }
              } else {
                  console.log("Documento não encontrado");
                  botao.removeAttribute("href");
              }
          })
          .catch((error) => {
              console.error("Erro ao obter documento: ", error);
              botao.removeAttribute("href");
          });
  } else {
      botao.removeAttribute("href");
  }
}