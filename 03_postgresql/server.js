import express from "express";
import { db } from "./db.js";
import { cars } from "./schema.js";
import { eq } from "drizzle-orm";

const app = express();
const port = 3000;

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
});

// Root
app.get("/", (req, res) => {
    res.send("Welcome to the Car API!");
});

/* =====================================
   GET ALL CARS
===================================== */
app.get("/api/v1/cars", async (req, res) => {
    try {
        const allCars = await db.select().from(cars);
        res.json(allCars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch cars" });
    }
});

/* =====================================
   GET CAR BY ID
===================================== */
app.get("/api/v1/cars/:id", async (req, res) => {
    try {
        const allCars = await db.select().from(cars);
        const id = Number(req.params.id);
        const car = allCars.find((c) => c.id === id);

        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }

        res.json(car);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch car" });
    }
});

/* =====================================
   CREATE CAR
===================================== */
app.post("/api/v1/cars", async (req, res) => {
    try {
        const { make, model, year, price } = req.body;

        if (!make || !model || !year || !price) {
            return res.status(400).json({
                error: "Make, model, year and price are required",
            });
        }

        const [newCar] = await db
            .insert(cars)
            .values({ make, model, year, price })
            .returning();

        res.status(201).json(newCar);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create car" });
    }
});

/* =====================================
   UPDATE CAR
===================================== */
app.put("/api/v1/cars/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { make, model, year, price } = req.body;

        const [updatedCar] = await db
            .update(cars)
            .set({ make, model, year, price })
            .where(eq(cars.id, id))
            .returning();

        if (!updatedCar) {
            return res.status(404).json({ error: "Car not found" });
        }

        res.json(updatedCar);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update car" });
    }
});

/* =====================================
   DELETE CAR
===================================== */
app.delete("/api/v1/cars/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const [deletedCar] = await db
            .delete(cars)
            .where(eq(cars.id, id))
            .returning();

        if (!deletedCar) {
            return res.status(404).json({ error: "Car not found" });
        }

        res.json({
            message: "Car deleted successfully",
            car: deletedCar,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete car" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});