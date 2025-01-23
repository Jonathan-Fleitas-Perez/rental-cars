"use client"
import { FilterAndListCarsProps } from "./FiltersAndListCars.types";
import { useEffect,useState } from "react"
import { Car } from "@prisma/client";
import { ListCars } from "../ListCars";
import { FilterCars } from "../FiltersCars";

export  function FiltersAndListCars(props:FilterAndListCarsProps) {
    const {cars}= props;
    const [filteredCars,setFilteredCars]=useState<Car[]>();
    const [filters,setFilters]=useState({
        type:"",
        transmission:"",
        engine:"",
        people:""
    })

    //para modificar el arreglo que se pasa por parametros a el componente de list car con los filtros deseados
    useEffect(()=>{
        let filtered=cars;
        if(filters.type){
            filtered=filtered.filter((car)=>car.type.toLowerCase().includes(filters.type.toLowerCase()));
        }
        if(filters.transmission){
            filtered=filtered.filter((car)=>car.transmission.toLowerCase().includes(filters.transmission.toLowerCase()));
        }
        if(filters.engine){
            filtered=filtered.filter((car)=>car.engine.toLowerCase().includes(filters.engine.toLowerCase()));
        }
        if(filters.people){
            filtered=filtered.filter((car)=>car.people.toLowerCase().includes(filters.people.toLowerCase()));
        }

        setFilteredCars(filtered);
    },[filters,cars]);

    //para indicar cuales son los filtros
    const handleFiltersChange=(filterName:string,filterValue:string)=>{
        setFilters((prevFilters)=>({
            ...prevFilters,
            [filterName]:filterValue
        }));
    };

    //Para borrar los filtros que se encuentran en el momento
    const clearFilters=()=>{
        setFilters({
            type:"",
            transmission:"",
            engine:"",
            people:""
        });
    };


  return (
    <div>
        <FilterCars
        setFilters={ handleFiltersChange}
        clearFilters={clearFilters}
        filters={filters}
        />
        <ListCars cars={filteredCars}/>
    </div>
  )
}
