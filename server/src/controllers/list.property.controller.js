import ListProperty  from '../models/list.property.model.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiError} from '../utils/ApiError.js';

// Create a new property listing
export const createPropertyListing = async (req, res) => {
  try {
    const { type, description, providerType, streetAddress, city, stateProvince, postalCode, country, nearby } = req.body;
    const imageLocalPath = req.files?.image[0]?.path; // Property image

    // Validate that image is provided
    if (!imageLocalPath) {
      throw new ApiError(400, "Image file is required");
    }

    // Upload image to Cloudinary
    const image = await uploadOnCloudinary(imageLocalPath);

    // Create the property listing
    const propertyListing = await ListProperty.create({
      usernameId: req.user._id, // The owner of the property
      type,
      description,
      providerType,
      streetAddress,
      city,
      stateProvince,
      postalCode,
      country,
      nearby,
      image: image.url, // Store the URL of the uploaded image
    });

    res.status(201).json({ success: true, data: propertyListing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get current user's property listings
export const getMyPropertyListings = async (req, res) => {
  try {
    const propertyListings = await ListProperty.find({ usernameId: req.user._id });
    // console.log(propertyListings)

    if (!propertyListings || propertyListings.length === 0) {
      return res.status(404).json({ success: false, message: 'No property listings found' });
    }

    res.status(200).json({ success: true, data: propertyListings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Approve a property listing
export const approvePropertyListing = async (req, res) => {
  try {
    const { id } = req.params;

    const propertyListing = await ListProperty.findByIdAndUpdate(
      id,
      { verified: true, status: 'approved', approvalDate: new Date() },
      { new: true }
    );

    if (!propertyListing) {
      return res.status(404).json({ success: false, message: 'Property listing not found' });
    }

    res.status(200).json({ success: true, data: propertyListing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Reject a property listing
export const rejectPropertyListing = async (req, res) => {
  try {
    const { id } = req.params;

    const propertyListing = await ListProperty.findByIdAndUpdate(
      id,
      { verified: false, status: 'rejected' },
      { new: true }
    );

    if (!propertyListing) {
      return res.status(404).json({ success: false, message: 'Property listing not found' });
    }

    res.status(200).json({ success: true, data: propertyListing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
