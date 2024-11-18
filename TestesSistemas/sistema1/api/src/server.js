//Importa a instância do Express configurada em index.js
const app = require("./index");
const cors = require('cors');

//configuração do CORS com origens permitidas
const corsOption = {
    origin: '*', // substitua pela origin permitida
    methods: 'GET,HEAD, PUT,PACHT,POST,DELETE',
    credentials: true, //permite o uso de cookies e credenciais 
    optionsSucessStatus: 204, //define o staus de resposta para o método OPTIONS 
};

//Aplicando o middler CORS no app
app.use(cors(corsOption));
app.listen(5000);//Inicia o servidor na porta 5000, tornando a API acessível em http://localhost:5000
