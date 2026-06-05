import express from "express";
import {
    getSpots,
    getCars,
    stats,
    enterCar,
    exitCar
} from "../controllers/parking.controller";

const router = express.Router();

router.get("/spots", getSpots);

router.get("/cars", getCars);

router.get("/stats", stats);

router.post("/cars/enter", enterCar);

router.post("/cars/exit", exitCar);

export default router;