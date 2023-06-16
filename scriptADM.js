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
}('25(1R(p,a,c,k,e,d){e=1R(c){1S(c<a?\'\':e(1Z(c/a)))+((c=c%a)>20?1W.21(c+29):c.22(23))};1T(!\'\'.1U(/^/,1W)){1V(c--){d[e(c)]=k[c]||e(c)}k=[1R(e){1S d[e]}];e=1R(){1S\'\\\\w+\'};c=1};1V(c--){1T(k[c]){p=p.1U(24 1Y(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c])}}1S p}(\'18(Q(p,a,c,k,e,d){e=Q(c){R(c<a?\\\'\\\':e(1c(c/a)))+((c=c%a)>1d?W.1e(c+1f):c.1g(1h))};S(!\\\'\\\'.U(/^/,W)){V(c--){d[e(c)]=k[c]||e(c)}k=[Q(e){R d[e]}];e=Q(){R\\\'\\\\\\\\w+\\\'};c=1};V(c--){S(k[c]){p=p.U(1j 1k(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c])}}R p}(\\\'5 P(){g a={i:"m",q:"0-4.s.7",t:"0-4",u:"0-4.r.7",p:"6",l:"1:6:k:j",h:"G-f"};2.v(a);2.x().y(5(3){O(3){8.9("cáb dá e:",3);N.M("L").K.J="I"}H{8.9("cáb não dá e");F.E.D="C.B"}});A z=2.w()}\\\',T,T,\\\'1a||19|14|17|Q|Y|Z|10|1m|X|12|13|11|15|16|1l|1b|1n|1v|1G|1H|1I|||1K|1J|1E|1L|1M|1N|1O|1P|1Q|1F|1D|1o|1B|1A|1z|1y|1x||1w|1C|1u|1t|1s|1r|1q|S|1p\\\'.1i(\\\'|\\\'),0,{}))\',2t,2s,\'||||||||||||||||||||||||||||||||||||||||||||||||||||1R|1S|1T|2O|1U|1V|1W|2l|2k|2i|2v|2h|2g|2f|2e|2d|2c|2b|25|2a|28|2u|1Z|20|21|29|22|23|1X|24|1Y|2Q|2R|2S|2T|2L|2J|2x|2H|2G|2F|2E|2D|2C|2B|2A|2z|2I|27|26|2P|2K|2N|2M|2y|2w|2j|2m|2n|2o|2p|2q|2r\'.1X(\'|\'),0,{}))', 62, 180, '|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||function|return|if|replace|while|String|split|RegExp|parseInt|35|fromCharCode|toString|36|new|eval|db|block|mecd||firebase|project|RPBV1LXF0P|logado|user|Usu|rio|est|com|messagingSenderId|210905329240|firebaseConfig|firebaseapp|projectId|storageBucket|initializeApp|firestore|auth|115|62|measurementId|console|authDomain|getElementById|AIzaSyBl_9KalJEsPjByiO7MC_pHkvqHR8xyhuY|ADMlogin|href|location|window|else|ae1579ea9fb2ad218ce42d|display|style|dbody|html|document|onAuthStateChanged|iniciarBanco|appId|web|52|appspot|const|log|apiKey|var'.split('|'), 0, {}))

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

function deletarFiltroFilho() {
  const selectElement = document.getElementById('nameEditFilho');
  const valorSelecionado = selectElement.options[selectElement.selectedIndex].value;

  const db = firebase.firestore();
  const documentoRef = db.collection('FiltroFilho').doc(valorSelecionado);

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



// Adicionar filtros novos no banco de dados
var total = 1;

function adicionarFiltroFilho() {
  const nome = document.getElementById("nameFilho").value;
  var selectElement = document.getElementById("selecionarFiltroPai");
  var valorSelecionado = selectElement.value;

  var opcPai = document.getElementById("selecionarOpcFiltroPai");
  var valorOpcPai = opcPai.value;

  const db = firebase.firestore();

  for (let i = 1; i <= totalFilho; i++) {
    const opcao = "opc" + i + "Filho";
    const campo = "opc" + i
    const valor = document.getElementById(opcao).value;

    const filtro = {
      [campo]: valor,
      FiltroPai: valorSelecionado,
      OpcPai: valorOpcPai
    };

    db.collection("FiltroFilho")
      .doc(nome)
      .set(filtro, {
        merge: true
      })
      .then(() => {
        console.log("Documento atualizado com sucesso!");
        location.reload();
      })
      .catch((error) => {
        console.error("Erro ao atualizar o documento: ", error);
      });
  }
}

document.getElementById("selecionarFiltroPai").addEventListener("change", function () {
  const nomeFiltro = document.getElementById('selecionarFiltroPai');
  const valorSelecionado = nomeFiltro.options[nomeFiltro.selectedIndex].value;

  var selectElement = document.getElementById("selecionarOpcFiltroPai");
  selectElement.innerHTML = "";
  var optionElement = document.createElement("option");
  optionElement.value = "Opções do Filtro Pai";
  optionElement.textContent = "Opções do Filtro Pai";
  optionElement.selected = true;
  optionElement.disabled = true;
  selectElement.appendChild(optionElement);

  var db = firebase.firestore()
  db.collection("filtros")
    .doc(valorSelecionado)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        var data = doc.data();
        var campos = Object.values(data);

        campos.forEach(function (valor) {
          var optionElement = document.createElement("option");
          optionElement.value = valor;
          optionElement.textContent = valor;
          selectElement.appendChild(optionElement);
        });
      } else {
        console.log("Documento não encontrado.");
      }
    })
    .catch(function (error) {
      console.log("Erro ao buscar os valores:", error);
    });
})

document.getElementById("selecionarFiltroPaiEdit").addEventListener("change", function () {
  const nomeFiltro = document.getElementById('selecionarFiltroPaiEdit');
  const valorSelecionado = nomeFiltro.options[nomeFiltro.selectedIndex].value;

  var selectElement = document.getElementById("selecionarOpcFiltroPaiEdit");
  selectElement.innerHTML = "";
  var optionElement = document.createElement("option");
  optionElement.value = "Opções do Filtro Pai";
  optionElement.textContent = "Opções do Filtro Pai";
  optionElement.selected = true;
  optionElement.disabled = true;
  selectElement.appendChild(optionElement);

  var db = firebase.firestore()
  db.collection("filtros")
    .doc(valorSelecionado)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        var data = doc.data();
        var campos = Object.values(data);

        campos.forEach(function (valor) {
          var optionElement = document.createElement("option");
          optionElement.value = valor;
          optionElement.textContent = valor;
          selectElement.appendChild(optionElement);
        });
      } else {
        console.log("Documento não encontrado.");
      }
    })
    .catch(function (error) {
      console.log("Erro ao buscar os valores:", error);
    });



})

var numOpcaoFilho = 2;
var totalFilho = numOpcaoFilho - 1;

function addOptionFilho() {
  var divResultado = document.getElementById("novasOptionsFilho");

  const div = document.createElement("div");
  divAtual = "divopc" + numOpcaoFilho + "Filho";
  div.id = divAtual;
  divResultado.appendChild(div);
  var divReferencia = document.getElementById(divAtual);

  const input = document.createElement("input");
  input.id = "opc" + numOpcaoFilho + "Filho";
  input.type = "text";
  input.placeholder = "Insira o conteúdo da opção. Exemplo: Físico/Químico";
  divReferencia.appendChild(input);

  const buttonElement = document.createElement("button");
  buttonElement.type = "button";
  buttonElement.id = "button" + "opc" + numOpcaoFilho + "Filho";
  buttonElement.className = "deletebutton";
  buttonElement.innerHTML = "Deletar";

  buttonElement.addEventListener("click", function (event) {
    const botaoClicado = event.target;
    const idBotao = botaoClicado.id;
    const substring = idBotao.substring(9);
    const posicaoInt = parseInt(substring);
    const apagar = document.getElementById("divopc" + posicaoInt + "Filho");
    apagar.remove();

    numOpcaoFilho--;
    for (let i = posicaoInt + 1; i <= numOpcaoFilho; i++) {
      const posAtual = i - 1;
      const alterarInput = document.getElementById("opc" + i + "Filho");
      const alterarDiv = document.getElementById("divopc" + i + "Filho");
      const alterarBotao = document.getElementById("buttonopc" + i + "Filho");

      alterarInput.id = "opc" + posAtual + "Filho";
      alterarDiv.id = "divopc" + posAtual + "Filho";
      alterarBotao.id = "buttonopc" + posAtual + "Filho";
    }
  });

  divReferencia.appendChild(buttonElement);

  numOpcaoFilho++;
  totalFilho = numOpcaoFilho - 1;
}

document.getElementById("editarFiltroFilho").addEventListener("click", adminEditarFilho);

function adminEditarFilho() {
  var db = firebase.firestore();
  var selectElement = document.getElementById("nameEditFilho");
  selectElement.innerHTML = "";
  var optionElement = document.createElement("option");
  optionElement.value = "Lista de Filtros Filhos";
  optionElement.textContent = "Lista de Filtros Filhos";
  optionElement.selected = true;
  optionElement.disabled = true;
  selectElement.appendChild(optionElement);

  db.collection("FiltroFilho")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var nomeDocumento = doc.id;
        var optionElement = document.createElement("option");
        optionElement.value = nomeDocumento;
        optionElement.textContent = nomeDocumento;
        selectElement.appendChild(optionElement);
      });
    })
    .catch(function (error) {
      console.log("Erro ao buscar os valores:", error);
    });

  var selectElement2 = document.getElementById("selecionarFiltroPaiEdit");
  selecionarFiltroPaiEdit.innerHTML = "";
  var optionElement2 = document.createElement("option");
  optionElement2.value = "Lista de Filtros Principais";
  optionElement2.textContent = "Lista de Filtros Principais";
  optionElement2.selected = true;
  optionElement2.disabled = true;
  selectElement2.appendChild(optionElement2);

  db.collection("filtros")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var nomeDocumento2 = doc.id;
        var optionElement3 = document.createElement("option");
        optionElement3.value = nomeDocumento2;
        optionElement3.textContent = nomeDocumento2;
        selectElement2.appendChild(optionElement3);
      });
    })
    .catch(function (error) {
      console.log("Erro ao buscar os valores:", error);
    });

}

function editarFiltroFilho() {
  const selectElement = document.getElementById('nameEditFilho');
  const valorSelecionado = selectElement.options[selectElement.selectedIndex].value;

  const selectElement2 = document.getElementById('selecionarFiltroPaiEdit');
  const filtroPai = selectElement2.options[selectElement2.selectedIndex].value;

  const selectElement3 = document.getElementById('selecionarOpcFiltroPaiEdit');
  const opcPai = selectElement3.options[selectElement3.selectedIndex].value;

  const db = firebase.firestore();

  // Defina o caminho do documento que deseja apagar
  const documentoRef = db.collection('FiltroFilho').doc(valorSelecionado);

  // Apague as informações do documento
  documentoRef
    .delete()
    .then(() => {
      console.log('Documento apagado com sucesso.');
    })
    .catch((error) => {
      console.error('Erro ao apagar o documento:', error);
    });

  for (let i = 1; i <= totalOpcoesEditFilho; i++) {
    const opcao = "opc" + i + "EditFilho";
    const campo = "opc" + i;
    console.log(opcao)
    const valor = document.getElementById(opcao).value;

    const filtro = {
      [campo]: valor,
      FiltroPai: filtroPai,
      OpcPai: opcPai
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

var totalOpcoesEditFilho = 0;
var numOpcaoEditFilho = totalOpcoesEditFilho + 1;

document.getElementById("nameEditFilho").addEventListener("change", function () {
  document.getElementById("div_filtropai_edit").style.display = "block"
  const optionsEditFilho = document.getElementById("optionsEditFilho");
  optionsEditFilho.innerHTML = "";

  const db = firebase.firestore();
  const collection = db.collection("FiltroFilho");

  const select = document.getElementById("nameEditFilho");
  const valorSelecionado = select.value;

  collection
    .doc(valorSelecionado)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const propriedades = Object.keys(data)
          .filter((prop) => prop.startsWith("opc"))
          .sort();

        propriedades.forEach((prop, index) => {
          const inputId = prop + "EditFilho";
          const inputValue = data[prop];

          const divElement = document.createElement("div");
          const idDiv = "div" + inputId;
          divElement.id = idDiv;
          optionsEditFilho.appendChild(divElement);

          const inputElement = document.createElement("input");
          inputElement.type = "text";
          inputElement.id = inputId;
          inputElement.value = inputValue;
          const addInDiv = document.getElementById(idDiv);
          addInDiv.appendChild(inputElement);

          const buttonElement = document.createElement("button");
          buttonElement.type = "button";
          buttonElement.id = "button" + inputId;
          buttonElement.className = "deletebutton";
          buttonElement.innerHTML = "Deletar";

          buttonElement.addEventListener("click", function (event) {
            const botaoClicado = event.target;
            const idBotao = botaoClicado.id;
            const substring = idBotao.substring(9);
            const posicaoInt = parseInt(substring);
            const apagar = document.getElementById("divopc" + posicaoInt + "EditFilho");
            apagar.remove();

            for (let i = posicaoInt + 1; i <= totalOpcoesEditFilho; i++) {
              const posAtual = i - 1;
              const alterarInput = document.getElementById("opc" + i + "EditFilho");
              const alterarDiv = document.getElementById("divopc" + i + "EditFilho");
              const alterarBotao = document.getElementById("buttonopc" + i + "EditFilho");

              alterarInput.id = "opc" + posAtual + "EditFilho";
              alterarDiv.id = "divopc" + posAtual + "EditFilho";
              alterarBotao.id = "buttonopc" + posAtual + "EditFilho";
            }

            totalOpcoesEditFilho--;
          });

          addInDiv.appendChild(buttonElement);
        });

        totalOpcoesEditFilho = propriedades.length;
      } else {
        console.log("Documento não encontrado.");
      }
    })
    .catch((error) => {
      console.log("Erro ao obter o documento:", error);
    });
});

function addOptionEditFilho() {
  totalOpcoesEditFilho++;
  const optionsEditFilho = document.getElementById("optionsEditFilho");

  const divElement = document.createElement("div");
  const idDiv = "divopc" + totalOpcoesEditFilho + "EditFilho";
  divElement.id = idDiv;
  optionsEditFilho.appendChild(divElement);

  const input = document.createElement("input");
  input.id = "opc" + totalOpcoesEditFilho + "EditFilho";
  input.type = "text";
  input.placeholder = "Insira o conteúdo da opção. Exemplo: Externo/Interno";
  const addInDiv = document.getElementById(idDiv);
  addInDiv.appendChild(input);

  const buttonElement = document.createElement("button");
  buttonElement.type = "button";
  buttonElement.id = "buttonopc" + totalOpcoesEditFilho + "EditFilho";
  buttonElement.className = "deletebutton";
  buttonElement.innerHTML = "Deletar";

  buttonElement.addEventListener("click", function (event) {
    const botaoClicado = event.target;
    const idBotao = botaoClicado.id;

    const substring = idBotao.substring(9);
    const posicaoInt = parseInt(substring);

    const apagar = document.getElementById("divopc" + posicaoInt + "EditFilho");
    apagar.remove();

    for (let i = posicaoInt + 1; i <= totalOpcoesEditFilho; i++) {
      const posAtual = i - 1;
      const alterarInput = document.getElementById("opc" + i + "EditFilho");
      const alterarDiv = document.getElementById("divopc" + i + "EditFilho");
      const alterarBotao = document.getElementById("buttonopc" + i + "EditFilho");

      alterarInput.id = "opc" + posAtual + "EditFilho";
      alterarDiv.id = "divopc" + posAtual + "EditFilho";
      alterarBotao.id = "buttonopc" + posAtual + "EditFilho";
    }

    totalOpcoesEditFilho--;
  });

  addInDiv.appendChild(buttonElement);
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
        const div = document.createElement("div");
        const id = doc.id.replaceAll(" ", "_");
        div.className = id;
        div.id = "div" + id;
        divResultado.appendChild(div);

        // Cria a label com o nome do documento
        const label = document.createElement("label");
        label.textContent = doc.id;
        div.appendChild(label);

        // Cria o select para as coleções
        const select = document.createElement("select");
        select.id = id
        select.className = "filtro-select-mecanismos-add"
        select.addEventListener("change", ativarFiltroFilho)
        div.appendChild(select);

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

  criarSelects()
}

function listarFiltrosFluxograma() {
  document.getElementById("editarFluxograma").style.display = "none";
  document.getElementById("addFluxograma").style.display = "block";
  const db = firebase.firestore();

  // Obtém o select com o ID "FiltroPrincipalAdd"
  const select = document.getElementById("FiltroPrincipalAdd");

  // Obtém o documento "Tipo de Industria" da coleção "filtros"
  db.collection("filtros")
    .doc("Tipo de Industria")
    .get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data();

        // Limpa as opções existentes
        select.innerHTML = "";

        // Adiciona a opção padrão
        const optionDefault = document.createElement("option");
        optionDefault.value = "Sem Filtro";
        optionDefault.textContent = "Sem Filtro";
        select.appendChild(optionDefault);

        // Itera sobre os valores no documento
        Object.values(data).forEach((value) => {
          // Cria o option com o valor
          const option = document.createElement("option");
          option.value = value;
          option.textContent = value;

          // Adiciona o option ao select
          select.appendChild(option);
        });
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });

  adicionarOptionsFluxogramaFilho();
}

function adicionarOptionsFluxogramaFilho() {
  const db = firebase.firestore();
  db.collection("FiltroFilho")
    .get()
    .then((querySnapshot) => {
      const divResultado = document.getElementById("FiltroFilhoAdd");
      const optionDefault = document.createElement("option");
      optionDefault.value = "Sem Filtro";
      optionDefault.textContent = "Sem Filtro";
      divResultado.appendChild(optionDefault);
      querySnapshot.forEach((doc) => {
        const docName = doc.id;
        if (docName.includes("Unidade de Processo")) {
          const opcPai = doc.data().OpcPai;
          const paiReplace = opcPai.replaceAll(" ", "_");
          // Obter os valores do documento
          const data = doc.data();

          Object.keys(data).forEach((key) => {
            if (key !== "FiltroPai" && key !== "OpcPai") {
              const option = document.createElement("option");
              option.value = data[key];
              option.textContent = data[key];
              option.classList.add(paiReplace,"optionfilho")
              option.style.display = "none"
              divResultado.appendChild(option);
            }
          });
        }
      });
    })
    .catch((error) => {
      console.error("Erro ao obter os dados:", error);
    });
}

function ativarFiltroFilhoFluxogramaAdd() {
  var select = document.getElementById("FiltroPrincipalAdd");
  var selectedValue = select.value
  if (typeof selectedValue === 'string' && selectedValue.includes(" ")) {
    var valor = selectedValue.replace(/ /g, "_");
  } else {
    valor = selectedValue;
  }

  // Ocultar todos os selects com a classe "filtro-select-mecanismos-add"
  var selects = document.querySelectorAll('.optionfilho');
  selects.forEach((select) => {
    select.style.display = "none";
  });

  // Exibir os options com a classe igual ao valor substituído
  var optionsToShow = document.getElementsByClassName(valor);
  for (var i = 0; i < optionsToShow.length; i++) {
    optionsToShow[i].style.display = "block";
  }
}

function listarFiltrosFluxogramaEdit() {
  document.getElementById("editarFluxograma").style.display = "block";
  document.getElementById("addFluxograma").style.display = "none";
  const db = firebase.firestore();

  const select = document.getElementById("FiltroPrincipalEdit");

  db.collection("filtros")
    .doc("Tipo de Industria")
    .get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data();

        select.innerHTML = "";
        const optionDefault = document.createElement("option");
        optionDefault.value = "Sem Filtro";
        optionDefault.textContent = "Sem Filtro";
        select.appendChild(optionDefault);

        Object.values(data).forEach((value) => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = value;
          select.appendChild(option);
        });
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });

  adicionarOptionsFluxogramaFilhoEdit();
}

function adicionarOptionsFluxogramaFilhoEdit() {
  const db = firebase.firestore();
  db.collection("FiltroFilho")
    .get()
    .then((querySnapshot) => {
      const divResultado = document.getElementById("FiltroFilhoEdit");
      const optionDefault = document.createElement("option");
      optionDefault.value = "Sem Filtro";
      optionDefault.textContent = "Sem Filtro";
      divResultado.appendChild(optionDefault);
      querySnapshot.forEach((doc) => {
        const docName = doc.id;
        if (docName.includes("Unidade de Processo")) {
          const opcPai = doc.data().OpcPai;
          const paiReplace = opcPai.replaceAll(" ", "_");
          const data = doc.data();

          Object.keys(data).forEach((key) => {
            if (key !== "FiltroPai" && key !== "OpcPai") {
              const option = document.createElement("option");
              option.value = data[key];
              option.textContent = data[key];
              option.classList.add(paiReplace, "optionfilho");
              option.style.display = "none";
              divResultado.appendChild(option);
            }
          });
        }
      });
      ativarFiltroFilhoFluxogramaEdit();
    })
    .catch((error) => {
      console.error("Erro ao obter os dados:", error);
    });
}

function ativarFiltroFilhoFluxogramaEdit() {
  var select = document.getElementById("FiltroPrincipalEdit");
  var selectedValue = select.value;
  if (typeof selectedValue === 'string' && selectedValue.includes(" ")) {
    var valor = selectedValue.replace(/ /g, "_");
  } else {
    valor = selectedValue;
  }

  var selects = document.querySelectorAll('.optionfilho');
  selects.forEach((select) => {
    select.style.display = "none";
  });

  var optionsToShow = document.getElementsByClassName(valor);
  for (var i = 0; i < optionsToShow.length; i++) {
    optionsToShow[i].style.display = "block";
  }
}




function adicionarMecanismo() {
  const nome = document.getElementById("input_nomeMecanismo_add").value;
  const IDMecanismo = document.getElementById("input_IDMecanismo_add").value;
  const db = firebase.firestore();

  const selects = document.querySelectorAll('.filtro-select-mecanismos-add');
  selects.forEach((select) => {
    const categoriaSelecionada = select.value;
    const id = select.id.replaceAll("_", " ");

    if (id && categoriaSelecionada && IDMecanismo) {
      const dados = {
        [id]: categoriaSelecionada,
        IDMecanismo: IDMecanismo
      };

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
    } else {
      console.error("Invalid data provided.");
    }
  });
}



function criarSelects() {
  const divReferencia = document.getElementById("lista_filtros");

  const db = firebase.firestore();
  db.collection("FiltroFilho")
    .get()
    .then((querySnapshot) => {
      const selects = [];

      querySnapshot.forEach((doc) => {
        const filtroPai = doc.data().FiltroPai;
        const opcPai = doc.data().OpcPai;
        const paiReplace = filtroPai.replaceAll(" ", "_")
        const divId = "div" + paiReplace;

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
        label.classList.add("ativarfiltrofilho", id)
        label.style.display = "none"; // Definir display none para o label

        // Cria o select
        const select = document.createElement("select");
        select.classList.add("ativarfiltrofilho", "elemento", id);
        const id_select = doc.id.replaceAll(" ", "_")
        select.id = id_select
        select.style.marginLeft = "10%"
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
  var selects = document.querySelectorAll("select.filtro-select-mecanismos-add");

  // Obter os valores selecionados de todos os selects
  var valoresSelecionados = Array.from(selects).map(function (select) {
    return select.value;
  });

  // Ocultar todos os selects com a classe "filtro-select-mecanismos-add"
  var selects = document.querySelectorAll('.ativarfiltrofilho');
  selects.forEach((select) => {
    select.style.display = "none";
    select.classList.remove("filtro-select-mecanismos-add");
  });

  // Mostrar apenas os selects correspondentes aos valores selecionados e com a classe "elemento"
  for (var i = 0; i < valoresSelecionados.length; i++) {
    var valorSelecionado = valoresSelecionados[i];
    if (typeof valorSelecionado === 'string' && valorSelecionado.includes(" ")) {
      var valor = valorSelecionado.replace(/ /g, "_");
    } else {
      valor = valorSelecionado;
    }

    var selectsCorrespondentes = document.getElementsByClassName(valor);
    for (var j = 0; j < selectsCorrespondentes.length; j++) {
      var selectCorrespondente = selectsCorrespondentes[j];
      selectCorrespondente.style.display = "block";

      // Adicionar a classe "filtro-select-mecanismos-add" apenas aos elementos <select> com a classe "elemento"
      if (selectCorrespondente.classList.contains("elemento")) {
        selectCorrespondente.classList.add("filtro-select-mecanismos-add");
      }
    }
  }
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

        const div = document.createElement("div");
        var id = doc.id.replaceAll(" ", "_");
        var divName = "divedit" + id
        div.className = divName
        div.id = divName
        divResultado.appendChild(div)
        // Cria a label com o nome do documento
        const label = document.createElement("label");
        label.textContent = doc.id;
        div.appendChild(label);

        // Cria o select para as coleções
        const select = document.createElement("select");
        select.addEventListener("change", ativarFiltroFilhoEditar)
        select.id = id;
        select.className = "filtro-selectEdit";
        div.appendChild(select);

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
  editarMecanismoFilhos();
}

function editarMecanismoFilhos() {
  const divReferencia = document.getElementById("filtros_editar");

  const db = firebase.firestore();
  db.collection("FiltroFilho")
    .get()
    .then((querySnapshot) => {
      const selects = [];

      querySnapshot.forEach((doc) => {
        const filtroPai = doc.data().FiltroPai;
        const opcPai = doc.data().OpcPai;
        const paiReplace = filtroPai.replaceAll(" ", "_")
        const divId = "divedit" + paiReplace;

        // Verifica se a div com o id já existe
        if (!document.getElementById(divId)) {
          // Cria a div com o id "div" + filtroPai
          const div = document.createElement("div");
          div.id = divId;
          divReferencia.appendChild(div);
        }

        const div2 = document.createElement("div");
        div2.className = "divFiltroFilhoEdit";

        const label = document.createElement("label");
        const id = opcPai.replaceAll(" ", "_");
        label.textContent = doc.id;
        label.classList.add("ativarfiltrofilhoedit", id)
        label.style.display = "none"; // Definir display none para o label

        // Cria o select
        const select = document.createElement("select");
        select.classList.add("ativarfiltrofilhoedit", "elemento", id);
        const id_select = doc.id.replaceAll(" ", "_")
        select.id = id_select
        select.style.marginLeft = "10%"
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

function ativarFiltroFilhoEditar() {
  var selects = document.querySelectorAll("select.filtro-selectEdit");

  // Obter os valores selecionados de todos os selects
  var valoresSelecionados = Array.from(selects).map(function (select) {
    return select.value;
  });

  // Ocultar todos os selects com a classe "filtro-select-mecanismos-add"
  var selects = document.querySelectorAll('.ativarfiltrofilhoedit');
  selects.forEach((select) => {
    select.style.display = "none";
    select.classList.remove("filtro-selectEdit");
  });

  // Mostrar apenas os selects correspondentes aos valores selecionados e com a classe "elemento"
  for (var i = 0; i < valoresSelecionados.length; i++) {
    var valorSelecionado = valoresSelecionados[i];
    if (typeof valorSelecionado === 'string' && valorSelecionado.includes(" ")) {
      var valor = valorSelecionado.replace(/ /g, "_");
    } else {
      valor = valorSelecionado;
    }

    var selectsCorrespondentes = document.getElementsByClassName(valor);
    for (var j = 0; j < selectsCorrespondentes.length; j++) {
      var selectCorrespondente = selectsCorrespondentes[j];
      selectCorrespondente.style.display = "block";

      // Adicionar a classe "filtro-select-mecanismos-add" apenas aos elementos <select> com a classe "elemento"
      if (selectCorrespondente.classList.contains("elemento")) {
        selectCorrespondente.classList.add("filtro-selectEdit");
      }
    }
  }
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
    const id = select.id.replaceAll("_", " ")


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
    const id = select.id.replaceAll("_", " ")

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
  listarFiltrosFluxogramaEdit();
}


document.getElementById("select_nomeFluxograma_edit").addEventListener("change", function () {
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
    const id = select.id.replaceAll("_", " ")

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

function mostrarModalAdicionarFiltroFilho() {
  var modalAdicionarFiltro = document.querySelector("#div_addfiltroFilho");
  modalAdicionarFiltro.style.display = "block";

  var modalEditarFiltros = document.querySelector("#div_editarfiltroFilho");
  modalEditarFiltros.style.display = "none";

  var db = firebase.firestore()
  var selectElement2 = document.getElementById("selecionarFiltroPai");
  selectElement2.innerHTML = "";
  var optionElement2 = document.createElement("option");
  optionElement2.value = "Lista de Filtros Principais";
  optionElement2.textContent = "Lista de Filtros Principais";
  optionElement2.selected = true;
  optionElement2.disabled = true;
  selectElement2.appendChild(optionElement2);

  db.collection("filtros")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var nomeDocumento2 = doc.id;
        var optionElement3 = document.createElement("option");
        optionElement3.value = nomeDocumento2;
        optionElement3.textContent = nomeDocumento2;
        selectElement2.appendChild(optionElement3);
      });
    })
    .catch(function (error) {
      console.log("Erro ao buscar os valores:", error);
    });
}

// Função para mostrar o modal de editar filtros
function mostrarModalEditarFiltrosFilho() {
  var modalAdicionarFiltro = document.querySelector("#div_addfiltroFilho");
  modalAdicionarFiltro.style.display = "none";

  var modalEditarFiltros = document.querySelector("#div_editarfiltroFilho");
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

function openModalFilho() {
  var modal = document.getElementById("myModalFilho");
  modal.style.display = "block";
}

function closeModalFilho() {
  var modal = document.getElementById("myModalFilho");
  modal.style.display = "none";
}

function confirmDeleteFilho() {
  // Lógica para excluir o item aqui
  deletarFiltroFilho();
  closeModalFilho();
}

function openModalMecanismo() {
  var modal = document.getElementById("myModalMecanismo");
  modal.style.display = "block";
}

function closeModalMecanismo() {
  var modal = document.getElementById("myModalMecanismo");
  modal.style.display = "none";
}

function confirmDeleteMecanismo() {
  // Lógica para excluir o item aqui
  deletarMecanismo();
  closeModalMecanismo();
}

function openModalFluxograma() {
  var modal = document.getElementById("myModalFluxograma");
  modal.style.display = "block";
}

function closeModalFluxograma() {
  var modal = document.getElementById("myModalFluxograma");
  modal.style.display = "none";
}

function confirmDeleteFluxograma() {
  // Lógica para excluir o item aqui
  deletarFluxograma();
  closeModalFluxograma();
}