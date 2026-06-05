import { Request, Response } from "express";
import {
    getAllSpots,
    getParkedCars,
    getStats,
    parkCar,
    exitCar as exitCarService
} from "../services/parking.service";

export const getSpots = async (
    req: Request,
    res: Response
) => {
    try {

        const spots = await getAllSpots();

        res.json(spots);

    } catch (error) {

        res.status(500).json({
            message: "Database error"
        });

    }
};

export const getCars = async (
    req: Request,
    res: Response
) => {
    try {

        const cars = await getParkedCars();

        res.json(cars);

    } catch (error) {

        res.status(500).json({
            message: "Database error"
        });

    }
};

export const stats = async (
    req: Request,
    res: Response
) => {
    try {

        const data = await getStats();

        res.json(data);

    } catch (error) {

        res.status(500).json({
            message: "Database error"
        });

    }
};

export const enterCar = async (
    req: Request,
    res: Response
) => {
    try {

        const { car_num } = req.body;

        const spot = await parkCar(car_num);

        res.json({
            message: "Car parked",
            spot: spot.spot_number
        });

    } catch (error: any) {

        res.status(400).json({
            message: error.message
        });

    }
};

export const exitCar = async (
    req: Request,
    res: Response
) => {
    try {

        const { car_num } = req.body;

        await exitCarService(car_num);

        res.json({
            message: "Car exited"
        });

    } catch (error: any) {

        res.status(400).json({
            message: error.message
        });

    }
};