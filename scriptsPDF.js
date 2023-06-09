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

  exibirDocumentos()

}

// Adicionar evento de alteração a cada elemento do filtro
const selects = document.querySelectorAll('.filtro-select');
selects.forEach((select) => {
  select.addEventListener("change", atualizarLista);
});

function exibirDocumentos() {
  const db = firebase.firestore();

  // Obtém a referência para a div 'resultado'
  const divResultado = document.getElementById("resultado");

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
        select.addEventListener("change", atualizarLista);
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
                if([key]!="filtropai"  [key]!="dataupload"){
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
    const id = select.id.replace("_", " ");

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
  document.getElementById("iten").innerHTML = filtroFinal[0];

  const selectElement = document.getElementById('lista'); // Obtém a referência do elemento <select> pelo id

  selectElement.addEventListener('change', function() {
    const selectedValue = this.value; // Obtém o valor selecionado
    
    document.getElementById("iten").innerHTML = selectedValue; // Exibe o valor selecionado no html

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

  filtroFinal.forEach((valor) => {
    const option = document.createElement("option");
    option.innerText = valor;
    lista.appendChild(option);
  });

  const numPDF = document.getElementById("lista");
  const attNumPDF = numPDF.getElementsByTagName("option").length;
  document.getElementById("num-pdf").innerHTML = attNumPDF;
}

// Função para atualizar os filtros do seletor do filtro filho com base no filtro principal selecionado
function atualizarFiltrosFilho() {
  const filtroPrincipal = document.getElementById("FiltroPrincipal").value;
  const filtroFilho = document.getElementById("FiltroFilho");
  
  filtroFilho.innerHTML = ""; // Limpar os filtros do filho antes de atualizá-los
  
  const db = firebase.firestore();
  
  db.collection("filtros")
  .doc(filtroPrincipal)
  .get()
  .then((docSnapshot) => {
  if (docSnapshot.exists) {
  const data = docSnapshot.data();
  Object.keys(data).forEach((key) => {
  if (key !== "filtropai" && key !== "dataupload") {
  const option = document.createElement("option");
  option.value = data[key];
  option.textContent = data[key];
  filtroFilho.appendChild(option);
  }
  });
  }
  })
  .catch((error) => {
  console.error("Error getting document:", error);
  });
  }

// Adicionar evento de alteração ao seletor do filtro principal
const filtroPrincipal = document.getElementById("FiltroPrincipal");
filtroPrincipal.addEventListener("change", atualizarFiltrosFilho);
