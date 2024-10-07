// Acessa o objeto "document" que representa a páginal html

//seleciona o elemento com o id indicado do formulario
document
    .getElementById("formulario-registro")
    .addEventListener("submit", function(event){ //adicona o ouvinte de evento (submit) para capturar o envio do formulário
// previne o comportamento padrão fo formulário, ou seja, impede que ele seja enviado e recarregue a página
    event.preventDefault();

    //captura os valores dos campos do formulário
    const name = document.getElementById("nome");
    const cpf = document.getElementById("cpf");
    const email = document.getElementById("email");
    const password = document.getElementById("senha");

    //requisição HTTp para o enpoint de cadastro de usuário
    fetch("http://localhost:5000/api/v1/user",{
        //realiza uma chamada http para o servidor (a rota definida)
        method: "POST",
        headers:{
            "Content-Type":application/json
        },
        //transforma os dados do formulário em uma string json para serem enviados no corpo requisição
        body: JSON.stringify({name, cpf, password, email}),  
    });
});