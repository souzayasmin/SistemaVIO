let Organizador = [];
let nextId = 1;

module.exports = class OrganizadorController {
  static async createOrganizador(req, res) {
    const { name, email, password, telefone } = req.body;

    if (!name || !email || !password || !telefone) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (isNaN(telefone) || telefone.length !== 11) {
      return res.status(400).json({
        error: "Telefone inválido. Deve conter exatamente 11 dígitos numéricos",
      });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    }

    // Verifica se já existe um usuário com o mesmo email
    const existingOrganizador = Organizador.find((Org) => Org.email === email);
    if (existingOrganizador) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Cria e adiciona novo organizador
    const newOrganizador = { id: nextId++, name, email, password, telefone };
    Organizador.push(newOrganizador);

    return res
      .status(201)
      .json({message: "Organizador criado com sucesso",user: newOrganizador});
  }

  static async getAllUOrganizador(_req, res) {
    return res
      .status(200)
      .json({ message: "Obtendo todos os usuários", Organizador });
  }

  static async updateOrganizador(req, res) {
    // desestrutura e rucupera os dados enviados via corpo da requisição
    const { id, name, email, password, telefone } = req.body;

    // validar se todos os campos foram preenchidos
    if (!name || !email || !password || !telefone) {
      return res
        .status(400)
        .json({ error: "Todos  os campos devem ser preenchidos" });
    }
    //procurar o índice do usuário do array 'users' pelo email
    const OrganizadorIndex = Organizador.findIndex((Org) => Org.id === id);

    // se o usuário não for encontrado userIndex equivale a -1
    if (OrganizadorIndex === -1) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    //atualiza os dados do usuario do array 'users'
    Organizador[OrganizadorIndex] = { id, name, email, password, telefone };
    return res
      .status(200)
      .json({
        message: "Usuário atualizado",
        Organizador: Organizador[OrganizadorIndex],});
  }

  static async deleteOrganizador(req, res) {
    const OrganizadorId = req.params.id;
    const OrganizadorIndex = Organizador.findIndex((Org) => Org.id == OrganizadorId);
    if (OrganizadorIndex == -1) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
    Organizador.splice(OrganizadorIndex, 1);

    return res.status(200).json({ message: "Usuário Apagado" });
  }
};
