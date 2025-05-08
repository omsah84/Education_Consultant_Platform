import ListRoom from '../models/list.room.model.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from '../utils/ApiError.js';
import BookingRequest from "../models/booking.request.model.js";

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


// Get current user's room listings with merged property data and 'Requested' status
export const getMyRequestedRoomListings = async (req, res) => {
  try {
    // Fetch rooms with listingId populated and status "Requested"
    const roomListings = await ListRoom.find({ 
      usernameId: req.user._id,
      status: 'Requested' // Filter rooms with status "Requested"
    }).populate({
      path: 'listingId',
      model: 'ListProperty',
    });


    if (!roomListings || roomListings.length === 0) {
      return res.status(404).json({ success: false, message: 'No requested room listings found' });
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
        bookedBy: room.bookedBy, // Adding likedByUsers here

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
    // console.log(mergedListings)
    res.status(200).json({ success: true, data: mergedListings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyConfirmedRoomListings = async (req, res) => {
  try {
    // Fetch rooms with listingId populated and status "Confirmed"
    const roomListings = await ListRoom.find({ 
      usernameId: req.user._id,
      status: 'Confirmed' // Filter rooms with status "Confirmed"
    }).populate({
      path: 'listingId',
      model: 'ListProperty',
    });

    if (!roomListings || roomListings.length === 0) {
      return res.status(404).json({ success: false, message: 'No confirmed room listings found' });
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
        bookedBy: room.bookedBy,

        // Merge listing data
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




// Accept a booking
export const acceptBooking = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { roomId } = req.body;

    if (!roomId) {
      return next(new ApiError("Room ID is required", 400));
    }

    // 1. Find the room belonging to the owner and with 'Requested' status
    const room = await ListRoom.findOne({
      _id: roomId,
      usernameId: userId,
      status: "Requested"
    }).populate("listingId");

    if (!room) {
      return next(new ApiError("Room not found or already processed", 404));
    }

    // 2. Find the booking request linked to this room
    const booking = await BookingRequest.findOne({
      roomId: room._id,
      status: "Pending"
    });

    if (!booking) {
      return next(new ApiError("Booking request not found", 404));
    }

    // 3. Update the room and booking status
    room.status = "In Progress";
    room.bookedBy = booking.userId;
    await room.save();

    booking.status = "In Progress";
    booking.bookedBy = booking.userId;
    await booking.save();

    // 4. Update the listing status as well
    if (room.listingId) {
      room.listingId.status = "Booked";
      await room.listingId.save();
    }

    return res.status(200).json({
      success: true,
      message: "Booking accepted successfully",
      data: {
        roomId: room._id,
        roomStatus: room.status,
        bookingStatus: booking.status,
        listing: {
          listingId: room.listingId?._id,
          propertyType: room.listingId?.type,
          address: {
            street: room.listingId?.streetAddress,
            city: room.listingId?.city,
            state: room.listingId?.stateProvince,
            postalCode: room.listingId?.postalCode,
            country: room.listingId?.country,
          },
        },
      },
    });

  } catch (err) {
    console.error("Error accepting booking:", err);
    return next(new ApiError("Internal server error", 500));
  }
};


// Reject a booking
export const rejectBooking = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { roomId } = req.body;

    if (!roomId) {
      return next(new ApiError("Room ID is required", 400));
    }

    // 1. Find the room that belongs to the current user and has "Requested" status
    const room = await ListRoom.findOne({
      _id: roomId,
      usernameId: userId,
      status: "Requested"
    }).populate("listingId");

    if (!room) {
      return next(new ApiError("Room not found or already processed", 404));
    }

    // 2. Find the associated booking request
    const booking = await BookingRequest.findOne({
      roomId: room._id,
      status: "Pending"
    });

    if (!booking) {
      return next(new ApiError("Booking request not found", 404));
    }

    // 3. Update statuses
    room.status = "Available";
    room.bookedBy = null;
    await room.save();

    booking.status = "Rejected";
    await booking.save();

    if (room.listingId) {
      room.listingId.status = "Available";
      await room.listingId.save();
    }

    // 4. Return response
    return res.status(200).json({
      success: true,
      message: "Booking rejected successfully",
      data: {
        roomId: room._id,
        roomStatus: room.status,
        bookingStatus: booking.status,
        listing: {
          listingId: room.listingId?._id,
          propertyType: room.listingId?.type,
          address: {
            street: room.listingId?.streetAddress,
            city: room.listingId?.city,
            state: room.listingId?.stateProvince,
            postalCode: room.listingId?.postalCode,
            country: room.listingId?.country,
          },
        },
      },
    });
  } catch (err) {
    console.error("Error rejecting booking:", err);
    return next(new ApiError("Internal server error", 500));
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
