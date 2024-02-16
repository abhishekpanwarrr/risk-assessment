import { Assessments } from "../models/assessment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllAssessments = asyncHandler(async (req, res) => {
  const risks = await Assessments.find();
  return res
    .status(200)
    .json(new ApiResponse(200, risks, "Data found successfully"));
});

const addAssessment = asyncHandler(async (req, res) => {
  const data = req.body;

  console.log("risk", req.body);
  if (data.length <= 0) {
    throw new ApiError(404, "Error storing in db");
  }
  const assessment = await Assessments.insertMany(data);
  return res
    .status(201)
    .json(new ApiResponse(200, assessment, "Risk added successfully"));
});

const getRiskAssessments = asyncHandler(async (req, res) => {
  try {
    const risksWithoutAssessment = await Assessments.find({
      netRiskScore: { $exists: true, $ne: null },
    })
      .sort({ updatedAt: -1 })
      .limit(10);

    return res
      .status(200)
      .json(
        new ApiResponse(200, risksWithoutAssessment, "Data found successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(200, null, "Something went wrong"));
  }
});

export { getAllAssessments, addAssessment, getRiskAssessments };
