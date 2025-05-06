import express from 'express';
import {
  createOwnerVerification,
  getMyVerification,
  approveVerification,
  rejectVerification,
} from '../controllers/owner.verification.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {upload} from "../middlewares/multer.middleware.js"

const router = express.Router();

// ==================== USER ROUTES ====================
router.use(verifyJWT); // Apply JWT verification to all routes below

// 👤 User can submit and view their verification
router.post('/owner-verification',upload.fields([
  {
      name: "verificationDocuments",
      maxCount: 1
  }, 
]), createOwnerVerification);
router.get('/owner-verification', getMyVerification);

// ==================== ADMIN ROUTES ====================
// router.use('/admin', isAdmin); // Apply isAdmin only for /admin routes

// 🛡️ Admin can approve or reject a specific verification
// router.patch('/admin/owner-verification/:id/approve', approveVerification);
// router.patch('/admin/owner-verification/:id/reject', rejectVerification);

export default router;
