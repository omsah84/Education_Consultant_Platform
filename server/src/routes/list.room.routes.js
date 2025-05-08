import express from 'express';
import {
  createRoomListing,
  getMyRoomListings,
  getMyRequestedRoomListings,
  acceptBooking,
  rejectBooking,
  getMyConfirmedRoomListings
  // approveRoomListing,
  // rejectRoomListing,
} from '../controllers/list.room.controller.js'; // Import your room controller
import { verifyJWT } from '../middlewares/auth.middleware.js'; // JWT verification middleware
import { upload } from '../middlewares/multer.middleware.js'; // Multer for file uploads
import {  searchRoomListings} from "../controllers/search.room.controller.js"
import { requestRoomBooking,getRoomDetails,getUserBookingRequests,getInProgressBookingRequests ,cancelBooking} from '../controllers/request.room.booking.controller.js';

import { markBookingAsConfirmed } from '../controllers/room.book.controller.js';
const router = express.Router();

// ==================== USER ROUTES ====================
router.use(verifyJWT); // Apply JWT verification to all routes below

// 👤 User can create and view their room listings
router.post('/room-listing', upload.fields([
  {
    name: 'images', // Name of the field in the request for images
    maxCount: 5, // Allow up to 5 images for the room listing (adjust maxCount as per your need)
  }
]), createRoomListing); // Create room listing with multiple images

router.get('/room-listings', getMyRoomListings); // Get current user's room listings
router.get('/search', searchRoomListings); // Get current user's room listings
router.post('/request-booking', requestRoomBooking);
router.get('/requested-room', getMyRequestedRoomListings);
router.get('/confirmed-room',getMyConfirmedRoomListings);
router.post('/accept-booking', acceptBooking);
router.post('/reject-booking', rejectBooking);
router.get('/my-booking-requests', getUserBookingRequests);
router.get('/my-booking-requests/in-progress', getInProgressBookingRequests);
router.post('/cancel-booking/:bookingId', cancelBooking);
router.post('/mark-as-confirmed/:bookingId', markBookingAsConfirmed);
router.get('/:roomId', getRoomDetails);

// ==================== ADMIN ROUTES ====================
// 🛡️ Admin can approve or reject a specific room listing
// router.patch('/admin/room-listing/:id/approve', approveRoomListing); // Approve room listing
// router.patch('/admin/room-listing/:id/reject', rejectRoomListing); // Reject room listing

export default router;
