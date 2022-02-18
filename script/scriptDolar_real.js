const botaoConverter = document.querySelector ('#botaoConverter');

//dolar - real
function converterDolar_real (real, dolar, endereco){
    const calcularConversao = endereco.USDBRL.ask * dolar.value.replace (',','.');
    const preencherReal = real.value = calcularConversao.toLocaleString ('pt-BR', {style: 'currency', currency: 'BRL'});
 
    const dolarNumber = Number (dolar.value.replace (',','.'));
    const formatarDolar = dolar.value = dolarNumber.toLocaleString ('pt-BR', {style: 'currency', currency: 'USD'});

    console.log ('');
    console.log (`[SUCESSO] : dolar convertido para real : ${formatarDolar} para ${real.value}`);
}

//real - dolar
function converterReal_dolar (real, dolar, endereco){

    const calcularConversao = real.value.replace (',','.') / endereco.USDBRL.ask;
    const preencherDolar = dolar.value = calcularConversao.toLocaleString ('pt-BR', {style: 'currency', currency: 'USD'});

    const realNumber = Number (real.value.replace (',','.'));
    const formatarReal = real.value = realNumber.toLocaleString ('pt-BR', {style: 'currency', currency: 'BRL'});

    console.log ('');
    console.log (`[SUCESSO] : real convertido para dolar : ${formatarReal} para ${preencherDolar}`);
}

const logicaDolar_real  = async () => {

    const dolar = document.querySelector ('#dolar');
    const real = document.querySelector ('#real');

    //API do dolar
    const url = `https://economia.awesomeapi.com.br/last/USD-BRL`;
    const dados = await fetch (url);
    const endereco = await dados.json ();

    function limparInputs (){
        dolar.value = '';
        real.value = '';
    }
    
    function blur (valor1, valor2){
        valor1.blur ();
        valor2.blur ();
    }

    if (/^[0-9-,-.]+$/.test (real.value) || /^[0-9-,-.]+$/.test (dolar.value)){
        if (dolar.value.length > 0){
            converterDolar_real (real, dolar, endereco);
        }
        else if (real.value.length > 0){
            converterReal_dolar (real, dolar, endereco);
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
    dolar.addEventListener ('focus', limparInputs);

    blur (real, dolar);

    console.log (endereco);
}

document.addEventListener ('keyup', keyup);

function keyup (event){
    switch (event.keyCode) {
        case 13:
            logicaDolar_real ();
            break;
    }
}

botaoConverter.addEventListener ('click', logicaDolar_real);