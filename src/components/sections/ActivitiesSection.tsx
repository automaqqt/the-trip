import { prisma } from '@/lib/prisma';
import ActivityCard from '@/components/ui/ActivityCard';
import { Lightbulb } from 'lucide-react';

async function getActivities() {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: {
        startTime: 'asc',
      },
    });
    // Ensure startTime is serializable (Date objects are fine with Next.js app router)
    return activities;
  } catch (error) {
    console.error("Failed to fetch activities:", error);
    return []; // Return empty array on error
  }
}

const ActivitiesSection = async () => {
  const activities = await getActivities();

  return (
    <section id="activities" className="py-16 md:py-24 bg-background dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-tripPurple via-tripPink to-tripTeal">
              Was geht?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dieses Jahr gibts noch mehr Spaß und Beschäftigung. Schau dir an welche Aktivitäten geplant sind.
          </p>
        </div>

        {activities.length === 0 ? (
          <div className="text-center py-10">
            <Lightbulb className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
            <p className="text-xl text-muted-foreground">Nüscht geplant. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {activities.map((activity: { id: any; title: string; description: string; startTime: Date; host: string; imageUrl?: string | null | undefined; }, index: number) => (
              <ActivityCard key={activity.id} activity={activity} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivitiesSection;