import { Risks } from "../models/risks.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllRisks = asyncHandler(async (req, res) => {
  const risks = await Risks.find();
  return res
    .status(200)
    .json(new ApiResponse(200, risks, "Data found successfully"));
});

const addRisks = asyncHandler(async (req, res) => {
  const {
    riskId,
    scenario,
    description,
    riskOne,
    tagKey,
    riskTwo,
    tagValue,
    toggleValue,
    status,
  } = req.body;

  console.log("risk", req.body);
  if (!scenario) {
    throw new ApiError(404, "Mandatory filed not provided");
  }
  const risks = await Risks.create({
    riskId,
    scenario,
    description,
    riskOne,
    tagKey,
    riskTwo,
    tagValue,
    toggleValue,
    status,
  });
  return res
    .status(201)
    .json(new ApiResponse(200, risks, "Risk added successfully"));
});

const countRisks = asyncHandler(async (req, res) => {
  const result = await Risks.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        enabled: {
          $sum: {
            $cond: {
              if: { $eq: ["$toggleValue", "enabled"] },
              then: 1,
              else: 0,
            },
          },
        },
        disabled: {
          $sum: {
            $cond: {
              if: { $eq: ["$toggleValue", "disabled"] },
              then: 1,
              else: 0,
            },
          },
        },
        draft: {
          $sum: {
            $cond: {
              if: {
                $and: [{ $ne: ["$status", "publish"] }],
              },
              then: 1,
              else: 0,
            },
          },
        },
      },
    },
  ]);

  const counts = result[0];
  return res
    .status(201)
    .json(new ApiResponse(200, counts, "Total counts successfully."));
});

const getRiskAssessments = asyncHandler(async (req, res) => {
  try {
    const risksWithoutAssessment = await Risks.aggregate([
      {
        $lookup: {
          from: "assessments",
          localField: "riskId",
          foreignField: "riskId",
          as: "assessment",
        },
      },
      {
        $match: {
          assessment: { $size: 0 },
        },
      },
      {
        $unset: "assessment",
      },
    ]);

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

export { getAllRisks, addRisks, countRisks, getRiskAssessments };
