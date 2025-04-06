import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
    },
    leaveType: { 
        type: String, 
        required: true,
        enum: ['Casual', 'Sick', 'Vacation', 'Maternity/Paternity', 'Bereavement', 'Other']
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true 
    },
    reason: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        required: true,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    approverComments: { 
        type: String 
    },
    dateApplied: { 
        type: Date,
        default: Date.now
    },
    dateReviewed: { 
        type: Date 
    }
}, { timestamps: true });

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;