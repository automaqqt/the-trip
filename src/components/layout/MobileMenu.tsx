"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import NavigationLinks from "./NavigationLinks";
import LoginButton from "../auth/LoginButton";
import Logo from "./Logo";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-primary">
          <Menu className="h-7 w-7" />
          <span className="sr-only">Menü öffnen</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[360px] bg-transparent backdrop-blur-lg shadow-lg p-6 flex flex-col">
        <SheetHeader className="mb-8">
          <SheetTitle className="flex justify-between items-center">
            <Logo />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-primary">
              <X className="h-6 w-6" />
              <span className="sr-only">Menü schließen</span>
            </Button>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col space-y-6 grow">
          <NavigationLinks onItemClick={() => setIsOpen(false)} />
        </div>

        <div className="mt-auto pt-6 pl-32">
          <LoginButton />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;