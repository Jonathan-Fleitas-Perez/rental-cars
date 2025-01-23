import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { SidebarRoutes } from "../SidebarRoutes";
import { UserButton } from "@clerk/nextjs";

export function NavbarDashboard() {
  return (
    <nav className="flex items-center justify-between w-full h-20 px-20 border-b gap-x-4 md:px-6 bg-background">
      <div className="block xl:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center"> <Menu/> </SheetTrigger>
          <SheetContent side="left">
          <SheetTitle></SheetTitle>
            <SidebarRoutes/>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center w-full justify-end gap-x-2">
        <UserButton/>
      </div>
    </nav>
  );
}
