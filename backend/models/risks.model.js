import mongoose, { Schema } from "mongoose";

const risksSchema = new Schema(
  {
    riskId: {
      type: String,
      required: true,
    },
    scenario: {
      type: String,
    },
    description: {
      type: String,
    },
    tagKey: {
      type: String,
    },
    tagValue: {
      type: String,
    },
    toggleValue: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Risks = mongoose.model("Risks", risksSchema);
