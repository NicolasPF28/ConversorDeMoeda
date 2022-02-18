const botaoConverter = document.querySelector ('#botaoConverter');

//dolar - real
function converterEuro_real (real, euro, endereco){
    const calcularConversao = endereco.EURBRL.ask * euro.value.replace (',','.');
    const preencherReal = real.value = calcularConversao.toLocaleString ('pt-BR', {style: 'currency', currency: 'BRL'});
   
    const euroNumber = Number (euro.value.replace (',','.'));
    const formatarEuro = euro.value = euroNumber.toLocaleString ('pt-BR', {style: 'currency', currency: 'EUR'});

    console.log ('');
    console.log (`[SUCESSO] : euro convertido para real : ${formatarEuro} para ${real.value}`);
}

//real - dolar
function converterReal_euro (real, euro, endereco){

    const calcularConversao = real.value.replace (',','.') / endereco.EURBRL.ask;
    const preencherEuro = euro.value = calcularConversao.toLocaleString ('pt-BR', {style: 'currency', currency: 'EUR'});

    const realNumber = Number (real.value.replace (',','.'));
    const formatarReal = real.value = realNumber.toLocaleString ('pt-BR', {style: 'currency', currency: 'BRL'});

    console.log ('');
    console.log (`[SUCESSO] : real convertido para euro : ${formatarReal} para ${preencherEuro}`);
}

const logicaEuro_real  = async () => {

    const euro = document.querySelector ('#euro');
    const real = document.querySelector ('#real');

    //API do dolar
    const url = `https://economia.awesomeapi.com.br/last/EUR-BRL`;
    const dados = await fetch (url);
    const endereco = await dados.json ();

    function limparInputs (){
        euro.value = '';
        real.value = '';
    }
    
    function blur (valor1, valor2){
        valor1.blur ();
        valor2.blur ();
    }

    if (/^[0-9-,-.]+$/.test (real.value) || /^[0-9-,-.]+$/.test (euro.value)){
        if (euro.value.length > 0){
            converterEuro_real (real, euro, endereco);
        }
        else if (real.value.length > 0){
            converterReal_euro (real, euro, endereco);
        }
        else{
            alert ('Testado');
        }
        
    }
    else{
        limparInputs ();
        alert ('Preencha os campos abaixo com números!');
        console.error ('[ERRO] : preenchimento incorreto');   
    }

    real.addEventListener ('focus', limparInputs);
    euro.addEventListener ('focus', limparInputs);

    blur (real, euro);

    console.log (endereco);
}

document.addEventListener ('keyup', keyup);

function keyup (event){
    switch (event.keyCode) {
        case 13:
            logicaEuro_real ();
            break;
    }
}

botaoConverter.addEventListener ('click', logicaEuro_real);