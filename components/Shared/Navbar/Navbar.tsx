"use client"
import { Button } from "@/components/ui/button";
import { useLovedCars } from "@/hooks/use-loved-cars";
import { useAuth, UserButton } from "@clerk/nextjs"
import { Heart, User, Menu, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
    const {userId} = useAuth();
    const {lovedItems} = useLovedCars()

  return (
    <div className="max-w-[1200px] py-5 mx-auto px-6 sticky top-0 w-full z-50">
        <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-x-2 group">
                <div className="relative w-12 h-12 transition-transform duration-500 group-hover:rotate-12">
                    <Image 
                        src="/logo.svg" 
                        alt="Rental cars Logo"
                        fill
                        priority 
                        className="object-contain brightness-0 dark:invert"
                    />
                </div>
                <div className="flex flex-col -space-y-1">
                    <span className="text-xl font-black tracking-tighter uppercase italic">Rental Cars</span>
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary ml-0.5">Premium</span>
                </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-x-8">
                <Link href="/cars" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-all">Explore</Link>
                <Link href="/dashboard" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-all">Dashboard</Link>
                <ThemeToggle />
                {userId ? (
                    <>
                    <Link href="/loved-cars" className="relative p-2 hover:bg-muted rounded-full transition-all">
                        <Heart 
                            strokeWidth={2} 
                            className={`w-5 h-5 transition-colors ${lovedItems.length > 0 && "fill-primary text-primary"}`}
                        />
                        {lovedItems.length > 0 && (
                            <span className="absolute top-0 right-0 bg-primary text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                                {lovedItems.length}
                            </span>
                        )}
                    </Link>
                    <div className="pl-2 border-l border-border h-8 flex items-center">
                        <UserButton afterSignOutUrl="/"/>
                    </div>
                    </>
                ) : (
                    <Link href="/sign-in">
                        <Button size="sm" className="rounded-full px-6 font-bold uppercase tracking-tighter">
                            Sign In
                            <User className="ml-2 w-4 h-4"/>
                        </Button>
                    </Link>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="flex lg:hidden items-center gap-x-4">
                <ThemeToggle />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="group rounded-full hover:bg-primary/10">
                            <Menu className="w-6 h-6 group-active:scale-95 transition-all text-foreground" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:w-[350px] p-0 border-l border-border/50 bg-background/95 backdrop-blur-xl">
                        <div className="flex flex-col h-full">
                            <div className="p-8 border-b border-border/50">
                                <SheetTitle className="text-3xl font-black tracking-tighter uppercase italic leading-none mb-1">Navigation</SheetTitle>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Premium Selection v2.0</p>
                            </div>
                            
                            <nav className="flex flex-col p-4 gap-2 flex-grow mt-4">
                                <Link href="/cars" className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted transition-all group">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black italic tracking-tighter uppercase">Our Fleet</span>
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Browse all vehicles</span>
                                    </div>
                                    <MoveRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                                </Link>
                                <Link href="/dashboard" className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted transition-all group">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black italic tracking-tighter uppercase">Dashboard</span>
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Manage your bookings</span>
                                    </div>
                                    <MoveRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                                </Link>
                                <Link href="/loved-cars" className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted transition-all group">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-black italic tracking-tighter uppercase">Loved Cars</span>
                                            {lovedItems.length > 0 && (
                                                <span className="bg-primary text-white text-[10px] font-black rounded-sm px-1.5 py-0.5">
                                                    {lovedItems.length}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Your favorites list</span>
                                    </div>
                                    <Heart className={cn("w-5 h-5 transition-colors", lovedItems.length > 0 ? "fill-primary text-primary" : "text-muted-foreground/50")} />
                                </Link>
                            </nav>
                            
                            <div className="p-8 mt-auto border-t border-border/50 bg-muted/30">
                                {userId ? (
                                    <div className="flex items-center justify-between gap-4 p-4 rounded-3xl bg-background border border-border/50 shadow-xl shadow-black/5">
                                        <div className="flex items-center gap-3">
                                            <UserButton />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black tracking-tight leading-none mb-1">My Account</span>
                                                <span className="text-[10px] font-bold text-green-500 uppercase flex items-center gap-1">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                    Online
                                                </span>
                                            </div>
                                        </div>
                                        <MoveRight className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                ) : (
                                    <Link href="/sign-in">
                                        <Button className="w-full py-7 rounded-3xl font-black text-xl italic uppercase tracking-tighter shadow-2xl shadow-primary/30">
                                            Sign In Now
                                            <User className="ml-3 w-6 h-6" />
                                        </Button>
                                    </Link>
                                )}
                                <div className="mt-8 text-center">
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/50 italic">Experience the ultimate</p>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </div>
  )
}
