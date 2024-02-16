import mongoose, { Schema } from "mongoose";

const assessmentSchema = new Schema(
  {
    riskId: {
      type: String,
      required: true,
      ref: "Risks",
    },
    scenario: {
      type: String,
    },
    likelihoodScoreText: {
      type: String,
    },
    likelihoodScoreValue: {
      type: Number,
    },
    businessImpactScoreText: { type: String },
    businessImpactScoreValue: { type: Number },
    netRiskScore: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const Assessments = mongoose.model("Assessment", assessmentSchema);
