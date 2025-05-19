import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Seed Activities
  const activity1 = await prisma.activity.create({
    data: {
      title: 'TJ macht Druck',
      description: 'Abriss mit Tom, stabiler Schneckno powered by Soundcloud.',
      startTime: new Date('2025-06-07T18:00:00Z'),
      host: 'DJ TJ',
      imageUrl: '/images/activities/dj-set.jpg', // Example path
    },
  });

  const activity2 = await prisma.activity.create({
    data: {
      title: 'Grillen',
      description: 'Am Samstag wird gegrillt, packt die halbe Kuh auf den Grill.',
      startTime: new Date('2025-06-07T20:30:00Z'),
      host: 'The Trip Chefs',
      imageUrl: '/images/activities/dinner.webp',
    },
  });

  const activity3 = await prisma.activity.create({
    data: {
      title: 'In die Sterne gucken',
      description: 'Steffen erzählt uns was über seine Lieblingssternbilder',
      startTime: new Date('2025-06-08T01:00:00Z'),
      host: 'Steffen',
      imageUrl: '/images/activities/stargazing.jpg',
    },
  });

  const activity4 = await prisma.activity.create({
    data: {
      title: 'Yoga',
      description: 'Für alle die nix besseres zu tun haben.',
      startTime: new Date('2025-06-08T08:00:00Z'),
      host: 'Yogi X',
      imageUrl: '/images/activities/yoga.jpg',
    },
  });

  console.log({ activity1, activity2, activity3, activity4 });

  // Seed Pictures
  const picture1 = await prisma.picture.create({
    data: {
      src: '/images/gallery/gallery1.jpg', // Replace with actual image paths
      alt: 'Tom und Tom chillina around',
      width: 800,
      height: 600,
    },
  });
  const picture2 = await prisma.picture.create({
    data: {
      src: '/images/gallery/gallery2.jpg',
      alt: 'LOVE',
      width: 1200,
      height: 800,
    },
  });
  const picture3 = await prisma.picture.create({
    data: {
      src: '/images/gallery/gallery3.jpg',
      alt: 'Marv und seine Lieblingsbeschäftigung',
      width: 700,
      height: 900,
    },
  });
  const picture4 = await prisma.picture.create({
    data: {
      src: '/images/gallery/gallery4.jpg',
      alt: 'Alternative Wanderratten',
      width: 1024,
      height: 768,
    },
  });
   const picture5 = await prisma.picture.create({
    data: {
      src: '/images/gallery/gallery5.jpg',
      alt: 'juicy',
      width: 900,
      height: 600,
    },
  });


  console.log({ picture1, picture2, picture3, picture4, picture5 });
  const faq1 = await prisma.fAQItem.create({
    data: {
      question: "Was ist 'The Trip 2025'?",
      answer: "'The Trip 2025' ist ein total tolles Treffen vom 06. bis 09. Juni 2025 in Benecko, Tschechien. Es dreht sich um Musik, Gemeinschaft und Freizeitaktivitäten wie Wandern, Baden, Saunieren, Spielen, Feiern und Entspannen.",
      order: 1,
    },
  });
  
  const faq2 = await prisma.fAQItem.create({
    data: {
      question: "Wo findet das Event statt?",
      answer: "Das Event findet in Benecko in der Tschechischen Republik statt, etwa 4 Autostunden von Chemnitz entfernt.",
      order: 2,
    },
  });
  
  const faq3 = await prisma.fAQItem.create({
    data: {
      question: "Was kostet die Teilnahme?",
      answer: "Die Teilnahme kostet 20 € für 3 Nächte, inklusive Pfingstwochenende und Nebenkosten.",
      order: 3,
    },
  });
  
  const faq4 = await prisma.fAQItem.create({
    data: {
      question: "Wie viele Schlafplätze gibt es?",
      answer: "Es gibt 29 Betten, verteilt auf 6 Zimmer.",
      order: 4,
    },
  });
  
  const faq5 = await prisma.fAQItem.create({
    data: {
      question: "Welche Ausstattung bietet das Haus?",
      answer: "Das 300 m² große Haus bietet Pool, Hot Tub, Whirlpool, Sauna, Gemeinschaftsraum mit Kamin, Kicker und Dartscheibe, eine Terrasse, Grill, Feuerstelle, Tischtennisplatte und ein Trampolin.",
      order: 5,
    },
  });
  
  const faq6 = await prisma.fAQItem.create({
    data: {
      question: "Welche Aktivitäten sind geplant?",
      answer: "Geplant sind Wandern, Baden, Saunieren, Spielen, Feiern und Entspannen. Du kannst aber auch eigene Projekte oder Hobbys vorstellen – das ist optional.",
      order: 6,
    },
  });
  
  const faq7 = await prisma.fAQItem.create({
    data: {
      question: "Wie melde ich mich an?",
      answer: "Die offizielle Zusage muss bis zum 30.04.2025 erfolgen. Den Zugang zum Gruppenchat bekommst du über Jojo oder Lui.",
      order: 7,
    },
  });
  
  const faq8 = await prisma.fAQItem.create({
    data: {
      question: "Wie leiste ich die Anzahlung?",
      answer: "Die Anzahlung von 20 € erfolgt an Marv, entweder per PayPal an marvin.suess@googlemail.com oder per Überweisung an IBAN: DE52 2004 1144 0666 8917 00.",
      order: 8,
    },
  });
  

  console.log({ faq1, faq2, faq3, faq4 });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });