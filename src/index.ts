import express from "express";
import path from "path";

import parkingRoutes from "./routes/parking.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

// Static files (CSS, JS)
app.use(
    express.static(
        path.join(__dirname, "views")
    )
);

// Dashboard page
app.get("/", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "views",
            "dashboard",
            "dashboard.html"
        )
    );
});

// API routes
app.use("/", parkingRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});