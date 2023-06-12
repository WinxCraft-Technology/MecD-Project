// Função que inicializa o banco de dados quando a página carrega
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('18(12(p,a,c,k,e,d){e=12(c){13(c<a?\'\':e(1o(c/a)))+((c=c%a)>1g?15.1h(c+1m):c.1d(19))};16(!\'\'.17(/^/,15)){14(c--){d[e(c)]=k[c]||e(c)}k=[12(e){13 d[e]}];e=12(){13\'\\\\w+\'};c=1};14(c--){16(k[c]){p=p.17(1a 1b(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c])}}13 p}(\'C(q(p,a,c,k,e,d){e=q(c){r c.s(Q)};x(!\\\'\\\'.v(/^/,D)){t(c--){d[c.s(a)]=k[c]||c.s(a)}k=[q(e){r d[e]}];e=q(){r\\\'\\\\\\\\w+\\\'};c=1};t(c--){x(k[c]){p=p.v(H I(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c])}}r p}(\\\'p 6(){7 4={8:"9",a:"2-0.b.3",c:"2-0",d:"2-0.f.3",g:"5",h:"1:5:i:j",k:"l-m"};n.o(4);e()}\\\',u,u,\\\'B||A|z|y|K|J|E|L|T|11|10|Z|Y|X|W|V|M|U|S|R|G|P|O|N|q\\\'.F(\\\'|\\\'),0,{}))\',1f,1e,\'||||||||||||||||||||||||||12|13|1d|14|1n|17||16|1i|1j|1k|1l|18|15|1p|1c||1a|1b|1s|1B|1A|1G|1F|1E|1D|19|1C|1H|1z|1q|1x|1w|1v|1y|1u|1t|1r\'.1c(\'|\'),0,{}))',62,106,'||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||function|return|while|String|if|replace|eval|36|new|RegExp|split|toString|64|62|35|fromCharCode|firebaseConfig|com|mecd|project|29|26|parseInt|const|web|authDomain|iniciarBanco|firebaseapp|projectId|atualizarLista|appspot|messagingSenderId|storageBucket|AIzaSyBl_9KalJEsPjByiO7MC_pHkvqHR8xyhuY|apiKey|210905329240|measurementId|RPBV1LXF0P|firebase|initializeApp|appId|ae1579ea9fb2ad218ce42d'.split('|'),0,{}))

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
    const fluxogramasRef = db.collection("fluxograma");

    let filtroFinal = [];

    if (filtrosSelecionados.length > 0) {
        let query = fluxogramasRef;

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

                db.collection("fluxograma")
                    .doc(selectedValue)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            const IDFluxograma = doc.data().IDFluxograma;

                            botao.setAttribute('href', IDFluxograma);

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
    option.innerText = "Selecione um Desenho";
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
document.getElementById("FiltroPrincipal").addEventListener("change", atualizarFiltrosFilho)