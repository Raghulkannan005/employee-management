import express from 'express';
import { 
    getAllLeaves, 
    getEmployeeLeaves, 
    getLeaveById, 
    createLeave, 
    updateLeaveStatus, 
    deleteLeave,
    getLeaveStatistics
} from '../controllers/leaveController.js';
import { verifyApiKey } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply API key verification to all routes
router.use(verifyApiKey);

// Get leave statistics
router.get('/statistics', getLeaveStatistics);

// Get all leaves
router.get('/', getAllLeaves);

// Get leaves for a specific employee
router.get('/employee/:id', getEmployeeLeaves);

// Get a specific leave by ID
router.get('/:id', getLeaveById);

// Create a new leave
router.post('/', createLeave);

// Update leave status
router.put('/:id/status', updateLeaveStatus);

// Delete a leave
router.delete('/:id', deleteLeave);

export default router;