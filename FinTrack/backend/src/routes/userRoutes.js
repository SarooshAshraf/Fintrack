// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getAllUsers);
router.post("/users/signup", userController.createUser);
router.post("/users/login", userController.loginUser);
router.put("/users/update/:id", userController.updateUser);
router.post("/users/logout", userController.logoutUser);
router.post("/users/verify", userController.verifyUser);



module.exports = router;
