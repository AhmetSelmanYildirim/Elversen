const router = require("express").Router();
const mainController = require("../controllers/mainController")

router.post('/login', mainController.login);

router.get('/ips', mainController.sendIPs);

module.exports = router;