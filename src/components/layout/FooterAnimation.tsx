"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import PillRainEffect from '../three/PillRainEffect'; // Assuming PillRainEffect.tsx is in ../three/

const FooterAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const triggerRef = useRef(null);

  // Use framer-motion's useInView to detect when the trigger is visible
  // `once: false` means it will update when scrolling in and out of view
  // `amount: 0.1` means 10% of the trigger needs to be in view
  const isInView = useInView(triggerRef, { amount: 0.1, once: false });

  useEffect(() => {
    setShowAnimation(isInView);
  }, [isInView]);

  return (
    <>
      {/* The trigger div that will be placed in the footer's layout flow */}
      {/* Its visibility determines if the animation overlay is shown */}
      <div ref={triggerRef} className="h-1 w-full" /> {/* Small, invisible trigger */}
      
      <PillRainEffect isVisible={showAnimation} />
    </>
  );
};

export default FooterAnimation;