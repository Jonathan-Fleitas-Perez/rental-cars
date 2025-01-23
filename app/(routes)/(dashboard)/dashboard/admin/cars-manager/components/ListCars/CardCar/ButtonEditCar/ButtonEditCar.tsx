"use client"
import { Button } from "@/components/ui/button";
import { ButtonEditCarProps } from "./ButtonEditCar.types";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { FormEditCar } from "../FormEditCar";

export  function ButtonEditCar(props:ButtonEditCarProps) {
    const {carData}=props;
    const [openDialog,setOpenDialog]=useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
            <Button variant="outline" onClick={()=>setOpenDialog(true)}>
                Edit
                <Pencil className="w-4 h-4 ml-2"/>
            </Button>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Cars</DialogTitle>
                <DialogDescription>Edit your car for your preferences</DialogDescription>
                    <FormEditCar setOpenDialog={setOpenDialog} carData={carData}/>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}
