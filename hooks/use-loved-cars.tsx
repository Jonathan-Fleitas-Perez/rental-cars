import {create} from 'zustand'
import {persist,createJSONStorage} from 'zustand/middleware'
import { toast } from './use-toast'
import { Car } from '@prisma/client'

interface UseLovedCarsType{
    lovedItems:Car[],
    addLovedItem:(data:Car)=>void,
    removeLovedItem:(id:string)=>void
}

export const useLovedCars=create(
    persist<UseLovedCarsType>(
        (set,get)=>({
            lovedItems:[],
            addLovedItem:(data:Car)=>{
                const currentLovedItems= get().lovedItems;
                const existingItems = currentLovedItems.find((item)=>item.id=== data.id)
            

            if(existingItems){
                return toast({
                    title:"El coche ya existe en la lista",
                })
            }

            set({
                lovedItems:[...get().lovedItems,data]
            })

            toast({
                title:"Coche agregado a la lista"
            })
        }, removeLovedItem:(id:string)=>{
            set({
                lovedItems:[...get().lovedItems.filter((item)=>item.id!== id)]
            })
            toast({title:"El coche se ha eliminado de la lista"})
        }
    }),{
        name:"loved-product-storage",
        storage:createJSONStorage(()=>localStorage)
    }
    )
)