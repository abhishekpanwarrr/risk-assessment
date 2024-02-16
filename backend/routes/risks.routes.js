import { Router } from "express";
import {
  addRisks,
  getAllRisks,
  countRisks,
  getRiskAssessments
} from "../controllers/risks.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getAllRisks);
router.route("/addRisks").post(addRisks);
router.route("/getRiskAssessment").get(getRiskAssessments);
router.route("/totalCounts").get(countRisks);

export default router;
