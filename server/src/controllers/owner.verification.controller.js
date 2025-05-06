import { OwnerVerification } from '../models/owner.verification.model.js';
import {uploadOnCloudinary} from "../utils/cloudinary.js"

// Create verification request
export const createOwnerVerification = async (req, res) => {
  try {
    const { phoneNumber, address } = req.body;

    // Check if user already submitted
    const existing = await OwnerVerification.findOne({ user: req.user._id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Verification already submitted' });
    }

    const verificationDocumentsLocalPath = req.files?.verificationDocuments[0]?.path;
    
    if (!verificationDocumentsLocalPath) {
      throw new ApiError(400, "verificationDocuments file is required")
    }
    

    
  const verificationDocuments = await uploadOnCloudinary(verificationDocumentsLocalPath)

    const verification = await OwnerVerification.create({
      user: req.user._id,
      phoneNumber,
      address,
      verificationDocuments: verificationDocuments.url
    });

    res.status(201).json({ success: true, data: verification });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get current user's verification
export const getMyVerification = async (req, res) => {
  try {
    const verification = await OwnerVerification.findOne({ user: req.user._id });

    if (!verification) {
      return res.status(404).json({ success: false, message: 'No verification found' });
    }

    res.status(200).json({ success: true, data: verification });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Approve verification
export const approveVerification = async (req, res) => {
  try {
    const { id } = req.params;

    const verification = await OwnerVerification.findByIdAndUpdate(
      id,
      { verified: true, verificationStatus: 'approved', verificationDate: new Date() },
      { new: true }
    );

    if (!verification) {
      return res.status(404).json({ success: false, message: 'Verification not found' });
    }

    res.status(200).json({ success: true, data: verification });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Reject verification
export const rejectVerification = async (req, res) => {
  try {
    const { id } = req.params;

    const verification = await OwnerVerification.findByIdAndUpdate(
      id,
      { verified: false, verificationStatus: 'rejected' },
      { new: true }
    );

    if (!verification) {
      return res.status(404).json({ success: false, message: 'Verification not found' });
    }

    res.status(200).json({ success: true, data: verification });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
