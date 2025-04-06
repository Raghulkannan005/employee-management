import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String },
    department: { type: String },
    salary: { type: Number },
    email: { type: String },
    phone: { type: String },
    joiningDate: { type: Date },
    address: { type: String },
    experience: { type: Number } // in years
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;