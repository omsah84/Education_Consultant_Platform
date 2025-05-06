import mongoose from 'mongoose';

const ownerVerificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    verificationDocuments: {
      type: String,
      required: true,
    },
    verificationDate: {
      type: Date,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      state: { type: String, required: true },
      district: { type: String, required: true },
      city: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const OwnerVerification = mongoose.model('OwnerVerification', ownerVerificationSchema);

export { OwnerVerification };
