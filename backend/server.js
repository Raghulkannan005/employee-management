import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Employee from "./src/models/employeeModel.js";
import verifyUser from "./src/verifyUser.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: "Something went wrong!", 
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Apply verifyUser middleware to protect routes that need authentication
// Public routes
app.get("/test", (req, res) => {
    res.status(200).json({ message: "API is working" });
});

// Protected routes
app.get("/api/employees", verifyUser, async (req, res, next) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        next(err);
    }
});

// Get a single employee by ID
app.get("/api/employees/:id", verifyUser, async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (err) {
        next(err);
    }
});

app.post("/api/employees", verifyUser, async (req, res, next) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        next(err);
    }
});

app.put("/api/employees/:id", verifyUser, async (req, res, next) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json(updatedEmployee);
    } catch (err) {
        next(err);
    }
});

app.delete("/api/employees/:id", verifyUser, async (req, res, next) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json({ message: "Employee deleted" });
    } catch (err) {
        next(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

