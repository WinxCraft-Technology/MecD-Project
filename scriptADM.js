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

// Obtenha uma referência ao serviço do Firebase Storage


// Adicione um manipulador de evento para o envio do formulário
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  var storage = firebase.storage();
  
  // Obtenha o arquivo que o usuário selecionou
  var file = document.getElementById('file-input').files[0];
  
  // Crie uma referência ao arquivo no Firebase Storage
  var nome = document.getElementById("nome-mecanismo").value
  var storageRef = storage.ref().child('assets/PDFs/'+nome+'.pdf');
  
  // Carregue o arquivo no Firebase Storage
  var uploadTask = storageRef.put(file);
  
  // Escute o evento de progresso de upload
  uploadTask.on('state_changed', function(snapshot) {
    // Monitorar o progresso do upload...
  }, function(error) {
    console.error(error);
  }, function() {
    // Quando o upload estiver concluído, obtenha a URL de download do arquivo
    storageRef.getDownloadURL().then(function(url) {      
      console.log('Arquivo enviado com sucesso!');
    }).catch(function(error) {
      console.error(error);
    });
  });
});
