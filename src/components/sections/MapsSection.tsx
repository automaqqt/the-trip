const MapsSection = () => {
  // These should ideally come from environment variables or a config
  // For this example, using dummy values but referencing where they'd come from
  const festivalLocationQuery = process.env.NEXT_PUBLIC_FESTIVAL_LOCATION_QUERY || "Špindlerův Mlýn, Czechia"; // For search query
  const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(festivalLocationQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  // Alternative using lat/lng if you have them:
  // const lat = process.env.NEXT_PUBLIC_FESTIVAL_LOCATION_LAT || "20.6843";
  // const lng = process.env.NEXT_PUBLIC_FESTIVAL_LOCATION_LNG || "-88.5678";
  // const mapEmbedSrc = `https://maps.google.com/maps?q=${lat},${lng}&hl=es;&z=14&&output=embed`;


  return (
    <section id="maps" className="py-16 md:py-24 bg-muted/30 dark:bg-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-tripPurple to-tripPink">
                Wo gehts hin?
                </span>
               
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Da es beim ersten mal schon funktioniert hat geht es wieder nach Tschechien, dieses mal allerdings ins Riesengebirge.
          </p>
        </div>

        <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border-4 border-primary/30">
          {/* The actual map iframe */}
          <iframe
            src={mapEmbedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Festival Location"
            className="absolute top-0 left-0 w-full h-full filter grayscale-75 contrast-125"
          ></iframe>
          
          {/* Optional: Styled marker overlay if you want more control than default Google Maps marker */}
          {/* This is a purely visual overlay, not interactive with the map itself */}
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
            <MapPin className="w-12 h-12 text-tripPink drop-shadow-[0_5px_3px_rgba(0,0,0,0.4)] animate-bounce" />
          </div> */}
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Genau Anschrift entnehmt ihr bitte der Booking info.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MapsSection;