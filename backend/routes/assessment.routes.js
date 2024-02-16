import { Router } from "express";
import {
  addAssessment,
  getAllAssessments,
  getRiskAssessments,
} from "../controllers/assessment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getAllAssessments);
router.route("/addAssessment").post(addAssessment);
router.route("/getRiskAssessment").get(getRiskAssessments);

export default router;
