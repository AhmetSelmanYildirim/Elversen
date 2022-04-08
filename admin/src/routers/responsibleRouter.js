const router = require("express").Router();
const responsibleController = require("../controllers/responsibleController");
const authMiddleware = require("../middlewares/auth_middleware")


router.put('/activateResponsible', authMiddleware.loggedIn, responsibleController.activateResponsible);
router.put('/deactivateResponsible', authMiddleware.loggedIn, responsibleController.deactivateResponsible);

module.exports = router;