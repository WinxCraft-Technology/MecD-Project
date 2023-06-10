// Função que inicializa o banco de dados quando a página carrega

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1b(14(p,a,c,k,e,d){e=14(c){15(c<a?\'\':e(1r(c/a)))+((c=c%a)>1i?19.1j(c+1p):c.1e(1c))};17(!\'\'.18(/^/,19)){16(c--){d[e(c)]=k[c]||e(c)}k=[14(e){15 d[e]}];e=14(){15\'\\\\w+\'};c=1};16(c--){17(k[c]){p=p.18(1d 1a(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c])}}15 p}(\'E(r(p,a,c,k,e,d){e=r(c){s c.t(S)};y(!\\\'\\\'.x(/^/,F)){u(c--){d[c.t(a)]=k[c]||c.t(a)}k=[r(e){s d[e]}];e=r(){s\\\'\\\\\\\\w+\\\'};c=1};u(c--){y(k[c]){p=p.x(J K(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c])}}s p}(\\\'q 7(){8 4={9:"a",b:"0-2.c.3",d:"0-2",e:"0-2.g.3",f:"5",i:"1:5:j:k",l:"m-n"};o.p(4);h();6()}\\\',v,v,\\\'D||C|B|A|M|z|L|H|N|U|13|12|11|10|Z|Y|X|O|V|W|T|G|R|Q|P|r\\\'.I(\\\'|\\\'),0,{}))\',1h,1g,\'|||||||||||||||||||||||||||14|15|1e|16|1q||18|17|1k|1l|1m|1n|1o|1b|19||1s|1f|1d|1a|1v|1H|1D|1J|1I|1G|1F|1c|1E|1K|1C|1t|1A|1z|1y|1B|1x|1w|1u\'.1f(\'|\'),0,{}))',62,109,'||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||function|return|while|if|replace|String|RegExp|eval|36|new|toString|split|66|62|35|fromCharCode|atualizarLista|firebaseConfig|com|project|mecd|29|27|parseInt|const|ae1579ea9fb2ad218ce42d|authDomain|iniciarBanco|firebaseapp|projectId|messagingSenderId|appspot|exibirDocumentos|storageBucket|web|apiKey|measurementId|RPBV1LXF0P|firebase|210905329240|initializeApp|appId|AIzaSyBl_9KalJEsPjByiO7MC_pHkvqHR8xyhuY'.split('|'),0,{}))

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
                if ([key] != "filtropai" [key] != "dataupload") {
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
function atualizarFiltrosFilho() {
  const filtroPrincipal = document.getElementById("FiltroPrincipal").value;
  const filtroFilho = document.getElementById("FiltroFilho");

  if (filtroFilho === null) {
    console.error("Elemento 'filtroFilho' não encontrado no documento HTML.");
    return;
  }

  filtroFilho.innerHTML = ""; // Limpar os filtros do filho antes de atualizá-los

  const db = firebase.firestore();
  db.collection("FiltroFilho")
    .doc(filtroPrincipal)
    .get()
    .then((docSnapshot) => {
      const option = document.createElement("option");
      option.value = "Sem Filtro";
      option.textContent = "Sem Filtro";
      filtroFilho.appendChild(option);
      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        Object.keys(data).forEach((key) => {
          const option = document.createElement("option");
          option.value = key;
          option.textContent = data[key];
          filtroFilho.appendChild(option);
        });
      }
    })
    .catch((error) => {
      console.error("Erro ao obter dados do Firestore:", error);
    });
}

document.getElementById("FiltroPrincipal").addEventListener("change", atualizarFiltrosFilho)