const router = require('express').Router()

const userController = require("../controllers/userController")

router.post('/user', userController.createUser);
router.get('/user',userController.getAllUsers);
router.put('/user',userController.updateUser);
router.delete('/user/:cpf', userController.deleteUser);

const organizadorController = require("../controllers/OrganizadorControllers")

router.post('/organizador', organizadorController.createOrganizador);
router.get('/organizador', organizadorController.getAllUOrganizador);
router.put('/organizador', organizadorController.updateOrganizador);
router.delete('/organizador/:id', organizadorController.deleteOrganizador);

module.exports = router
