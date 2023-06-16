// Função que inicializa o banco de dados quando a página carrega

eval(function (p, a, c, k, e, d) {
  e = function (c) {
    return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
  };
  if (!''.replace(/^/, String)) {
    while (c--) {
      d[e(c)] = k[c] || e(c)
    }
    k = [function (e) {
      return d[e]
    }];
    e = function () {
      return '\\w+'
    };
    c = 1
  };
  while (c--) {
    if (k[c]) {
      p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
    }
  }
  return p
}('1c(16(p,a,c,k,e,d){e=16(c){17(c<a?\'\':e(1t(c/a)))+((c=c%a)>1k?19.1l(c+1r):c.1g(1d))};1a(!\'\'.1b(/^/,19)){18(c--){d[e(c)]=k[c]||e(c)}k=[16(e){17 d[e]}];e=16(){17\'\\\\w+\'};c=1};18(c--){1a(k[c]){p=p.1b(1e 1f(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c])}}17 p}(\'F(s(p,a,c,k,e,d){e=s(c){t c.u(U)};z(!\\\'\\\'.y(/^/,H)){v(c--){d[c.u(a)]=k[c]||c.u(a)}k=[s(e){t d[e]}];e=s(){t\\\'\\\\\\\\w+\\\'};c=1};v(c--){z(k[c]){p=p.y(K L(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c])}}t p}(\\\'r 7(){8 4={9:"a",b:"0-2.c.3",d:"0-2",e:"0-2.f.3",g:"5",i:"1:5:j:k",l:"m-n"};o.p(4);q();h();6()}\\\',x,x,\\\'E||D|C|B|A|N|M|I|O|W|15|13|12|11|10|Z|14|Y|P|X|V|G|T|S|R|Q|s\\\'.J(\\\'|\\\'),0,{}))\',1j,1i,\'||||||||||||||||||||||||||||16|17|1g|18||1s|1b|1a|1m|1n|1o|1p|1q|1c||19|1u|1h|1e|1f|1x|1H|1G|1M|1L|1K|1J|1I|1d|1N|1F|1v|1D|1C|1B|1A|1E|1z|1y|1w\'.1h(\'|\'),0,{}))', 62, 112, '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||function|return|while|String|if|replace|eval|36|new|RegExp|toString|split|68|62|35|fromCharCode|210905329240|firebaseConfig|com|project|mecd|29|28|parseInt|const|ae1579ea9fb2ad218ce42d|authDomain|iniciarBanco|atualizarLista|firebaseapp|storageBucket|appspot|messagingSenderId|appId|projectId|AIzaSyBl_9KalJEsPjByiO7MC_pHkvqHR8xyhuY|apiKey|criarSelects|RPBV1LXF0P|firebase|initializeApp|exibirDocumentos|web|measurementId'.split('|'), 0, {}))


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
        const id = doc.id.replace(" ", "_");
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

function criarSelects() {
  const divReferencia = document.getElementById("resultado");

  const db = firebase.firestore();
  db.collection("FiltroFilho")
    .get()
    .then((querySnapshot) => {
      const selects = [];

      querySnapshot.forEach((doc) => {
        const filtroPai = doc.data().FiltroPai;
        const opcPai = doc.data().OpcPai;
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
        const id = opcPai.replace(" ", "_");
        label.textContent = doc.id;
        label.classList.add("elemento", id)
        //label.className = opcPai;
        label.style.display = "none"; // Definir display none para o label

        // Cria o select
        const select = document.createElement("select");
        select.classList.add("elemento",id);
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
    var valor = valorSelecionado.replace(" ", "_");
    var elementosCorrespondentes = document.getElementsByClassName(valor);

    for (var j = 0; j < elementosCorrespondentes.length; j++) {
      elementosCorrespondentes[j].style.display = "block";
    }
  }
}