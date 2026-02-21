import Car from "./Components/Car.tsx";
import {useEffect, useState} from "react";

interface  Car {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
}

const App = () => {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        fetch(('api/v1/cars'))
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.log('Error fetching cars:', error));


    }, []);

    console.log('Cars fetched:', cars);


    return (
        <div>
            <h1>Welcome to the Car Store</h1>

            <ul>
                {cars.map((car) => (
                    <Car key={car.id} {...car} />
                ))}
            </ul>
        </div>
    )
}
export default App
