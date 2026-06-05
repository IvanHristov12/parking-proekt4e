import pool from "../config/db";

export const getAllSpots = async () => {
    const [rows] = await pool.query(
        `
        SELECT
            parking_spots.id,
            parking_spots.spot_number,
            parking_spots.is_occupied,
            cars.car_num
        FROM parking_spots
        LEFT JOIN cars
            ON parking_spots.id = cars.parking_spot
            AND cars.exit_time IS NULL
        ORDER BY parking_spots.spot_number
        `
    );

    return rows;
};

export const getParkedCars = async () => {
    const [rows] = await pool.query(
        `SELECT * FROM cars
         WHERE exit_time IS NULL`
    );

    return rows;
};

export const getStats = async () => {

    const [allSpots]: any = await pool.query(
        "SELECT COUNT(*) as total FROM parking_spots"
    );

    const [occupiedSpots]: any = await pool.query(
        "SELECT COUNT(*) as occupied FROM parking_spots WHERE is_occupied = 1"
    );

    return {
        total: allSpots[0].total,
        occupied: occupiedSpots[0].occupied,
        free: allSpots[0].total - occupiedSpots[0].occupied
    };
};

export const parkCar = async (carNum: string) => {

    const [spots]: any = await pool.query(
        "SELECT * FROM parking_spots WHERE is_occupied = 0 LIMIT 1"
    );

    if (spots.length === 0) {
        throw new Error("No free spots");
    }

    const spot = spots[0];

    await pool.query(
        `INSERT INTO cars
        (car_num, entry_time, parking_spot)
        VALUES (?, NOW(), ?)`,
        [carNum, spot.id]
    );

    await pool.query(
        "UPDATE parking_spots SET is_occupied = 1 WHERE id = ?",
        [spot.id]
    );

    return spot;
};

export const exitCar = async (carNum: string) => {

    const [cars]: any = await pool.query(
        `SELECT * FROM cars
         WHERE car_num = ?
         AND exit_time IS NULL`,
        [carNum]
    );

    if (cars.length === 0) {
        throw new Error("Car not found");
    }

    const car = cars[0];

    await pool.query(
        `UPDATE cars
         SET exit_time = NOW()
         WHERE id = ?`,
        [car.id]
    );

    await pool.query(
        `UPDATE parking_spots
         SET is_occupied = 0
         WHERE id = ?`,
        [car.parking_spot]
    );

    return car;
};