const itens = [
    { nome: "01 - Sulfidation", categoria1: "1", categoria2: "7", categoria3: "11" },
    { nome: "02 - Wet H2S Damage", categoria1: "1", categoria2: "5", categoria3: "9" },
    { nome: "03 - Creep and Stress Rupture", categoria1: "2", categoria2: "8", categoria3: "10" },
    { nome: "04 - High-temperature H2_H2S Corrosion", categoria1: "3", categoria2: "5", categoria3: "12" },
    { nome: "05 - Polythionic Acid Stress Corrosion Cracking", categoria1: "3", categoria2: "6", categoria3: "12" },
    { nome: "06 - Naphthenic Acid Corrosion", categoria1: "4", categoria2: "6", categoria3: "11" },
];
  
const select = document.getElementById("filtro1");
const select2 = document.getElementById("filtro2");
const select3 = document.getElementById("filtro3");
const lista = document.getElementById("lista")
  
function atualizarLista() {
  const categoriaSelecionada = select.value;
  const categoriaSelecionada2 = select2.value;
  const categoriaSelecionada3 = select3.value;
  lista.innerHTML = "";
  
  itens.forEach(item => {
    if ((categoriaSelecionada === "0" && categoriaSelecionada2 === "00" && categoriaSelecionada3 === "000") || 
        ((categoriaSelecionada === item.categoria1 || categoriaSelecionada === "0") && (categoriaSelecionada2 === item.categoria2 || categoriaSelecionada2 === "00") && (categoriaSelecionada3 === item.categoria3 || categoriaSelecionada3 === "000"))) {
      const li = document.createElement("option");
      li.innerText = item.nome;
      lista.appendChild(li);
    }
  });
}
  
function atualizarPDF(){

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

}
  
select.addEventListener("change", atualizarLista);
select2.addEventListener("change", atualizarLista);
select3.addEventListener("change", atualizarLista);
lista.addEventListener("change", atualizarPDF)
  
atualizarLista();




// Função que inicializa o banco de dados quando a página carrega

function iniciarBanco(){
  const firebaseConfig = {
    apiKey: "AIzaSyBMDdaEil8VJvi-AjiMEKSs_IFYrfcfmDU",
    authDomain: "testepdfpd.firebaseapp.com",
    projectId: "testepdfpd",
    storageBucket: "testepdfpd.appspot.com",
    messagingSenderId: "619273138295",
    appId: "1:619273138295:web:88547de11772e46f841672",
    measurementId: "G-R6CXK9KJJX"
  };

  firebase.initializeApp(firebaseConfig);
}
