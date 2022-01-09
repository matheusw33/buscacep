const botao = document.querySelector('[data-botao]');
const botaoFechar = document.querySelector('[data-botao-fechar]');
const resultado = document.querySelector('[data-resultado]');
const caixaprincipal = document.querySelector('[data-caixa-menor]');
const lista = document.querySelector('[data-lista]');
const inputCep = document.querySelector('[data-cep]');

const mostraResultado = () =>{
    resultado.classList.add('container_caixa-visivel');        
    caixaprincipal.classList.add('caixa-menor');
}

const removerResultado = () => {
    resultado.classList.remove('container_caixa-visivel');
    caixaprincipal.classList.remove('caixa-menor');
    inputCep.value = '';
}

const pesquisarCep = (event) =>  {    
    const cep = inputCep.value;
    if(cep.length !== 8){
        alert('Cep Inválido!');
        return
    };    
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(url, options).then(response=>{ response.json().then(data => mostraEndereco(data)) })       

    const mostraEndereco = (dados) =>{

        if(dados.erro){

            lista.innerHTML = `<li class="container_item">Ops, cep não encontrado</li>`

        }else{

            lista.innerHTML = `<li class="container_item">CEP: ${dados.cep}</li>
                           <li class="container_item">Rua: ${dados.logradouro}</li>
                           <li class="container_item">Bairro: ${dados.bairro}</span></li>
                           <li class="container_item">Cidade: ${dados.localidade}</li>
                           <li class="container_item">Estado: ${dados.uf}</li>`
        }
        
        
    };
        
    mostraResultado();
        
    event.preventDefault();  
}

botao.addEventListener('click', pesquisarCep);
botaoFechar.addEventListener('click', removerResultado);
