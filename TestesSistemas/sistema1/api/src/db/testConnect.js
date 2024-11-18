const connect = require("./connect");

module.exports = function testConnect() {
  try {
    const query = `SElECT 'Conexão bem sucedida' AS Mensagem`;
    connect.query(query, function (err) {
      if (err) {
        console.log("Conexão não realizada", err);
        return;
      }
      console.log("Conexão realizada com Mysql");
    });
  } catch(error) {
    console.log("Erro ao executar a consulta:", error);
  }
};
