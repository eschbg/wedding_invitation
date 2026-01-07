import React, { useEffect, useState } from "react";
import { Section } from "./Section";
import { TimeLeft } from "../types";
import backgroundUrl from "../assets/30.jpg";

export const Calendar: React.FC = () => {
  // Date: 24/01/2026 at 11:00 AM
  const WEDDING_DATE = new Date("2026-01-24T11:00:00");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = WEDDING_DATE.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simple calendar grid for January 2026
  // Jan 1st 2026 is a Thursday (4)
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDayOffset = 4; // Thursday


  return (
    <div
      className="py-20 bg-wedding-primary text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${backgroundUrl}')` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <Section className="container mx-auto px-4 flex flex-col md:flex-row gap-12 items-center justify-center relative z-10">
        <div className="bg-transparent border border-white/30 text-white p-8 rounded-xl max-w-sm w-full">
          <h3 className="text-center font-serif text-2xl mb-6 border-b pb-4 border-white/30">
            January 2026
          </h3>
          <div className="grid grid-cols-7 gap-2 text-center font-sans text-sm mb-4 font-bold text-white/60">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center font-serif">
            {/* Empty slots */}
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <div key={`empty-${i}`}></div>
            ))}
            {/* Days */}
            {calendarDays.map((day) => (
              <div
                key={day}
                className={`p-2 rounded-full relative z-10 ${
                  day === 24
                    ? "bg-wedding-secondary text-white font-bold"
                    : "text-white hover:bg-white/20 transition-colors" // Đổi text-gray-700 thành text-white
                }`}
              >
                {day}
                {day === 24 && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Countdown */}
        <div className="text-center">
          <h3 className="font-script text-5xl md:text-6xl mb-8 text-wedding-primary">
            We are waiting for...
          </h3>
          <div className="flex gap-4 md:gap-8 justify-center">
            {[
              { val: timeLeft.days, label: "Days" },
              { val: timeLeft.hours, label: "Hours" },
              { val: timeLeft.minutes, label: "Mins" },
              { val: timeLeft.seconds, label: "Secs" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-24 md:h-24 border border-white/20 rounded-lg flex items-center justify-center bg-white/10 backdrop-blur-sm mb-2">
                  <span className="font-serif text-2xl md:text-4xl">
                    {String(item.val).padStart(2, "0")}
                  </span>
                </div>
                <span className="font-sans text-xs md:text-sm uppercase tracking-wider opacity-70">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};
