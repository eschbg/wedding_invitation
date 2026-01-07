import React, { useState, useEffect } from "react";

interface SplashScreenProps {
  onOpenStart: () => void;
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onOpenStart,
  onComplete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;

    setIsOpen(true);
    onOpenStart();

    setTimeout(() => {
      setIsFinished(true);
      onComplete();
    }, 1500);
  };

  useEffect(() => {
    // Auto open after a delay
    const timer = setTimeout(() => {
      handleOpen();
    }, 2000);

    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={`fixed inset-0 z-[100] flex overflow-hidden transition-opacity duration-500 bg-transparent
        ${isFinished ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
    >
      {/* LEFT DOOR */}
      <div
        className={`relative w-1/2 h-full bg-[#752222] border-r border-[#5c1b1b] shadow-2xl transition-transform duration-[1500ms] ease-in-out z-20 flex items-center justify-end
            ${isOpen ? "-translate-x-full" : "translate-x-0"}
            `}
      >
        {/* Floral Texture Pattern (Subtle) */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M20 20c0-11.046 8.954-20 20-20v20H20zM0 20c0-11.046 8.954-20 20-20v20H0z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* RIGHT DOOR */}
      <div
        className={`relative w-1/2 h-full bg-[#752222] border-l border-[#5c1b1b] shadow-2xl transition-transform duration-[1500ms] ease-in-out z-20 flex items-center justify-start
            ${isOpen ? "translate-x-full" : "translate-x-0"}
            `}
      >
        {/* Floral Texture Pattern (Subtle) */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M20 20c0-11.046 8.954-20 20-20v20H20zM0 20c0-11.046 8.954-20 20-20v20H0z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* --- CENTER SYMBOL (Attached to Right Door) --- */}
        <div className="absolute left-0 top-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className={`group relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center transition-transform duration-700 ease-out`}
          >
            {/* Shadow/Glow to make the red badge pop against the red door */}
            <div className="absolute inset-2 rounded-full bg-[#f2e6d8] blur-sm opacity-50"></div>
            <div className="absolute inset-0 rounded-full border-4 border-[#f2e6d8] opacity-80 shadow-[0_0_20px_rgba(242,230,216,0.3)]"></div>

            {/* THE BADGE SVG */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-2xl relative z-10"
            >
              {/* 1. Main Red Circle Background */}
              <circle cx="100" cy="100" r="98" fill="#752222" />

              {/* 2. Dotted Inner Ring */}
              <circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="#f2e6d8"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* 3. The Double Happiness Character (White/Cream) */}
              <image
                href="../assets/chu-hy.png"
                x="50"
                y="50"
                height="100"
                width="100"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
