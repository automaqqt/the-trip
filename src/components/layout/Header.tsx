"use client";
import { useState } from 'react';
import Logo from './Logo';
import NavigationLinks from './NavigationLinks';
import LoginButton from '../auth/LoginButton';
import MobileMenu from './MobileMenu';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    //@ts-expect-error this is super useless
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-shadow duration-300",
        !hidden && scrollY.get() > 50 ? "bg-transparent backdrop-blur-lg shadow-lg" : "bg-transparent text-white"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Logo />
          <div className="hidden md:flex items-center space-x-8">
            <NavigationLinks />
            <LoginButton />
          </div>
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;