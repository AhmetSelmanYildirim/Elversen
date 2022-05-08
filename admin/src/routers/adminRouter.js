const router = require("express").Router();
const adminController = require("../controllers/adminController")
const validatorMiddleware = require("../middlewares/validator_middleware")
const authMiddleware = require("../middlewares/auth_middleware")

router.get("/create-admin", authMiddleware.loggedIn, authMiddleware.isSuperAdmin, adminController.showCreateAdminPage);

router.post('/create-admin', authMiddleware.loggedIn, authMiddleware.isSuperAdmin, adminController.createAdmin);
router.post('/update-admin', authMiddleware.loggedIn, authMiddleware.isSuperAdmin, adminController.updateAdmin);
router.post('/delete-admin', authMiddleware.loggedIn, authMiddleware.isSuperAdmin, adminController.deleteAdmin);

module.exports = router;

