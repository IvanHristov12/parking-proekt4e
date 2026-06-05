import express from "express";
import pool from "./config/db";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Parking API working");
});

app.get("/spots", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM parking_spots");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database error"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});