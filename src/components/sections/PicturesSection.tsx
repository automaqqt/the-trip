"use client"; // Needs to be client for useState (lightbox interaction)

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ImageViewer from '@/components/ui/ImageViewer';
import { Picture } from '@prisma/client'; // Import the Prisma Picture type
import { ImageOff } from 'lucide-react';

// This component fetches data on the client side for demonstration if needed,
// but ideally, pass `initialPictures` as a prop from a server component.
// For this setup, we'll assume pictures are passed as props.

interface PicturesSectionProps {
  initialPictures: Picture[]; // Pictures fetched on the server
}

const PicturesSection = ({ initialPictures }: PicturesSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Example of client-side fetch if needed (not used if initialPictures is sufficient)
  // useEffect(() => {
  //   const fetchPictures = async () => {
  //     const res = await fetch('/api/pictures'); // You'd create this API route
  //     if (res.ok) {
  //       const data = await res.json();
  //       setPictures(data);
  //     }
  //   };
  //   if (pictures.length === 0) fetchPictures();
  // }, [pictures.length]);

  const openLightbox = (index: number) => setCurrentIndex(index);
  const closeLightbox = () => setCurrentIndex(null);
  const nextImage = () => setCurrentIndex((prev) => (prev === null || prev === initialPictures.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentIndex((prev) => (prev === null || prev === 0 ? initialPictures.length - 1 : prev - 1));

  return (
    <section id="pictures" className="py-16 md:py-24 bg-muted/30 dark:bg-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-tripPurple to-tripPink">
              Erinnerungen
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hier seht ihr nur das beste aus diesem Jahr. Meldet euch an um selbst Bilder hochzuladen!
          </p>
        </div>

        {initialPictures.length === 0 ? (
           <div className="text-center py-10">
            <ImageOff className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
            <p className="text-xl text-muted-foreground">nope nix hier!</p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {initialPictures.map((pic, index) => (
              <motion.div
                key={pic.id}
                className="break-inside-avoid overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                onClick={() => openLightbox(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
              >
                <Image
                  src={pic.src}
                  alt={pic.alt}
                  width={pic.width} // Use Prisma schema width/height
                  height={pic.height}
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110"
                  placeholder="blur" // Optional: if you have blurDataURL
                  blurDataURL={`data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${pic.width}' height='${pic.height}'%3E%3Crect width='100%25' height='100%25' fill='%23${Math.random().toString(16).slice(2,8)}'/%3E%3C/svg%3E`} // Simple random color blur
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {currentIndex !== null && (
        <ImageViewer
          images={initialPictures}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </section>
  );
};

export default PicturesSection;