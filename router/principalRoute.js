const express = require("express");
const router = express.Router();
const principalController = require("../controllers/principalController"); 

//principal
router.get('/', principalController.principal);

//users
router.get('/perfil', principalController.abrirprefil);

router.get('/favoritos', principalController.favoritos); 

router.get('/meuspedidos', principalController.meuspedidos);

//adm
router.get('/principaladm', principalController.principaladm);

router.get('/criarcardapio', principalController.createcardapio);

router.get('/pedidos', principalController.pedidos);

router.get('/perfiladm', principalController.perfiladm);

router.get('/login', principalController.login);

router.get('/cadastro', principalController.cadastro);



module.exports = router;