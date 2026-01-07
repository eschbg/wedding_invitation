import React, { useState } from "react";
import { AudioPlayer } from "./components/AudioPlayer";
import { Hero } from "./components/Hero";
import { LoveStory } from "./components/LoveStory";
import { Invitation } from "./components/Invitation";
import { Calendar } from "./components/Calendar";
import { Gallery } from "./components/Gallery";
import { WeddingInfo } from "./components/WeddingInfo";
import { Rsvp } from "./components/Rsvp";
import { Wishes } from "./components/Wishes";
import { GiftQr } from "./components/GiftQr";
import { SplashScreen } from "./components/SplashScreen";

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleOpenStart = () => {
    // Trigger any entry animations for the main content
    setContentVisible(true);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <div className="w-full min-h-screen bg-wedding-light overflow-x-hidden">
      {showSplash && (
        <SplashScreen
          onOpenStart={handleOpenStart}
          onComplete={handleSplashComplete}
        />
      )}

      {/* Floating Widgets */}
      <AudioPlayer />
      <Wishes />

      {/* Main Content Wrapper */}
      <div
        className={`transition-opacity duration-1000 ease-in ${"opacity-100"}`}
      >
        <main>
          <Hero />
          <Invitation />
          <Gallery />
          <Calendar />
          <LoveStory />
          <WeddingInfo />

          <GiftQr />

          <Rsvp />
        </main>

        <footer className="bg-wedding-primary text-white py-8 text-center pb-32 md:pb-8">
          <p className=" font-serif opacity-80 mb-12">
            Cảm ơn bạn đã dành tình cảm cho chúng mình!.
            <br /> Sự hiện diện của bạn chính là món quà ý nghĩa nhất, và chúng
            mình vô cùng trân quý khi được cùng bạn chia sẻ niềm hạnh phúc trong
            ngày trọng đại này.
          </p>

          <p className="font-serif italic text-lg opacity-80 mb-2">
            Thank you for being part of our journey.
          </p>
          <p className="font-sans text-xs opacity-50 uppercase tracking-widest">
            Mạnh Hoàng & Mai Tâm © 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
