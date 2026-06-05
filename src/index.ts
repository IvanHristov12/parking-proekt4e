import express from "express";
import parkingRoutes from "./routes/parking.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Parking API working");
});

app.use("/", parkingRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});