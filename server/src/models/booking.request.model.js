// models/booking.request.model.js
import mongoose from 'mongoose';

const bookingRequestSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ListRoom',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // or your user model name
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected',"In Progress"],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BookingRequest = mongoose.model('BookingRequest', bookingRequestSchema);
export default BookingRequest;

