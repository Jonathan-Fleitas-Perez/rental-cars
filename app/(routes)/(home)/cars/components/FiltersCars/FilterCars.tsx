import { Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue } from "@/components/ui/select" 
import { FilterCarsProps } from "./FilterCars.types"
import { Trash, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function FilterCars(props:FilterCarsProps) {
    const {clearFilters,setFilters,filters}=props;

    const handleFilter=(filter:string,value:string)=>{setFilters(filter,value)};

    const FiltersContent = () => (
        <>
            <Select onValueChange={(value)=>handleFilter("type",value)} value={filters.type}>
                <SelectTrigger className="w-full lg:w-[160px] rounded-full bg-background/50 border-border/50">
                    <SelectValue placeholder="Vehicle Type"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Model Type</SelectLabel>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="coupe">Coupe</SelectItem>
                        <SelectItem value="familiar">Family</SelectItem>
                        <SelectItem value="luxe">Luxury</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select onValueChange={(value)=>handleFilter("transmission",value)} value={filters.transmission}>
                <SelectTrigger className="w-full lg:w-[160px] rounded-full bg-background/50 border-border/50">
                    <SelectValue placeholder="Transmission"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Gearbox</SelectLabel>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="automatic">Automatic</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select onValueChange={(value)=>handleFilter("engine",value)} value={filters.engine}>
                <SelectTrigger className="w-full lg:w-[160px] rounded-full bg-background/50 border-border/50">
                    <SelectValue placeholder="Engine Type"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Energy</SelectLabel>
                        <SelectItem value="gasoil">Gasoline</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select onValueChange={(value)=>handleFilter("people",value)} value={filters.people}>
                <SelectTrigger className="w-full lg:w-[120px] rounded-full bg-background/50 border-border/50">
                    <SelectValue placeholder="Seats"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Capacity</SelectLabel>
                        <SelectItem value="2">2 Seats</SelectItem>
                        <SelectItem value="4">4 Seats</SelectItem>
                        <SelectItem value="5">5 Seats</SelectItem>
                        <SelectItem value="7">7 Seats</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select onValueChange={(value)=>handleFilter("priceMin",value)} value={filters.priceMin}>
                <SelectTrigger className="w-full lg:w-[140px] rounded-full bg-background/50 border-border/50">
                    <SelectValue placeholder="Price Min."/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Min Budget</SelectLabel>
                        <SelectItem value="50">50€</SelectItem>
                        <SelectItem value="100">100€</SelectItem>
                        <SelectItem value="200">200€</SelectItem>
                        <SelectItem value="500">500€</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select onValueChange={(value)=>handleFilter("priceMax",value)} value={filters.priceMax}>
                <SelectTrigger className="w-full lg:w-[140px] rounded-full bg-background/50 border-border/50">
                    <SelectValue placeholder="Price Max."/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Max Budget</SelectLabel>
                        <SelectItem value="500">500€</SelectItem>
                        <SelectItem value="1000">1000€</SelectItem>
                        <SelectItem value="2000">2000€</SelectItem>
                        <SelectItem value="5000">5000€</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Button 
                variant="ghost" 
                onClick={clearFilters} 
                className="w-full lg:w-auto rounded-full font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10 uppercase tracking-tighter text-xs"
            >
                Clear <X className="w-4 h-4 ml-2"/>
            </Button>
        </>
    );

    return (
        <div className="mt-8 mb-12">
            {/* Desktop Filters */}
            <div className="hidden lg:flex flex-wrap items-center gap-3 p-4 bg-muted/20 border border-border/50 rounded-[2.5rem] backdrop-blur-xl">
                <div className="flex items-center gap-2 px-4 border-r border-border/50 mr-2 text-primary">
                    <Filter className="w-5 h-5" />
                    <span className="font-black uppercase tracking-tighter italic">Refine</span>
                </div>
                <FiltersContent />
            </div>

            {/* Mobile Filters */}
            <div className="lg:hidden flex items-center justify-between">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="w-full h-14 rounded-2xl font-black uppercase italic tracking-tighter text-lg shadow-xl shadow-primary/20">
                            <Filter className="mr-3 w-5 h-5" />
                            Filter Results
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[70vh] rounded-t-[3rem] p-8 border-t border-primary/20 bg-background/95 backdrop-blur-2xl">
                        <SheetHeader className="mb-8">
                            <SheetTitle className="text-3xl font-black uppercase italic tracking-tighter">Filter Fleet</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-6 overflow-y-auto pb-10">
                            <FiltersContent />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}
