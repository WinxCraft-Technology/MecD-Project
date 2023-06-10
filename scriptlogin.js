// Insira suas informações de configuração do Firebase

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('18(12(p,a,c,k,e,d){e=12(c){11(c<a?\'\':e(1n(c/a)))+((c=c%a)>1f?16.1g(c+1l):c.1c(19))};14(!\'\'.15(/^/,16)){13(c--){d[e(c)]=k[c]||e(c)}k=[12(e){11 d[e]}];e=12(){11\'\\\\w+\'};c=1};13(c--){14(k[c]){p=p.15(1a 17(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c])}}11 p}(\'C(q(p,a,c,k,e,d){e=q(c){r c.s(O)};x(!\\\'\\\'.v(/^/,D)){t(c--){d[c.s(a)]=k[c]||c.s(a)}k=[q(e){r d[e]}];e=q(){r\\\'\\\\\\\\w+\\\'};c=1};t(c--){x(k[c]){p=p.v(H I(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c])}}r p}(\\\'o 8(){9 3={a:"b",c:"0-2.d.5",e:"0-2",7:"0-2.i.5",k:"4",l:"1:4:n:g",6:"m-h"};f.j(3)}\\\',u,u,\\\'B||A|z|y|K|J|E|L|S|10|Z|Y|X|W|V|U|M|T|R|Q|P|G|N|q\\\'.F(\\\'|\\\'),0,{}))\',1e,1d,\'||||||||||||||||||||||||||12|11|1c|13|1m|15||14|1h|1i|1j|1k|18|16|1o|1b||1a|17|1r|1A|1z|1E|1D|19|1C|1B|1F|1y|1p|1w|1v|1u|1x|1t|1s|1q\'.1b(\'|\'),0,{}))',62,104,'|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||return|function|while|if|replace|String|RegExp|eval|36|new|split|toString|63|62|35|fromCharCode|210905329240|firebaseConfig|project|mecd|29|25|parseInt|storageBucket|appspot|apiKey|measurementId|AIzaSyBl_9KalJEsPjByiO7MC_pHkvqHR8xyhuY|authDomain|projectId|firebase|ae1579ea9fb2ad218ce42d|firebaseapp|var|iniciarBanco|com|messagingSenderId|appId|web|RPBV1LXF0P|initializeApp'.split('|'),0,{}))

// Função de login com e-mail e senha
function login() {
  var email = document.getElementById("login__username").value;
  var password = document.getElementById("login__password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (result) {
      // O usuário fez o login com sucesso
      var user = result.user;
      window.location.href = "adm.html";
    })
    .catch(function (error) {
      // Ocorreu um erro durante o login
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("E-mail e/ou senha incorreta");
    });
}