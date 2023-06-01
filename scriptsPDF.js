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
                if([key]!="filtropai"){
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
      if(filtro.valor != "Sem Filtro") {
        query = query.where(filtro.campo, "==", filtro.valor);
      }
      
    });

    const querySnapshot = await query.get();
    querySnapshot.forEach((doc) => {
      filtroFinal.push(doc.id);
    });

  }

  lista.innerHTML = ""; // Limpar a lista antes de atualizá-la

  filtroFinal.forEach((valor) => {
    const option = document.createElement("option");
    option.innerText = valor;
    lista.appendChild(option);
  });

  const numPDF = document.getElementById("lista");
  const attNumPDF = numPDF.getElementsByTagName("option").length;
  document.getElementById("num-pdf").innerHTML = "Nº de Arquivos: " + attNumPDF;
}



/*function atualizarPDF(){

  // Obtenha o mecanismo de dano selecionado
  var selectP = document.getElementById("lista")
  var value = selectP.options[selectP.selectedIndex].value;
  numPDF = value.substring(4);

  var embed = document.getElementById("alterar-pdf")

  // Inicializa o firebase storage
  var storage = firebase.storage();

  // Obtenha uma referência ao arquivo no Firebase Storage
  var storageRef = firebase.storage().ref().child("assets/PDFs/"+value+".pdf");

  // Obtenha a URL de download do arquivo
  storageRef.getDownloadURL().then(function(url) {
  // Defina a URL da imagem como a URL de download do arquivo
  var embed = document.getElementById("alterar-pdf")
    embed.src = url
  }).catch(function(error) {
    console.error(error);
  });

  

}*/

//lista.addEventListener("change", atualizarPDF)


// Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}



/* Segunda Solução

function iniciarBanco() {
  const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "mecd-project.firebaseapp.com",
    projectId: "mecd-project",
    storageBucket: "mecd-project.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID",
    measurementId: "SEU_MEASUREMENT_ID"
  };

  firebase.initializeApp(firebaseConfig);

  exibirDocumentos();
}

function exibirDocumentos() {
  const db = firebase.firestore();
  const divResultado = document.getElementById("resultado");
  divResultado.innerHTML = "";

  db.collection("filtros")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const label = document.createElement("label");
        label.textContent = doc.id;
        divResultado.appendChild(label);

        const select = document.createElement("select");
        var id = doc.id.replace(" ", "_");
        select.id = id;
        select.className = "filtro-select";
        divResultado.appendChild(select);

        db.collection("filtros")
          .doc(doc.id)
          .get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              const data = docSnapshot.data();
              Object.keys(data).forEach((key) => {
                if (key !== "nome") {
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
  const selects = document.querySelectorAll('.filtro-select');
  const filtrosSelecionados = Array.from(selects).map((select) => ({
    campo: select.id.replace("_", " "),
    valor: select.value
  }));

  const db = firebase.firestore();
  const mecanismosRef = db.collection("mecanismos");

  let filtroFinal = [];

  if (filtrosSelecionados.length > 0) {
    let query = mecanismosRef;

    filtrosSelecionados.forEach((filtro) => {
      if (filtro.valor !== "N") {
        query = query.where(filtro.campo, "==", filtro.valor);
      }
    });

    const querySnapshot = await query.get();
    querySnapshot.forEach((doc) => {
      filtroFinal.push(doc.id);
    });
  }

  lista.innerHTML = "";
  filtroFinal.forEach((valor) => {
    const option = document.createElement("option");
    option.innerText = valor;
    lista.appendChild(option);
  });

  const numPDF = document.getElementById("lista");
  const attNumPDF = numPDF.getElementsByTagName("option").length;
  document.getElementById("num-pdf").innerHTML = "Nº de Arquivos: " + attNumPDF;
}

select.addEventListener("change", atualizarLista);
select2.addEventListener("change", atualizarLista);
select3.addEventListener("change", atualizarLista);
select4.addEventListener("change", atualizarLista);
*/