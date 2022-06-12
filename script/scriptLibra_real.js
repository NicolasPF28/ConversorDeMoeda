const botaoConverter = document.querySelector ('#botaoConverter');

//libra - real
function converterLibra_real (real, libra, endereco){
    const calcularConversao = endereco.GBPBRL.ask * libra.value.replace (',','.');
    const preencherReal = real.value = calcularConversao.toLocaleString ('pt-BR', {style: 'currency', currency: 'BRL'});

    const libraNumber = Number (libra.value.replace (',','.'));
    const formatarLibra = libra.value = libraNumber.toLocaleString ('pt-BR', {style: 'currency', currency: 'GBP'});

    console.log ('');
    console.log (`[SUCESSO] : libra esterlina convertido para real : ${formatarLibra} para ${real.value}`);
}

//real - libra
function converterReal_libra (real, libra, endereco){

    const calcularConversao = real.value.replace (',','.') / endereco.GBPBRL.ask;
    const preencherLibra = libra.value = calcularConversao.toLocaleString ('pt-BR', {style: 'currency', currency: 'GBP'});

    const realNumber = Number (real.value.replace (',','.'));
    const formatarReal = real.value = realNumber.toLocaleString ('pt-BR', {style: 'currency', currency: 'BRL'});

    console.log ('');
    console.log (`[SUCESSO] : real convertido para libra esterlina : ${formatarReal} para ${preencherLibra}`);
}
 
const logicaLibra_real  = async () => {
 
    const libra = document.querySelector ('#libra');
    const real = document.querySelector ('#real');

    //API da libra esterlina
    const url = `https://economia.awesomeapi.com.br/last/GBP-BRL`;
    const dados = await fetch (url);
    const endereco = await dados.json ();

    function limparInputs (){
        libra.value = '';
        real.value = '';
    }
    
    function blur (valor1, valor2){
        valor1.blur ();
        valor2.blur ();
    }

    if (/^[0-9-,-.]+$/.test (real.value) || /^[0-9-,-.]+$/.test (libra.value)){
        if (libra.value.length > 0){
            converterLibra_real (real, libra, endereco);
        }
        else if (real.value.length > 0){
            converterReal_libra (real, libra, endereco);
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
    libra.addEventListener ('focus', limparInputs);

    blur (real, libra);

    console.log (endereco);
}

document.addEventListener ('keyup', keyup);

function keyup (event){
    switch (event.keyCode) {
        case 13:
            logicaLibra_real ();
            break;
    }
}

botaoConverter.addEventListener ('click', logicaLibra_real);