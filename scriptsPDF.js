// Função que inicializa o banco de dados quando a página carrega

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
}
  
const select = document.getElementById("filtro1");
const select2 = document.getElementById("filtro2");
const select3 = document.getElementById("filtro3");
const select4 = document.getElementById("filtro4");
const lista = document.getElementById("lista")

async function atualizarLista() {
  const categoriaSelecionada = select.value;
  const categoriaSelecionada2 = select2.value;
  const categoriaSelecionada3 = select3.value;
  lista.innerHTML = "";

  const db = firebase.firestore();
  const mecanismosRef = db.collection("mecanismos");

  let filtro1 = [];
  let filtro2 = [];
  let filtro3 = [];

  if(categoriaSelecionada=="N1"){
    filtro1 = ["Teste", "Corrosão Sob Isolamento"];
  } else {
    const querySnapshot = await mecanismosRef.where("TipodeUnidade", "==", categoriaSelecionada).get();
    querySnapshot.forEach((doc) => {
      filtro1.push(doc.data().Nome);
    });    
  }

  if(categoriaSelecionada2=="N2"){
    console.log("Nada")
  } else {
    const querySnapshot = await mecanismosRef.where("LoopdeCorrosao", "==", categoriaSelecionada2).get();
    querySnapshot.forEach((doc) => {
      filtro2.push(doc.data().Nome);
    });   
  }

  if(categoriaSelecionada3=="N3"){
    console.log("Nada")
  } else {
    const querySnapshot = await mecanismosRef.where("MaterialdeConstrucao", "==", categoriaSelecionada3).get();
    querySnapshot.forEach((doc) => {
      filtro3.push(doc.data().Nome);
    });
  }

  const valoresRepetidos = [];

  for (let i = 0; i < filtro1.length; i++) {
    const valor = filtro1[i];

    if (filtro2.indexOf(valor) !== -1 && filtro3.indexOf(valor) !== -1 && valoresRepetidos.indexOf(valor) === -1) {
      valoresRepetidos.push(valor);
    }
  }

  console.log(valoresRepetidos);

  for (let i = 0; i < valoresRepetidos.length; i++) {
    const valor = valoresRepetidos[i];
    const option = document.createElement("option");
    option.innerText = valor;
    lista.appendChild(option);
  }

  const numPDF = document.getElementById("lista");
  const attNumPDF = numPDF.getElementsByTagName("option").length;
    
  document.getElementById("num-pdf").innerHTML = "Nº de Arquivos: " + attNumPDF
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
  
select.addEventListener("change", atualizarLista);
select2.addEventListener("change", atualizarLista);
select3.addEventListener("change", atualizarLista);
select4.addEventListener("change", atualizarLista);
//lista.addEventListener("change", atualizarPDF)
  

// Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}