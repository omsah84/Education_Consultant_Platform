import BookingRequest from '../models/booking.request.model.js';
import ListRoom from '../models/list.room.model.js';
import RoomBook from '../models/room.book.model.js';
import ListProperty from '../models/list.property.model.js';
import { User } from '../models/user.model.js';
import { compareSync } from 'bcrypt';

export const requestRoomBooking = async (req, res) => {
  try {
    const { roomId } = req.body;

    // Ensure roomId is provided
    if (!roomId) {
      return res.status(400).json({ success: false, message: 'Room ID is required' });
    }

    // Check if the room exists
    const room = await ListRoom.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // Ensure the room has the 'usernameId' field populated
    if (!room.usernameId) {
      return res.status(400).json({ success: false, message: 'Room usernameId is missing' });
    }

    // Check if a booking request already exists for this room by the same user
    const existingRequest = await ListRoom.findOne({
      roomId,
      userId: req.user._id,
    });

    if (existingRequest) {
      return res.status(400).json({ success: false, message: 'You have already requested to book this room' });
    }

    // Create a new booking request
    const booking = new BookingRequest({
      roomId,
      userId: req.user._id,
      bookedBy: req.user._id
    });

    // Save the booking request to the database
    await booking.save();

    // Update the room's status to "Requested"
    room.status = 'Requested';
    await room.save(); // Save the updated room status

    return res.status(201).json({ success: true, message: 'Booking request sent successfully' });
  } catch (error) {
    console.error('Error requesting booking:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


// Controller for getting room details by roomId
export const getRoomDetails = async (req, res) => {
  try {
    const { roomId } = req.params; // Get roomId from request parameters

    if (!roomId) {
      return res.status(400).json({ success: false, message: 'Room ID is required' });
    }

    // Fetch room details by roomId
    const room = await ListRoom.findById(roomId).populate('listingId'); // populate listing details if needed

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // Return room details in the response
    return res.status(200).json({
      success: true,
      roomStatus: room.status,
      roomDescription: room.description,
      pricePerMonth: room.pricePerMonth,
      roomType: room.type,
      occupancyType: room.occupancyType,
      availableFeatures: room.availableFeatures,
      notAvailableFeatures: room.notAvailableFeatures,
      images: room.images,
      address: room.address,
    });
  } catch (error) {
    console.error('Error getting room details:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const getUserBookingRequests = async (req, res) => {
  try {
    // Find booking requests by the logged-in user
    const bookingRequests = await BookingRequest.find({ userId: req.user._id })
      .populate({
        path: 'roomId',
        match: { status: 'Requested' }, // Only include rooms with status "Requested"
        // Removed 'select' to include full room data
      })
      .exec();

    // Filter out requests where roomId is null (status not matched)
    const filteredRequests = bookingRequests.filter((request) => request.roomId !== null);

    //   console.log(filteredRequests)
    return res.status(200).json({ success: true, data: filteredRequests });
  } catch (err) {
    console.error('Error fetching booking requests:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const getInProgressBookingRequests = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    const bookingRequests = await BookingRequest.find({
      userId: userId,
      status: 'In Progress', // ✅ Only booking requests still in progress
    })
      .populate('roomId')
      .exec();

    const filteredRequests = bookingRequests.filter((request) => {
      const room = request.roomId;
      if (!room) return false;

      const isRoomInProgress = room.status === 'In Progress';
      const isBookedByUser = room.bookedBy?.toString() === userId;

      return isRoomInProgress && isBookedByUser;
    });

    return res.status(200).json({ success: true, data: filteredRequests });
  } catch (err) {
    console.error('Error fetching in-progress booking requests:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const getApprovedBookingRequests = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    // Fetch approved booking requests and populate related data
    const bookingRequests = await BookingRequest.find({
      userId: userId,
      status: 'Approved',
    })
      .populate({
        path: 'roomId',
        select: 'type description pricePerMonth status bookedBy availableFeatures listingId',
        populate: {
          path: 'listingId',
          model: 'ListProperty',
          select: 'streetAddress city stateProvince postalCode country usernameId',
          populate: {
            path: 'usernameId',
            model: 'User',
            select: 'fullName',
          },
        },
      })
      .exec();

    // Filter requests where room is confirmed and booked by current user
    const filteredRequests = bookingRequests.filter((request) => {
      const room = request.roomId;
      if (!room) return false;

      const isRoomConfirmed = room.status === 'Confirmed';
      const isBookedByUser = room.bookedBy?.toString() === userId;

      return isRoomConfirmed && isBookedByUser;
    });

    const response = await Promise.all(
      filteredRequests.map(async (request) => {
        const room = request.roomId;
        const address = room.listingId;
        const providerUser = address?.usernameId;

        // Fetch the full name of the user who booked (bookedBy)
        const bookedByUser = await User.findById(room.bookedBy).select('fullName');

        const roomBooking = await RoomBook.findOne({
          roomId: room._id,
          bookedById: userId,
        }).select('status bookingDate paymentMethod');

        return {
          bookingRequest: {
            status: request.status,
            createdAt: request.createdAt,
            bookedByName: bookedByUser?.fullName || 'Unknown',
            providerName: providerUser?.fullName || 'Unknown',
          },
          roomDetails: {
            type: room.type,
            description: room.description,
            pricePerMonth: room.pricePerMonth,
            status: room.status,
            availableFeatures: room.availableFeatures,
          },
          roomAddress: {
            streetAddress: address.streetAddress,
            city: address.city,
            stateProvince: address.stateProvince,
            postalCode: address.postalCode,
            country: address.country,
          },
          roomBookingPayment: {
            status: roomBooking?.status,
            bookingDate: roomBooking?.bookingDate,
            paymentMethod: roomBooking?.paymentMethod,
          },
        };
      })
    );
    // console.log(response)
    return res.status(200).json({ success: true, data: response });
  } catch (err) {
    console.error('Error fetching approved booking requests:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    // Find the booking
    const booking = await BookingRequest.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Update booking status to "Rejected"
    booking.status = 'Rejected';
    await booking.save();

    // Update room status to "Available"
    if (booking.roomId) {
      await ListRoom.findByIdAndUpdate(booking.roomId, { status: 'Available', bookedBy: null, });
    }

    return res.status(200).json({
      success: true,
      message: 'Booking canceled. Room status set to Available.',
    });
  } catch (err) {
    console.error('Cancel booking error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};





// Controller to get the current booking status for a tenant
export const getBookingStatusForTenant = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    // Step 1: Get all RoomBooks for this tenant (any status)
    const roomBookings = await RoomBook.find({ bookedById: userId })
      .populate({
        path: 'roomId',
        select: 'type description pricePerMonth status availableFeatures bookedBy listingId',
        populate: {
          path: 'listingId',
          model: 'ListProperty',
          select: 'streetAddress city stateProvince postalCode country usernameId',
          populate: {
            path: 'usernameId',
            model: 'User',
            select: 'fullName',
          },
        },
      })
      .populate('bookedById', 'fullName email');

    const filteredData = [];

    for (const booking of roomBookings) {
      const room = booking.roomId;
      const property = room?.listingId;

      // ❌ Skip if room is missing or status is 'Available'
      if (!room || room.status === 'Available') continue;

      // Check related booking request
      const bookingRequest = await BookingRequest.findOne({
        roomId: room._id,
        userId: userId,
        status: { $in: ['Pending', 'Approved', 'In Progress'] }  // Filter by status
      });

      // ❌ Skip if booking request doesn't exist or is 'Rejected'
      if (!bookingRequest || bookingRequest.status === 'Rejected') continue;

      const bookedByUser = await User.findById(room.bookedBy).select('fullName');

      // Structure the response similar to your approved booking controller
      filteredData.push({
        bookingRequest: {
          status: bookingRequest?.status || 'Unknown',
          createdAt: bookingRequest?.createdAt || null,
          bookedByName: bookedByUser?.fullName || 'Unknown',
          providerName: property?.usernameId?.fullName || 'Unknown',
        },
        roomDetails: {
          type: room.type,
          description: room.description,
          pricePerMonth: room.pricePerMonth,
          status: room.status,
          availableFeatures: room.availableFeatures,
        },
        roomAddress: {
          streetAddress: property?.streetAddress,
          city: property?.city,
          stateProvince: property?.stateProvince,
          postalCode: property?.postalCode,
          country: property?.country,
        },
        roomBookingPayment: {
          status: booking.status,
          bookingDate: booking.bookingDate,
          paymentMethod: booking.paymentMethod,
        },
      });
    }

    if (filteredData.length === 0) {
      return res.status(404).json({ success: false, message: 'No valid booking data found.' });
    }
    return res.status(200).json({ success: true, data: filteredData });
  } catch (err) {
    console.error('Error fetching structured booking data:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
