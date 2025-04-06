import Employee from "./models/employeeModel.js";

const verifyUser = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey === process.env.API_KEY) {
        next();
    } else {
        res.status(403).json({ message: "Unauthorized" });
    }
};

export default verifyUser;