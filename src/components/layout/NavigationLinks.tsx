"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Karte", href: "#maps" },
  { name: "Aktivitäten", href: "#activities" },
  { name: "Bilder", href: "#pictures" },
  { name: "FAQ", href: "#faq" },
];

const NavigationLinks = ({ onItemClick }: { onItemClick?: () => void }) => {

  return (
    <nav className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={onItemClick}
          className={cn(
            "relative text-lg md:text-base font-medium text-secondary hover:text-primary transition-colors duration-300 group"
          )}
        >
          {item.name}
          <motion.span
            layoutId={`underline-${item.name}`}
            className="absolute left-0 bottom-[-2px] block h-[2px] w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
          />
        </Link>
      ))}
    </nav>
  );
};

export default NavigationLinks;