const connect = require("../db/connect");

module.exports = class userController {
  static async createUser(req, res) {
    const { cpf, email, password, name } = req.body;

    if (!cpf || !email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } // else if
    else if (isNaN(cpf) || cpf.length !== 11) {
      return res.status(400).json({
        error: "CPF inválido. Deve conter exatamente 11 dígitos numéricos",
      });
    } // else if
    else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    } // else if
    else {

      // Construção da query INSERT

      const query = `INSERT INTO usuario (cpf,password,email,name) VALUES(
      '${cpf}',
      '${password}',
      '${email}',
      '${name}')`;

      // Executando a query criada

      try {
        connect.query(query, function (err) {
          if (err) {
            console.log(err);
            console.log(err.code);
            if (err.code === "ER_DUP_ENTRY") {
              return res
                .status(400)
                .json({ error: "O email já está vinculado a outro usuário" });
            } // if
            else {
              return res
                .status(500)
                .json({ error: "Erro Interno do Servidor" });
            } // else
          } // if
          else {
            return res
              .status(201)
              .json({ message: "Usuário Criado com Sucesso" });
          } // else
        }); // connect
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro Interno de Servidor" });
      } // catch
    } // else
  } // CreateUser

  static async getAllUsers(req, res) {
    const query = `SELECT * FROM usuario`;

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        return res
          .status(200)
          .json({ message: "Lista de usuários", users: results })
      });
    }
    catch (error) {
      console.error("Erro ao executar consulta", error);
      return res.status(404).json({ error: "Erro interno no servidor" });
    }
  }

  static async updateUser(req, res) {
    const {id,cpf, email, password, name } = req.body;
    if (!cpf || !email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    const query = `UPDATE usuario SET cpf=?, email=?, password=?, name=? WHERE id_usuario = ?`;
    const values = [cpf, email, password, name, id];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          if (err.code === "ER_DUP ENTRY") {
            return res
              .status(400)
              .json({ error: "Email já está cadastrado por outro usuário" });
          } else {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Erro interno do servidor" });
          }
        }
        if (results.affectedRows === 0) {
          return res
            .status(404)
            .json({ error: "Usuário não encontrado" });
        }
        return res
          .status(200)
          .json({ message: "Usuário atualizado com sucesso" });
      });
    }
    catch (error) {
      console.error("Erro ao executar consulta", error);
      return res
        .status(500)
        .json({ error: "Erro interno no servidor" });
    }
  }

  static async deleteUser(req, res) {
    const usuarioId = req.params.id_usuario;
    const query = `DELETE FROM usuario WHERE id_usuario = ?`;
    const values = [usuarioId]

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }
        return res.status(200).json({ message: "Usuário excluído com sucesso" });
      });
    }
    catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro interno do servidor" });
    }
  }
};
