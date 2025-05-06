import express from 'express';
import {
  createPropertyListing,
  getMyPropertyListings,
  approvePropertyListing,
  rejectPropertyListing,
} from '../controllers/list.property.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

// ==================== USER ROUTES ====================
router.use(verifyJWT); // Apply JWT verification to all routes below

// 👤 User can create and view their property listings
router.post('/property-listing', upload.fields([
  {
    name: 'image',
    maxCount: 1, // Allow only one image for the property
  }
]), createPropertyListing);

router.get('/property-listings', getMyPropertyListings);

// ==================== ADMIN ROUTES ====================
// 🛡️ Admin can approve or reject a specific property listing
// router.patch('/admin/property-listing/:id/approve', approvePropertyListing);
// router.patch('/admin/property-listing/:id/reject', rejectPropertyListing);

export default router;
