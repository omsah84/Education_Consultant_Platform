import ListRoom from '../models/list.room.model.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from '../utils/ApiError.js';
import BookingRequest from "../models/booking.request.model.js";
import RoomBook from '../models/room.book.model.js';
import ListProperty from '../models/list.property.model.js';
import { User } from '../models/user.model.js';

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
    const roomListings = await ListRoom.find({
      usernameId: req.user._id,
      status: 'Confirmed',
    }).populate({
      path: 'listingId',
      model: 'ListProperty',
    });

    if (!roomListings || roomListings.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No confirmed room listings found',
      });
    }

    const mergedListings = await Promise.all(
      roomListings.map(async (room) => {
        // Only include rooms with an "In Progress" booking request
        const bookingRequest = await BookingRequest.findOne({
          roomId: room._id,
          status: 'In Progress',
        });

        if (!bookingRequest) return null; // Skip room if no such booking

        const listing = room.listingId;

        const roomBook = await RoomBook.findOne({ roomId: room._id }).populate({
          path: 'bookedById',
          select: 'fullName',
        });

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

          // Booking request status
          bookingRequestStatus: bookingRequest.status,

          // Listing info
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

          // Room booking info
          bookingInfo: roomBook ? {
            roomBookId: roomBook._id,
            status: roomBook.status,
            paymentMethod: roomBook.paymentMethod,
            notes: roomBook.notes,
            bookedById: roomBook.bookedById?._id,
            bookedByName: roomBook.bookedById?.fullName || null,
          } : null,
        };
      })
    );

    // Remove null entries (rooms without 'In Progress' booking)
    const filteredListings = mergedListings.filter(item => item !== null);

    res.status(200).json({ success: true, data: filteredListings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const getMyApprovedRoomListings = async (req, res) => {
  try {
    const roomListings = await ListRoom.find({
      usernameId: req.user._id,
    }).populate({
      path: 'listingId',
      model: 'ListProperty',
    });

    if (!roomListings || roomListings.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No room listings found',
      });
    }

    const approvedRooms = await Promise.all(
      roomListings.map(async (room) => {
        // Get booking request with status "Approved"
        const bookingRequest = await BookingRequest.findOne({
          roomId: room._id,
          status: 'Approved',
        }).populate({
          path: 'userId',
          select: 'fullName', // Assuming the field name is fullName
        });

        if (!bookingRequest) return null;

        const listing = room.listingId;

        const roomBook = await RoomBook.findOne({ roomId: room._id }).populate({
          path: 'bookedById',
          select: 'fullName',
        });

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

          bookingRequestStatus: bookingRequest.status,

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

          bookingInfo: roomBook ? {
            roomBookId: roomBook._id,
            status: roomBook.status,
            paymentMethod: roomBook.paymentMethod,
            notes: roomBook.notes,
            bookedById: roomBook.bookedById?._id,
            bookedByName: roomBook.bookedById?.fullName || null,
          } : null,
        };
      })
    );

    const filteredRooms = approvedRooms.filter(Boolean);

    if (filteredRooms.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No approved booking requests found',
      });
    }

    res.status(200).json({ success: true, data: filteredRooms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const approveBooking = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { roomId } = req.body;

    if (!roomId) {
      return next(new ApiError("Room ID is required", 400));
    }

    // Fetch room without filtering status first, to diagnose
    const room = await ListRoom.findById(roomId).populate("listingId");

    if (!room) {
      return next(new ApiError("Room not found", 404));
    }

    if (room.usernameId.toString() !== userId.toString()) {
      return next(new ApiError("You do not have permission to approve this booking", 403));
    }

    if (room.status !== "Confirmed") {
      return next(new ApiError(`Room must be in 'Confirmed' status, found '${room.status}'`, 400));
    }

    const booking = await BookingRequest.findOne({
      roomId: room._id,
      status: "In Progress",
    });

    if (!booking) {
      return next(new ApiError("Booking request with 'In Progress' status not found", 404));
    }

    // Update booking status only
    booking.status = "Approved";
    booking.bookedBy = booking.userId;
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking approved successfully",
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
    console.error("Error approving booking:", err);
    return next(new ApiError("Internal server error", 500));
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




export const getBookingStatusForHost = async (req, res) => {
  try {
    const hostId = req.user._id.toString();

    const rooms = await ListRoom.find({
      usernameId: hostId,
      status: { $in: ["Booked", "In Progress", "Requested", "Confirmed"] }
    })
      .populate({
        path: 'listingId',
        model: 'ListProperty',
        select: 'streetAddress city stateProvince postalCode country usernameId',
        populate: {
          path: 'usernameId',
          model: 'User',
          select: 'fullName',
        },
      })
      .populate({
        path: 'bookedBy',
        model: 'User',
        select: 'fullName email',
      })
      .populate({
        path: 'usernameId',
        model: 'User',
        select: 'fullName email phoneNumber',
      })
      .lean(); // Ensures we get plain JS objects

    if (!rooms.length) {
      return res.status(404).json({
        success: false,
        message: 'No valid rooms found for the host.'
      });
    }

    const filteredRooms = await Promise.all(
      rooms.map(async room => {
        const bookingRequest = await BookingRequest.findOne({
          roomId: room._id,
          status: { $in: ['Pending', 'Approved', 'Rejected', 'In Progress'] }
        })
          .sort({ createdAt: -1 })
          .lean();

        const roomBook = await RoomBook.findOne({ roomId: room._id })
          .sort({ createdAt: -1 })
          .lean();

        return {
          roomDetails: {
            type: room.type,
            description: room.description,
            pricePerMonth: room.pricePerMonth,
            status: room.status,
            availableFeatures: room.availableFeatures,
          },
          roomAddress: {
            streetAddress: room.listingId?.streetAddress || '',
            city: room.listingId?.city || '',
            stateProvince: room.listingId?.stateProvince || '',
            postalCode: room.listingId?.postalCode || '',
            country: room.listingId?.country || '',
          },
          bookerDetails: room.bookedBy
            ? {
              fullName: room.bookedBy.fullName || '',

            }
            : null,
          hostDetails: room.usernameId
            ? {
              fullName: room.usernameId.fullName || '',
            }
            : null,
          bookingRequestStatus: bookingRequest?.status || 'Not Found',
          paymentDetails: roomBook
            ? {
              status: roomBook.status,
              paymentMethod: roomBook.paymentMethod,
              bookingDate: roomBook.bookingDate,
              notes: roomBook.notes || '',
            }
            : null,
        };
      })
    );
    // console.log(filteredRooms)
    return res.status(200).json({
      success: true,
      data: filteredRooms
    });

  } catch (err) {
    console.error('Error fetching filtered rooms for host:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
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
