/*

path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar_campos');
const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], crearUsuario);

// post: /
// validar email, password

router.post('/', [
    check('email', 'Introduce un email').isEmail(),
    check('password', 'Introduce la contraseña').not().isEmpty(),
    validarCampos
], login);

//validarJWT
router.get('/renew', validarJWT, renewToken);



module.exports = router;