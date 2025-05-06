import express from 'express';
import {
  createRoomListing,
  getMyRoomListings,
  approveRoomListing,
  rejectRoomListing,
} from '../controllers/list.room.controller.js'; // Import your room controller
import { verifyJWT } from '../middlewares/auth.middleware.js'; // JWT verification middleware
import { upload } from '../middlewares/multer.middleware.js'; // Multer for file uploads

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

// ==================== ADMIN ROUTES ====================
// 🛡️ Admin can approve or reject a specific room listing
// router.patch('/admin/room-listing/:id/approve', approveRoomListing); // Approve room listing
// router.patch('/admin/room-listing/:id/reject', rejectRoomListing); // Reject room listing

export default router;
