const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Join", "Contact"],
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Submission || mongoose.model("Submission", submissionSchema);
