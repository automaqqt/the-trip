import HeroSection from "@/components/sections/HeroSection";
import MapsSection from "@/components/sections/MapsSection";
import ActivitiesSection from "@/components/sections/ActivitiesSection";
import PicturesSection from "@/components/sections/PicturesSection";
import FAQSection from "@/components/sections/FAQSection";
import { prisma } from "@/lib/prisma";
import { Picture, FAQItem } from '@prisma/client'; // Import types

// Fetch pictures for the PicturesSection (Server Component)
async function getPictures(): Promise<Picture[]> {
  try {
    return await prisma.picture.findMany({
      orderBy: { createdAt: 'desc' }, // Or some other ordering
    });
  } catch (error) {
    console.error("Failed to fetch pictures:", error);
    return [];
  }
}

// Fetch FAQ items for the FAQSection (Server Component)
async function getFaqItems(): Promise<FAQItem[]> {
  try {
    return await prisma.fAQItem.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error("Failed to fetch FAQ items:", error);
    return [];
  }
}


export default async function HomePage() {
  const pictures = await getPictures();
  const faqItems = await getFaqItems();

  return (
    <>
      <HeroSection />
      <MapsSection />
      <ActivitiesSection /> {/* Fetches its own data */}
      <PicturesSection initialPictures={pictures} />
      <FAQSection faqItems={faqItems} />
    </>
  );
}