import express from 'express';

const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json());

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
})

let cars = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2020 },
    { id: 2, make: 'Honda', model: 'Civic', year: 2019 },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2021 },
    { id: 4, make: 'Tesla', model: 'Model 3', year: 2022 },
]

app.get('/', (req, res) => {
    res.send('Welcome to the Car API!');
})

router.get('/', (req, res) => {
    res.json(cars);
})

// Define the route for filtering cars by make and model
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const car = cars.find((car) => car.id === id);

    if (!car) return res.status(404).send('Car not found!');

    res.json(car);
})

// Define the route for creating a new car
router.post('/', (req, res) => {
    const { make, model, year } = req.body;

    if (!make || !model || !year) return res.status(400).send('Car make, model, and year are required!');
    const newCar = {
        id: cars.length + 1,
        make,
        model,
        year,
    }
    cars.push(newCar);
    res.status(201).json(newCar);
})

// Define the route for updating a car by ID
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = cars.findIndex((car) => car.id === id);

    if (index === -1) {
        return res.status(404).send('Car not found!');
    }

    const { make, model, year } = req.body;

    if(make) cars[index].make = make;
    if(model) cars[index].model = model;
    if(year) cars[index].year = year;

    res.json(cars[index]);
})

// Define the route for deleting a car by ID
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = cars.findIndex((car) => car.id === id);

    if (index === -1) {
        return res.status(404).send('Car not found!');
    }

    const deleted = cars.splice(index, 1)[0];
    res.json({ message: "car deleted successfully!", car: deleted });
})

// Use the router for all routes starting with /api/v1
app.use('/api/v1/cars', router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})