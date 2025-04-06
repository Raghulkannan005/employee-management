import Leave from '../models/leaveModel.js';
import Employee from '../models/employeeModel.js';

// Get all leaves (with optional filtering)
export const getAllLeaves = async (req, res) => {
    try {
        const { status, employeeId } = req.query;
        const filter = {};
        
        if (status) filter.status = status;
        if (employeeId) filter.employeeId = employeeId;
        
        const leaves = await Leave.find(filter)
            .populate('employeeId', 'name position department')
            .sort({ dateApplied: -1 });
            
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get leaves for a specific employee
export const getEmployeeLeaves = async (req, res) => {
    try {
        const { id } = req.params;
        const leaves = await Leave.find({ employeeId: id })
            .sort({ dateApplied: -1 });
            
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific leave by ID
export const getLeaveById = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findById(id)
            .populate('employeeId', 'name position department email phone');
            
        if (!leave) {
            return res.status(404).json({ error: 'Leave request not found' });
        }
        
        res.status(200).json(leave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new leave request
export const createLeave = async (req, res) => {
    try {
        const { employeeId, leaveType, startDate, endDate, reason } = req.body;
        
        // Validate employee exists
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        
        // Validate dates
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (start > end) {
            return res.status(400).json({ error: 'End date must be after start date' });
        }
        
        const leave = new Leave({
            employeeId,
            leaveType,
            startDate: start,
            endDate: end,
            reason,
            status: 'Pending'
        });
        
        const savedLeave = await leave.save();
        res.status(201).json(savedLeave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update leave status (approve/reject)
export const updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, approverComments } = req.body;
        
        if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }
        
        const leave = await Leave.findById(id);
        
        if (!leave) {
            return res.status(404).json({ error: 'Leave request not found' });
        }
        
        leave.status = status;
        leave.approverComments = approverComments;
        leave.dateReviewed = new Date();
        
        const updatedLeave = await leave.save();
        res.status(200).json(updatedLeave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a leave request
export const deleteLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findById(id);
        
        if (!leave) {
            return res.status(404).json({ error: 'Leave request not found' });
        }
        
        // Only allow deletion if status is pending
        if (leave.status !== 'Pending') {
            return res.status(400).json({ 
                error: 'Cannot delete a leave request that has been approved or rejected' 
            });
        }
        
        await Leave.findByIdAndDelete(id);
        res.status(200).json({ message: 'Leave request deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get leave statistics for dashboard
export const getLeaveStatistics = async (req, res) => {
    try {
        const stats = {
            pending: await Leave.countDocuments({ status: 'Pending' }),
            approved: await Leave.countDocuments({ status: 'Approved' }),
            rejected: await Leave.countDocuments({ status: 'Rejected' }),
            total: await Leave.countDocuments({})
        };
        
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};