var inputAgeElement = document.querySelector('body #app input');
var buttonAgeElement = document.querySelector('body #app button');


buttonAgeElement.onclick = function(){
    checaIdade(inputAgeElement.value)
        .then(function() {
            console.log("Maior que 18");
        })
        .catch(function() {
            console.warn("Menor que 18");
        });
}
    

var checaIdade = function(idade) {
    return new Promise(function(resolve, reject) {
        if(idade >= 18){
            resolve('Ok');
        } else {
            reject('Erro');
        }
    });
}

    