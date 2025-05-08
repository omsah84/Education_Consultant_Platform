import mongoose from 'mongoose';

const roomBookSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ListRoom', // Reference to the room
      required: true,
    },
    roomOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Owner of the room
      required: true,
    },
    bookedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // User who booked the room
      required: true,
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ListProperty', // Parent property or listing
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded', 'Cancelled'],
      default: 'Pending', // Default is pending (initial state)
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String, // Notes regarding the booking/payment
    },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Debit Card', 'Cash on Book', 'eSewa', 'Khalti', 'Bank Transfer'], // Supported payment methods
      default:'Cash on Book',
      required: true, // This will ensure that a payment method is always provided
    },
  },
  { timestamps: true }
);

const RoomBook = mongoose.models.RoomBook || mongoose.model('RoomBook', roomBookSchema);
export default RoomBook;
