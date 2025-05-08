import BookingRequest from '../models/booking.request.model.js';
import RoomBook from '../models/room.book.model.js';
import ListRoom from '../models/list.room.model.js';
import ListProperty from '../models/list.property.model.js';

export const markBookingAsConfirmed = async (req, res) => {
  const { bookingId } = req.params;
  const { paymentMethod, notes } = req.body;

  try {
    // 1. Fetch the booking request (read-only)
    const booking = await BookingRequest.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // 2. Fetch the room
    const room = await ListRoom.findById(booking.roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // 3. Only update if room status is "In Progress"
    if (room.status !== 'In Progress') {
      return res.status(400).json({
        success: false,
        message: `Room is not in progress. Current status: ${room.status}`,
      });
    }

    // 4. Update room status to "Confirmed"
    room.status = 'Confirmed';
    room.bookedBy = booking.userId;
    await room.save();

    // 5. Fetch listing info
    const listing = await ListProperty.findById(room.listingId);
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    // 6. Save data into RoomBook
    const roomBook = new RoomBook({
      roomId: room._id,
      roomOwnerId: room.usernameId,
      bookedById: booking.userId,
      listingId: room.listingId,
      paymentMethod,
      notes,
    });

    await roomBook.save();

    return res.status(200).json({
      success: true,
      message: 'Room confirmed and booking stored successfully.',
      roomBook,
    });
  } catch (error) {
    console.error('Error confirming booking:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
