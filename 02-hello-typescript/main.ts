var minhaVar = 'minha variavel';

function minhaFunc(x, y) {
    return x + y;
}

// ES6 OR ES 2015
let num = 2;
const PI = 3.14;

var numeros = [1, 2, 3];
numeros.map(function(valor) {
    return valor * 2;
});

numeros.map(valor => valor * 2);

var Matematica2 = function() {

    function Matematica() {

    }

    Matematica.prototype.soma = function(x, y){
        return x + y;
    }

    return Matematica;
}

class Matematica {
    soma(x, y) {
        return x + y;
    }
}

var n1: any = 'teste';
n1 = 4;