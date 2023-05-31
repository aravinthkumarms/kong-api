const express = require("express");
const {
  getServiceById,
  getAllService,
  createService,
  deleteServiceById,
  patchService,
} = require("./../controller/index");

const router = express.Router();
router.get("/service/:id", getServiceById);
router.get("/service", getAllService);
router.post("/service", createService);
router.delete("/service/:id", deleteServiceById);
router.patch("/service/:id", patchService);
module.exports = router;
