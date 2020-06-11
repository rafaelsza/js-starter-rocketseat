var inputGitElement = document.querySelector('#github input[name=user]');
var buttonGitElement = document.querySelector('#github button');
var divList = document.querySelector('#github');
var listRepos = document.querySelector('#github ul');

/* buttonGitElement.onclick = function(){
    var userInput = inputGitElement.value;
    
    axios.get('https://api.github.com/users/'+userInput+'/repos')
        .then(function(response) {
            addRepos(response.data);
        })
        .catch(function(error) {
            console.warn(error);
        });
} */

var gitPromise = function() {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://api.github.com/users/'+inputGitElement.value+'/repos');
        xhr.send(null);

        listRepos.innerHTML = '';
        var item = document.createElement('li');
        var textItem = document.createTextNode('Carregando..');
        item.appendChild(textItem);
        listRepos.appendChild(item);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.responseText));
                } else if(xhr.status === 404){
                    reject('Usuário inexistente!');
                }
            }
        }
    });
}

buttonGitElement.onclick = function(){
    gitPromise()
        .then(function(response) {
            console.log(response);
            addRepos(response);
        })
        .catch(function(error) {
            console.warn(error);

            listRepos.innerHTML = '';
            var item = document.createElement('label');
            var textItem = document.createTextNode('Usuário inexistente!');
            item.appendChild(textItem);
            listRepos.appendChild(item);
        });
}

function addRepos(repositorios){
    listRepos.innerHTML = '';

    for(repo of repositorios){
        var item = document.createElement('li');
        var textItem = document.createTextNode(repo.name);
        item.appendChild(textItem);

        listRepos.appendChild(item);
    }

    divList.appendChild(listRepos);
}