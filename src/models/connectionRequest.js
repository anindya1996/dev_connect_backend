const mongoose = require("mongoose");

const connectRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored ", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// connectRequestSchema.pre("save", function (next) {
//   const connectionRequest = this;
//   //check fromUserId is same as toUserId
//   if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
//     throw new Error("Cannot send connection request to yourself!!");
//   }
//   next();
// });

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectRequestSchema
);

module.exports = ConnectionRequestModel;
