"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Picture } from '@prisma/client'; // Assuming Picture type from Prisma
import { useEffect } from "react";

interface ImageViewerProps {
  images: Picture[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const imageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9
  }),
};

const ImageViewer = ({ images, currentIndex, onClose, onNext, onPrev }: ImageViewerProps) => {
    useEffect(() => {
        // Only add event listener if the viewer is active (currentIndex is not null)
        if (currentIndex === null) {
          return; // Do nothing if viewer is not open
        }
    
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'ArrowRight') onNext();
          if (event.key === 'ArrowLeft') onPrev();
          if (event.key === 'Escape') onClose();
        };
    
        window.addEventListener('keydown', handleKeyDown);
        // Cleanup function to remove listener when component unmounts or currentIndex changes
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [currentIndex, onNext, onPrev, onClose]);

  if (currentIndex === null || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];
  const direction = currentIndex > (images.findIndex(img => img.id === currentImage.id) || 0) ? 1 : -1;

  return (
    <Dialog open={currentIndex !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="bg-black/80 backdrop-blur-md border-none p-0 max-w-none w-screen h-screen flex items-center justify-center shadow-2xl"
        onInteractOutside={(e) => e.preventDefault()} // Prevents closing on outside click, use button
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentImage.id}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              width={currentImage.width}
              height={currentImage.height}
              className="object-contain max-w-full max-h-full rounded-lg shadow-2xl"
              priority // Load current image with high priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors z-20"
          aria-label="Close image viewer"
        >
          <X size={28} />
        </button>

        {/* Prev Button */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors z-20"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors z-20"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        )}
        
        {/* Caption (Optional) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 bg-black/50 rounded-md text-white text-sm z-20">
            {currentImage.alt} ({currentIndex + 1} / {images.length})
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewer;