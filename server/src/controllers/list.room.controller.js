import ListRoom from '../models/list.room.model.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from '../utils/ApiError.js';

// Create a new room listing with multiple images
export const createRoomListing = async (req, res) => {
  try {
    const { listingId, description, pricePerMonth, status, type, occupancyType, availableFeatures, notAvailableFeatures } = req.body;

    // console.log(req.body); // Logs the uploaded files

    // Validate that at least one image is provided
    const imagesLocalPaths = req.files?.images; // Assuming the field name for images is "images"

    if (!imagesLocalPaths || imagesLocalPaths.length === 0) {
      throw new ApiError(400, "At least one image file is required");
    }

    // Upload each image to Cloudinary
    const uploadedImages = [];
    for (const imageLocalPath of imagesLocalPaths) {
      const image = await uploadOnCloudinary(imageLocalPath.path); // Assuming the image is uploaded from the local path
      uploadedImages.push(image.url); // Store the URL of the uploaded image
    }

    // Create the room listing with multiple images
    const roomListing = await ListRoom.create({
        usernameId: req.user._id,
      listingId,
      description,
      pricePerMonth,
      status,
      type,
      occupancyType,
      availableFeatures,
      notAvailableFeatures,
      images: uploadedImages, // Store an array of image URLs
    });

    res.status(201).json({ success: true, data: roomListing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get current user's room listings with merged property data
export const getMyRoomListings = async (req, res) => {
    try {
      // Fetch rooms with listingId populated
      const roomListings = await ListRoom.find({ usernameId: req.user._id }).populate({
        path: 'listingId',
        model: 'ListProperty',
      });
  
      if (!roomListings || roomListings.length === 0) {
        return res.status(404).json({ success: false, message: 'No room listings found' });
      }
  
      // Merge room data and listing data
      const mergedListings = roomListings.map((room) => {
        const listing = room.listingId;
  
        return {
          roomId: room._id,
          roomDescription: room.description,
          roomPricePerMonth: room.pricePerMonth,
          roomType: room.type,
          roomOccupancyType: room.occupancyType,
          roomAvailableFeatures: room.availableFeatures,
          roomNotAvailableFeatures: room.notAvailableFeatures,
          roomImages: room.images,
          roomCreatedAt: room.createdAt,
          roomStatus: room.status,
  
          // Merge listing data here
          listingId: listing?._id,
          propertyType: listing?.type,
          propertyDescription: listing?.description,
          providerType: listing?.providerType,
          address: {
            street: listing?.streetAddress,
            city: listing?.city,
            state: listing?.stateProvince,
            postalCode: listing?.postalCode,
            country: listing?.country,
          },
          nearby: listing?.nearby,
          listingCreatedAt: listing?.createdAt,
        };
      });
  
      res.status(200).json({ success: true, data: mergedListings });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };



 
  























// Admin: Approve a room listing
export const approveRoomListing = async (req, res) => {
  try {
    const { id } = req.params;

    const roomListing = await ListRoom.findByIdAndUpdate(
      id,
      { verified: true, status: 'approved', approvalDate: new Date() },
      { new: true }
    );

    if (!roomListing) {
      return res.status(404).json({ success: false, message: 'Room listing not found' });
    }

    res.status(200).json({ success: true, data: roomListing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Reject a room listing
export const rejectRoomListing = async (req, res) => {
  try {
    const { id } = req.params;

    const roomListing = await ListRoom.findByIdAndUpdate(
      id,
      { verified: false, status: 'rejected' },
      { new: true }
    );

    if (!roomListing) {
      return res.status(404).json({ success: false, message: 'Room listing not found' });
    }

    res.status(200).json({ success: true, data: roomListing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
