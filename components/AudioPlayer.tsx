import React, { useState, useRef, useEffect } from "react";
import { Music, Pause } from "lucide-react";

import musicUrl from "../assets/le_duong.mp3";

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.log("Playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Khởi tạo Audio với file đã import
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Hàm thực hiện phát nhạc
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        // Nếu phát thành công (trình duyệt cho phép) thì gỡ sự kiện click đi
        document.removeEventListener("click", handleInteraction);
        document.removeEventListener("touchstart", handleInteraction);
      } catch (err) {
        console.log("Autoplay bị chặn, chờ người dùng chạm vào web...");
        setIsPlaying(false);
      }
    };

    // Hàm xử lý khi người dùng chạm vào web lần đầu
    const handleInteraction = () => {
      playAudio();
    };

    // 1. Thử chạy ngay lập tức khi vào web (dành cho browser đã cho phép trước đó)
    playAudio();

    // 2. Nếu bị chặn, lắng nghe cú click/chạm đầu tiên để phát nhạc
    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={togglePlay}
        className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-wedding-secondary text-wedding-primary hover:scale-110 transition-transform duration-300 relative group cursor-pointer"
      >
        <div
          className={`absolute inset-0 rounded-full border-2 border-dashed border-wedding-secondary/50 ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
        ></div>
        {isPlaying ? <Pause size={24} /> : <Music size={24} />}
      </button>
    </div>
  );
};