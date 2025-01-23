import CardCar from "./CardCar/CardCar";
import { ListCarProps } from "./ListCars.types";

export default function ListCars(props:ListCarProps)  {
    const {cars} = props;
  return (
    <div className="grid md:grid-cols-2 gap-6 my-4 lg:grid-cols-4">
        {cars.map((car)=>(
            <CardCar car={car} key={car.id}/>
        ))}
    </div>
  )
}
