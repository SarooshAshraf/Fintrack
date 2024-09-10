const express = require("express");
const router = express.Router();
const promoCodeController = require("../controllers/promoCodeController");

router.get("/promocodes", promoCodeController.getAllPromoCodes);
router.post("/promocodes/create", promoCodeController.createPromoCode);
router.put("/promocodes/update/:id", promoCodeController.updatePromoCode);
router.delete("/promocodes/delete/:id", promoCodeController.deletePromoCode);

module.exports = router;
