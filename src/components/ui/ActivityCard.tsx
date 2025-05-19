"use client";
import { motion }  from 'framer-motion';
import Image from 'next/image';
import { Clock, User, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

interface ActivityCardProps {
  activity: {
    id: string;
    title: string;
    description: string;
    startTime: Date;
    host: string;
    imageUrl?: string | null;
  };
  index: number; // For staggered entrance animation
}

const ActivityCard = ({ activity, index }: ActivityCardProps) => {
  return (
    <motion.div
      className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden shadow-lg group" // REMOVED: hover:shadow-2xl, transition-all, transform, hover:-translate-y-2
                                                                                                                   // We'll let Framer Motion handle hover effects for transforms
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }} // Entrance animation transition

      // Hover effects handled by Framer Motion for smoothness
      whileHover={{
        scale: 1.05, // Slightly increased scale for visibility of effect
        y: -8,       // Optional: lift effect (translateY)
        boxShadow: "0px 15px 25px -5px rgba(0, 0, 0, 0.2), 0px 10px 10px -5px rgba(0, 0, 0, 0.1)", // Enhanced shadow on hover
        transition: {
          type: "spring", // Spring can feel very natural and smooth
          stiffness: 300,
          damping: 20,
          // Alternatively, for a simpler, potentially lighter transition:
          // type: "tween",
          // ease: "easeOut",
          // duration: 0.2
        }
      }}
      // Adding will-change can sometimes help, but Framer Motion might do this.
      // style={{ willChange: 'transform, boxShadow' }} // Uncomment to test if it makes a difference
    >
      {activity.imageUrl && (
        <div className="relative w-full h-48 md:h-56 overflow-hidden">
          <Image
            src={activity.imageUrl}
            alt={activity.title}
            fill // Changed from layout="fill" objectFit="cover" for Next 13+ `fill` prop
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust sizes based on your grid
            style={{ objectFit: 'cover' }} // Apply object-fit via style prop with fill
            className="transition-transform duration-500 group-hover:scale-110" // Image zoom inside card
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10"></div>
        </div>
      )}
      <div className="p-5 md:p-6">
        <h3 className="text-xl md:text-2xl font-bold font-heading mb-2 text-primary group-hover:text-tripPink transition-colors duration-300">
          {activity.title}
        </h3>
        
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <CalendarDays className="w-4 h-4 mr-2 text-tripTeal" />
          <span>{format(new Date(activity.startTime), "MMM d, yyyy")}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Clock className="w-4 h-4 mr-2 text-tripTeal" />
          <span>{format(new Date(activity.startTime), "h:mm a")}</span>
        </div>
        
        <p className="text-foreground/80 text-sm md:text-base mb-4 leading-relaxed min-h-[60px]">
          {activity.description}
        </p>
        
        <div className="flex items-center text-sm text-muted-foreground mt-auto pt-3 border-t border-border/30">
          <User className="w-4 h-4 mr-2 text-tripPurple" />
          <span>Hosted by: <strong className="text-tripPurple/90">{activity.host}</strong></span>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;