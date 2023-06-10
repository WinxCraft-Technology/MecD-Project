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

    atualizarLista();

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
            document.getElementById("iten").innerHTML = filtroFinal[0];

            const selectElement = document.getElementById('lista'); // Obtém a referência do elemento <select> pelo id

            selectElement.addEventListener('change', function () {
                const selectedValue = this.value; // Obtém o valor selecionado

                document.getElementById("iten").innerHTML = selectedValue; // Exibe o valor selecionado no html

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
    option.innerText = "Selecione um Fluxograma";
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