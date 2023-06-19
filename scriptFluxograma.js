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
    listarFiltrosFluxograma()
    getNumberOfItems()
}

let listarFiltrosFluxogramaExecuted = 0;

function listarFiltrosFluxograma() {
    if (listarFiltrosFluxogramaExecuted < 1) {
        const db = firebase.firestore();
        const select = document.getElementById("FiltroPrincipal");

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

                    adicionarOptionsFluxogramaFilho();
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });

        listarFiltrosFluxogramaExecuted = 1;
    }
}

function adicionarOptionsFluxogramaFilho() {
    const db = firebase.firestore();
    db.collection("FiltroFilho")
        .get()
        .then((querySnapshot) => {
            const divResultado = document.getElementById("FiltroFilho");
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
                            option.classList.add(paiReplace, "optionfilho")
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

function ativarFiltroFilhoFluxograma() {
    var select = document.getElementById("FiltroPrincipal");
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

function getNumberOfItems() {
    const db = firebase.firestore();
    const fluxogramasRef = db.collection("fluxograma");

    fluxogramasRef
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
            optionDefault.textContent = "Selecione um Desenho";
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
        db.collection("fluxograma")
            .doc(selectedValue)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    if (data.IDFluxograma) {
                        botao.setAttribute("href", data.IDFluxograma);
                    } else {
                        console.log("Campo 'IDFluxograma' não encontrado no documento");
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