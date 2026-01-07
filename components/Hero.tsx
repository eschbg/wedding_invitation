import React from "react";
import { ChevronDown } from "lucide-react";

import { WEDDING_INFO } from "../constants";

export const Hero: React.FC = () => {
  const { bride, groom, weddingDate } = WEDDING_INFO;

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("../assets/15.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 text-white px-4 space-y-6 animate-fade-up">
        <p className="font-serif italic text-xl md:text-6xl tracking-wider text-wedding-light/90 md:mb-16">
          {groom.ceremony.title}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
          <h1 className="font-script font-bold text-6xl md:text-8xl lg:text-9xl mb-4 text-wedding-secondary drop-shadow-lg">
            {groom.name}
          </h1>
          <h1 className="font-script text-5xl md:text-7xl lg:text-8xl opacity-80 text-wedding-secondary drop-shadow-lg">
            &
          </h1>
          <h1 className="font-script font-bold text-6xl md:text-8xl lg:text-9xl mb-4 text-wedding-secondary drop-shadow-lg">
            {bride.name}
          </h1>
        </div>

        <div className="flex items-center justify-center gap-4 text-lg md:text-xl lg:text-2xl font-sans tracking-[0.2em] uppercase text-white/95">
          <span>{groom.ceremony.dayOfWeek}</span>
          <span className="w-2 h-2 bg-wedding-secondary rounded-full"></span>
          <span className="text-4xl md:text-4xl lg:text-4xl font-bold">
            {groom.ceremony.date}
          </span>
          <span className="w-2 h-2 bg-wedding-secondary rounded-full"></span>
          <span>{weddingDate.year}</span>
        </div>

        
      </div>

      <div className="absolute bottom-8 animate-bounce text-white/70">
        <ChevronDown size={32} />
      </div>
    </div>
  );
};
