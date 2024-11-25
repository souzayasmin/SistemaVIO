document
  .getElementById("form-selecao-data")
  .addEventListener("submit", testeCalendario);

function testeCalendario(event) {
  // previne o compartamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
  event.preventDefault();

  const data_recebida = document.getElementById("data").value;

  if (data_recebida) {
    //console.log("Data recebida:", data_recebida);
    alert("A data selecioanada é: " + data_recebida);
  } else {
    alert("Por favor, selecione uma data!");
  }
}
