const router = require("express").Router();
const responsibleController = require("../controllers/responsibleController");

router.get('/getResponsibles', responsibleController.getResponsibles);
router.get('/getResponsibleById', responsibleController.getResponsibleById);
router.put('/activateResponsible', responsibleController.activateResponsible);
router.put('/deactivateResponsible', responsibleController.deactivateResponsible);

module.exports = router;